import { v4 as makeUUID } from 'uuid';

import EventBus from './eventbus';

type Props = { [key: string]: unknown,
    events?: Record<string, Function>
};

// eslint-disable-next-line no-use-before-define
type Children = Record<string, Block>;

export default class Block {
    static EVENTS: Record<string, string> = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_RENDER: 'flow:render',
    };

    _element: HTMLElement;

    _meta: {
        tagName: string,
        props: object
    };

    _id: string;

    props: Props;

    children: Children;

    eventBus: Function;

    constructor(tagName: string = 'div', propsAndChildren: Props = {} as Props) {
        const eventBus: EventBus = new EventBus();

        const { children, props } = this._getChildren(propsAndChildren);

        this.children = children;
        this._meta = {
            tagName,
            props,
        };

        this._id = makeUUID();

        this.props = this._makePropsProxy(props);

        this.eventBus = () => { return eventBus; };

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _getChildren(propsAndChildren: Props) {
        const children: Children = {} as Children;
        const props: Props = {} as Props;

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key as keyof Props] = value;
            }
        });

        return { children, props };
    }

    compile(template: Function, props: Props) {
        const propsAndStubs = { ...props };

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key as keyof Props] = `<div data-id="${child._id}"></div>`;
        });

        const fragment: HTMLTemplateElement | null = this._createDocumentElement('template') as HTMLTemplateElement;

        if (fragment === null) return null;

        fragment.innerHTML = template(propsAndStubs);

        Object.values(this.children).forEach((child) => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

            if (stub != null) {
                stub.replaceWith(child.getContent());
            }
        });
        return fragment.content;
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    registerEvents(events: Record<string, Function>) {
        this._removeEvents();
        this.props.events = events;
    }

    _addEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            this._element.addEventListener(
eventName as keyof HTMLElementEventMap,
                events[eventName] as EventListener,
            );
        });
    }

    _removeEvents() {
        const { events = {} } = this.props;
        Object.keys(events).forEach((eventName) => {
            this._element.removeEventListener(
eventName as keyof HTMLElementEventMap,
                events[eventName] as EventListener,
            );
        });
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() { }

    dispatchComponentDidMoun() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: Props, newProps: Props) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: Props, newProps: Props) {
        if (oldProps === newProps) {
            return true;
        }
        return false;
    }

    setProps = (nextProps: Props) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    _render() {
        const block = this.render();
        this._removeEvents();
        this._element.innerHTML = '';
        this._element.appendChild(block as Node);
        this._addEvents();
    }

    render(): DocumentFragment | null {
        return null;
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: Props) {
        const self = this;
        const checkPrivateProp = (prop: string) => { return prop.startsWith('_'); };
        return new Proxy(props, {
            get(target, prop) {
                if (checkPrivateProp(<string>prop)) {
                    throw new Error('Нет прав');
                } else {
                    const value = target[prop as keyof Props];
                    return (typeof value === 'function') ? <Function>value.bind(target) : value;
                }
            },
            set(target, prop, val) {
                if (checkPrivateProp(prop as string)) {
                    throw new Error('Нет прав');
                } else {
                    const oldProp = target[prop as keyof Props];
                    // eslint-disable-next-line no-param-reassign
                    target[prop as keyof Props] = val;
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProp, val);
                    return true;
                }
            },
            deleteProperty(target, prop) {
                throw new Error(`Нет доступа ${target} ${String(prop)}`);
            },
        });
    }

    _createDocumentElement(tagName: string) {
        const element = document.createElement(tagName);
        element.setAttribute('data-id', this._id);
        return element;
    }

    show() {
        if (this._element != null) {
            this._element.style.display = 'block';
        }
    }

    hide() {
        if (this._element != null) {
            this._element.style.display = 'none';
        }
    }
}
