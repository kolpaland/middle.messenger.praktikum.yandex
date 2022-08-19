import InputTemplate from './input.hbs';
import Block from '../../utils/block';

import './input.scss';

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
        super('input', props);
    }

    render() {
        return this.compile(InputTemplate, this.props);
    }
}
