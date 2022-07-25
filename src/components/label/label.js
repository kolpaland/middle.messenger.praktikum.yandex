import Label from './label.hbs';

import './label.scss';

export default (forId, text) => {
	return Label({forId, text});
}