import LayoutProfile from './layoutprofile.hbs';
import * as ellipce from '../../../static/images/profile/Ellipse.png';
import * as union from '../../../static/images/profile/Union.png';
import LabelProfile from './components/labelProfile/labelProfile';
import InputProfile from './components/inputProfile/inputProfile';

import './layoutprofile.scss';

// eslint-disable-next-line no-shadow
enum LabelText {
    email = 'Почта',
    login = 'Логин',
    first_name = 'Имя',
    second_name = 'Фамилия',
    phone = 'Телефон',
    display_name = 'Имя в чате',
    oldPassword = 'Старый пароль',
    newPassword = 'Новый пароль',
    reenterPassword = 'Повторите новый пароль'
}

type Profile = {
    email?: string;
    login?: string;
    first_name?: string;
    second_name?: string;
    phone?: string;
    display_name?: string;
    oldPassword?: string;
    newPassword?: string;
    reenterPassword?: string;
};

export default (data: Profile, input = false) => {
    const labels = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in data) {
        const values = {
            id: key,
            text: LabelText[key as keyof typeof LabelText] as string,
            value: data[key as keyof Profile] as string,
        };
        labels.push(input ? InputProfile(values) : LabelProfile(values));
    }

    return LayoutProfile({
        labels,
        union,
        ellipce,
    });
};
