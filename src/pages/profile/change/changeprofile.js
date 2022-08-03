import PageChangeProfile from './changeprofile.hbs';
import LayoutProfile from './../../../layout/profile/layoutprofile.js';
import Button from './../../../components/button/button.js';

import './changeprofile.scss';

function getProfile(){
    return {
        email: "pochta@yandex.ru",
        login: "ivanivanov",
        first_name: "Иван",
        second_name: "Иванов",
        phone: "+7 (909) 967 30 30",
        display_name: "Иван"
    }
}

const data = getProfile();

export default PageChangeProfile({
    layoutProfile : LayoutProfile(data, true),
    button: Button("Сохранить")
});