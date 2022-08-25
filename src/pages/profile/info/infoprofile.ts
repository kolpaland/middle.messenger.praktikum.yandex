import PageInfoProfile from './infoprofile.hbs';
import LayoutProfile from '../../../layout/profile/layoutprofile';

import './infoprofile.scss';

function getProfile() {
    return {
        email: 'pochta@yandex.ru',
        login: 'ivanivanov',
        first_name: 'Иван',
        second_name: 'Иванов',
        phone: '+7 (909) 967 30 30',
        display_name: 'Иван',
    };
}

const data = getProfile();

export default PageInfoProfile({
    layoutProfile: LayoutProfile(data),
});
