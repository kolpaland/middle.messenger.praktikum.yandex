import Label from './label.hbs';

import './label.scss';

export default (data: { forId:string, text: string }) => {
	return Label(data);
}