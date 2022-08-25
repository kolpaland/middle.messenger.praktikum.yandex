import InputTemplate from './input.hbs';
import './input.scss';
import Block from '../../utils/block';

export type TypeInputData = {
	type: string,
	id: string,
	name: string,
	placeholder: string,
	pattern?: string,
	events?: Record<string, Function>
};

export default (data: TypeInputData) => {
    return InputTemplate(data);
};
export class Input extends Block {
    constructor(props: TypeInputData) {
        super('div', props, true);
    }

    render() {
        return this.compile(InputTemplate);
    }
}
