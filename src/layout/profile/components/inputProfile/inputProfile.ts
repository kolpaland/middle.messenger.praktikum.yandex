import InputProfile from './inputProfile.hbs';

import './inputProfile.scss';

export default (data: {id: string, text: string, value: string}) => {
    return InputProfile(data);
};
