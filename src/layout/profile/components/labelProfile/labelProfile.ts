import LabelProfile from './labelProfile.hbs';

import './labelProfile.scss';

export default (data: {id: string, text: string, value: string}) => {
    return LabelProfile(data);
};
