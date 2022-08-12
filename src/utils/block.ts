class Block {
    static EVENTS: Record<string, string> = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    _element: HTMLElement;
    _meta: {
        tagName: string,
        props: object
    };
    props: object;
    eventBus: Function;

    constructor(tagName: string = "div", props = {}) {
        const eventBus: EventBus = new EventBus();
        this._meta = {
            tagName,
            props
        };

        this.props = this._makePropsProxy(props);

        this.eventBus = () => eventBus;

        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    init() {
        console.log("init");
        this._createResources();
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidMount() {
        console.log("CDM");
        this.componentDidMount();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    componentDidMount() { }

    dispatchComponentDidMoun() {
        console.log("dispatch");
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    _componentDidUpdate(oldProps: object, newProps: object) {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (response) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    componentDidUpdate(oldProps: object, newProps: object) {
        return true;
    }

    setProps = (nextProps: object) => {
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
        console.log("private render");
        this._element.innerHTML = block;
    }

    render(): string {
        return "";
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: object) {
        const self = this;
        const checkPrivateProp = (prop: string) => prop.startsWith('_');
        return new Proxy(props, {
            get(target, prop) {
                if (checkPrivateProp(<string>prop)) {
                    throw new Error("Нет прав");
                } else {
                    const value = target[prop as keyof Object];
                    console.log("get proxy");
                    return (typeof value === 'function') ? value.bind(target) : value;
                }
            },
            set(target, prop, val) {
                if (checkPrivateProp(prop as string)) {
                    throw new Error("Нет прав");
                } else {
                    console.log(val);
                    const oldProp = target[prop as keyof Object];
                    target[prop as keyof Object] = val;
                    self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProp, val);
                    return true;
                }
            },
            deleteProperty(target, prop) {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        return document.createElement(tagName);
    }

    show() {
        if (this._element != null)
            this._element.style.display = "block";
    }

    hide() {
        if (this._element != null)
            this._element.style.display = "none";
    }
}