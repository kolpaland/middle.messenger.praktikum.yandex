import PageProfile from './profile.hbs';
import * as ellipce from './../../../static/images/profile/Ellipse.png'
import * as union from './../../../static/images/profile/Union.png'
import LabelProfile from './components/labelProfile/labelProfile.js';

import './profile.scss';

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

const labelText = {
    email: "Почта",
    login: "Логин",
    first_name: "Имя",
    second_name: "Фамилия",
    phone: "Телефон",
    display_name: "Имя в чате"
}


const data = getProfile();

let labels = [];

for (let key in data) {
    labels.push(LabelProfile({id : key, text : labelText[key], value: data[key]}));
}

export default PageProfile({
    ellipce,
    union,
    labels
});