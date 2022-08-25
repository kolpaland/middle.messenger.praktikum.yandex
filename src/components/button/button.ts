import ButtonTemplate from './button.hbs';
import Block from '../../utils/block';

import './button.scss';

export default (text: string) => {
    return ButtonTemplate({ text });
};

type ButtonProps = {
    text: string,
    events?: Record<string, Function>
}
export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super('div', props);
    }

    render() {
        return this.compile(ButtonTemplate);
    }
}
