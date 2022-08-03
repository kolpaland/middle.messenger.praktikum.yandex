import LayoutProfile from './layoutprofile.hbs';
import * as ellipce from './../../../static/images/profile/Ellipse.png'
import * as union from './../../../static/images/profile/Union.png'
import LabelProfile from './components/labelProfile/labelProfile';
import InputProfile from './components/inputProfile/inputProfile';

import './layoutprofile.scss';

const labelText = {
    email: "Почта",
    login: "Логин",
    first_name: "Имя",
    second_name: "Фамилия",
    phone: "Телефон",
    display_name: "Имя в чате",
    oldPassword: "Старый пароль",
    newPassword: "Новый пароль",
    reenterPassword: "Повторите новый пароль"

}

export default (data, input=false) => {
    let labels = [];

    for (let key in data) {
        let values = {id : key, text : labelText[key], value: data[key]};
        labels.push(input ? InputProfile(values) : LabelProfile(values));
    }

    return LayoutProfile({
        labels,
        union,
        ellipce
    });

}