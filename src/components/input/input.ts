import Input from './input.hbs';

import './input.scss';

export default (data: {
	type: string,
	id: string,
	name: string,
	placeholder: string
}) => {
	return Input(data);
}

