import ButtonTemplate from './button.hbs';
import Block from '../../utils/block';

import './button.scss';

export default (text: string) => {
    return ButtonTemplate({ text });
};

export class Button extends Block {
    constructor(props: { text: string, events?: Record<string, Function> }) {
        super('button', props);
    }

    render() {
        return this.compile(ButtonTemplate, this.props);
    }
}
