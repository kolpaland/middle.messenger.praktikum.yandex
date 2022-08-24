import { v4 as makeUUID } from 'uuid';
import EventBus from './eventbus';

type Props = { [key: string]: unknown,
    events?: Record<string, Function>,
    settings?: { withInternalID: boolean }
};

export default class Component {
    static EVENT_INIT 		= 'init';

    static EVENT_FLOW_CDM 	= 'flow:component-did-mount';

    static EVENT_FLOW_CDU	= 'flow:component-did-update';

    static EVENT_FLOW_RENDER = 'flow:render';

    _props;

    _children;

    _id;

    _element: HTMLElement;

    _meta;

    _eventBus;

    constructor(tag = 'div', propsAndChilds = {}, simple = false) {
        const { children, props } = this.getChildren(propsAndChilds);

        this._eventBus = new EventBus();
        this._id = makeUUID();
        // this._children = children;
        this._children = this.makePropsProxy(children);
        this._props = this.makePropsProxy({ ...props, __id: this._id });
        this._meta = { tag, props, simple };

        this.registerEvents();
        this._eventBus.emit(Component.EVENT_INIT);
    }

    registerEvents() {
        this._eventBus.on(Component.EVENT_INIT, this.init.bind(this));
        this._eventBus.on(Component.EVENT_FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(Component.EVENT_FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.on(Component.EVENT_FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._element = this.createDocumentElement(this._meta?.tag);
        this._eventBus.emit(Component.EVENT_FLOW_RENDER);
    }

    createDocumentElement(tag: string) {
        const element = document.createElement(tag);
        if (this._props.settings?.withInternalID) element.setAttribute('data-id', this._id);
        return element;
    }

    _render() {
        const block = this.render();
        this.removeEvents();
        // if (this._meta.simple) {
        //     this._element = block?.firstChild as HTMLElement;
        // } else {
            this._element.innerHTML = '';
            this._element.appendChild(block as Node);
        // }

        this.addEvents();
    }

    render(): Node | undefined {
        return undefined;
    }

    addEvents() {
        const { events = {} } = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(eventName as keyof HTMLElementEventMap, events[eventName] as EventListener);
        });
    }

    removeEvents() {
        const { events = {} } = this._props;

        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(eventName as keyof HTMLElementEventMap, events[eventName] as EventListener);
        });
    }

    getChildren(propsAndChilds: Props) {
        const children: Props = {};
        const props: Props = {};

        Object.keys(propsAndChilds).forEach((key) => {
            const child = propsAndChilds[key];
            if (child instanceof Component) {
                children[key as keyof Props] = child;
            } else if (Array.isArray(child) && child[0] instanceof Component) {
                children[key as keyof Props] = child;
            } else {
                props[key as keyof Props] = child;
            }
        });

        return { children, props };
    }

    compile(template: Function, props = this._props) {
        // if (typeof (props) === 'undefined') { props = this._props; }

        const propsAndStubs = { ...props };

        Object.entries(this._children).forEach(([key, child]) => {
            if (Array.isArray(child)) {
                propsAndStubs[key as keyof Props] = [];
                for (let i = 0; i < child.length; i++) {
                    propsAndStubs[key as keyof Props].push(`<div data-id="${child[i]._id}"></div>`);
                }
            } else {
                propsAndStubs[key] = `<div data-id="${(child as Component)._id}"></div>`;
            }
        });

        const fragment: HTMLTemplateElement = this.createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = template(propsAndStubs);// Handlebars.compile(template)(propsAndStubs);

        Object.values(this._children).forEach((child: Component) => {
            if (Array.isArray(child)) {
                for (let i = 0; i < child.length; i++) {
                    const stub = fragment.content.querySelector(`[data-id="${child[i]._id}"]`);
                    if (stub != null) {
                        stub.replaceWith(child[i].getContent());
                    }
                }
            } else {
                const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

                if (stub) stub.replaceWith(child.getContent());
            }
        });

        return fragment.content;
    }

    _componentDidMount() {
        this.componentDidMount();
        Object.values(this._children).forEach((child: Component) => { child.dispatchComponentDidMount(); });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this._eventBus.emit(Component.EVENT_FLOW_CDM);
        if (Object.keys(this._children).length) { this._eventBus.emit(Component.EVENT_FLOW_RENDER); }
    }

    _componentDidUpdate(oldProps: Props, newProps: Props) {
        const isReRender = this.componentDidUpdate(oldProps, newProps);
        if (isReRender) { this._eventBus.emit(Component.EVENT_FLOW_RENDER); }
    }

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    componentDidUpdate(_oldProps: Props, _newProps: Props) {
        return true;
    }

    setProps(newProps: Props) {
        if (!newProps) { return; }

        const { children, props } = this.getChildren(newProps);

        if (Object.values(children).length) { Object.assign(this._children, children); }

        if (Object.values(props).length) { Object.assign(this._props, props); }
    }

    makePropsProxy(props: Props) {
        return new Proxy(props, {

            get(target, prop) {
                const value = target[prop as keyof Props];
                return typeof value === 'function' ? value.bind(target) : value;
            },

            set: (target, prop, value) => {
                const oldValue = { ...target };
                // eslint-disable-next-line no-param-reassign
                target[prop as keyof Props] = value;
                this._eventBus.emit(Component.EVENT_FLOW_CDU, oldValue, target);
                return true;
            },

        });
    }

    show() {
        this.getContent().style.display = 'block';
    }

    hide() {
        this.getContent().style.display = 'none';
    }

    getContent() {
        return this._element;
    }
}
