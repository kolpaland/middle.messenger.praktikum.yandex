import InputTemplate from './input.hbs';
import Block from '../../utils/block';

import './input.scss';

type TypeInputData = {
	type: string,
	id: string,
	name: string,
	placeholder: string
};

export default (data: TypeInputData) => {
    return InputTemplate(data);
};

type TypeInputProps = {
	type: string,
	id: string,
	name: string,
	placeholder: string,
	events?: Record<string, Function>
};

export class Input extends Block {
    constructor(props: TypeInputProps) {
        super('input', props);
    }

    render() {
        return this.compile(InputTemplate, this.props);
    }
}
