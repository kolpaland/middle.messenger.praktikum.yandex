import InputTemplate from './input.hbs';
import { Block } from './../../utils/block'

import './input.scss';

export default (data: {
	type: string,
	id: string,
	name: string,
	placeholder: string
}) => {
	return InputTemplate(data);
}

export class Input extends Block {
	constructor(props: {
		type: string,
		id: string,
		name: string,
		placeholder: string,
		events?: Record<string, Function>
	}) {
		super("input", props);
	}

	render() {
		return this.compile(InputTemplate, this.props);
	}
}
