import PagePasswordProfile from './passwordprofile.hbs';
import LayoutProfile from '../../../layout/profile/layoutprofile';
import ButtonTemplate from '../../../components/button/button';
import { events, LabelText } from '../../../components/constants';

import './passwordprofile.scss';

const attr = {
    type: 'password',
    pattern: '[0-9A-Za-z]{8,40}',
    events,
};

const data = {
    input: true,
    oldPassword: '0000',
    newPassword: '0000',
    reenterPassword: '0000',
    fields: [{
        id: 'oldPassword',
        text: LabelText.oldPassword,
        ...attr,
    },
    {
        id: 'newPassword',
        text: LabelText.newPassword,
        ...attr,
    },
    {
        id: 'reenterPassword',
        text: LabelText.reenterPassword,
        ...attr,
    }],
};

export default PagePasswordProfile({
    layoutProfile: LayoutProfile(data),
    button: ButtonTemplate('Сохранить'),
});
