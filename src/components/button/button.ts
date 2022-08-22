import ButtonTemplate from './button.hbs';
//import Block from '../../utils/block';

import './button.scss';
import Component from '../../utils/component';

export default (text: string) => {
    return ButtonTemplate({ text });
};

export class Button extends Component {
    constructor(props: { text: string, events?: Record<string, Function> }) {
        super('button', props);
    }

    render() {
        return this.compile(ButtonTemplate);
    }
}
