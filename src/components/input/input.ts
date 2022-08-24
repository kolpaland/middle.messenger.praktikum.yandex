import InputTemplate from './input.hbs';
import Component from '../../utils/component';
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
export class Input extends Component {
    constructor(props: TypeInputData) {
        super('input', props, true);
    }

    render() {
        return this.compile(InputTemplate);
    }
}
