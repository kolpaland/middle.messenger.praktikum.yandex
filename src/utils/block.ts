import { v4 as makeUUID } from 'uuid';

import EventBus from './eventbus';

export default class Block<Props extends { events? : Record<string, Function> } > {
    static EVENT_INIT 		= 'init';

    static EVENT_FLOW_CDM 	= 'flow:component-did-mount';

    static EVENT_FLOW_CDU	= 'flow:component-did-update';

    static EVENT_FLOW_RENDER = 'flow:render';

    private _props;

    private _children;

    private _id;

    private _element: HTMLElement;

    private _meta;

    private _eventBus;

    constructor(tag = 'div', propsAndChilds = {} as Props, simple = false) {
        const { children, props } = this.getChildren(propsAndChilds);

        this._eventBus = new EventBus();
        this._id = makeUUID();
        this._children = this.makePropsProxy(children);
        this._props = this.makePropsProxy({ ...props, __id: this._id }) as Props;
        this._meta = { tag, props, simple };

        this.registerEvents();
        this._eventBus.emit(Block.EVENT_INIT);
    }

    registerEvents() {
        this._eventBus.on(Block.EVENT_INIT, this.init.bind(this));
        this._eventBus.on(Block.EVENT_FLOW_CDM, this._componentDidMount.bind(this));
        this._eventBus.on(Block.EVENT_FLOW_CDU, this._componentDidUpdate.bind(this));
        this._eventBus.on(Block.EVENT_FLOW_RENDER, this._render.bind(this));
    }

    init() {
        this._element = this.createDocumentElement(this._meta?.tag);
        this._eventBus.emit(Block.EVENT_FLOW_RENDER);
    }

    createDocumentElement(tag: string) {
        const element = document.createElement(tag);
        return element;
    }

    private _render() {
        const block = this.render();
        this.removeEvents();
        if (this._meta.simple) {
            this._element = block?.firstChild as HTMLElement;
        } else {
            this._element.innerHTML = '';
            this._element.appendChild(block as Node);
        }

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
        const children: Props = {} as Props;
        const props: Props = {} as Props;

        Object.keys(propsAndChilds).forEach((key) => {
            const child = propsAndChilds[key as keyof Props];
            if (child instanceof Block) {
                children[key as keyof Props] = child;
            } else if (Array.isArray(child) && child[0] instanceof Block) {
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
                const arr: string[] = [];
                for (let i = 0; i < child.length; i++) {
                    arr.push(`<div data-id="${child[i]._id}"></div>`);
                }
                propsAndStubs[key as keyof Props] = arr;
            } else {
                propsAndStubs[key as keyof Props] = `<div data-id="${child._id}"></div>`;
            }
        });

        const fragment: HTMLTemplateElement = this.createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = template(propsAndStubs);// Handlebars.compile(template)(propsAndStubs);

        Object.values(this._children).forEach((child) => {
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

    private _componentDidMount() {
        this.componentDidMount();
        Object.values(this._children).forEach((child) => { child.dispatchComponentDidMount(); });
    }

    componentDidMount() {}

    dispatchComponentDidMount() {
        this._eventBus.emit(Block.EVENT_FLOW_CDM);
        if (Object.keys(this._children).length) { this._eventBus.emit(Block.EVENT_FLOW_RENDER); }
    }

    private _componentDidUpdate(oldProps: Props, newProps: Props) {
        const isReRender = this.componentDidUpdate(oldProps, newProps);
        if (isReRender) { this._eventBus.emit(Block.EVENT_FLOW_RENDER); }
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
                this._eventBus.emit(Block.EVENT_FLOW_CDU, oldValue, target);
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
