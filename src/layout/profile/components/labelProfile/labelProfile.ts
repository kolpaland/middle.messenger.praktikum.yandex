import LabelProfile from './labelProfile.hbs';

import './labelProfile.scss';

export default (data: {id: string, labelText: string, value: string}) => {
    return LabelProfile(data);
};
