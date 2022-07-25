import Input from './input.hbs';

import './input.scss';

export default (id, name, placeholder, type = "text") => {
	return Input({id, name, placeholder, type});
}
