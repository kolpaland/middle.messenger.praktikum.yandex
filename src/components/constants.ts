import helpers from '../utils/helpers';

export type FieldType = {
    id: string,
    text: string,
    type: string,
    placeholder?: string,
    pattern?: string,
    events?: Record<string, Function>
};

export const events = {
    blur: helpers.onBlurInput,
    focus: helpers.onFocusInput,
    invalid: helpers.onInvalidInput,
};

// eslint-disable-next-line no-shadow
export enum LabelText {
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

const fields: FieldType[] = [
    {
        id: 'email',
        text: 'Почта',
        type: 'text',
        pattern: '[a-z0-9]+@[a-z]+\.[a-z]{2,3}',
        events,
    },
    {
        id: 'login',
        text: 'Логин',
        type: 'text',
        pattern: '[0-9A-Za-z_-]{3,20}',
        events,
    },
    {
        id: 'first_name',
        text: 'Имя',
        type: 'text',
        pattern: '[A-Za-zА-Яа-я-]{1,100}',
        events,
    },
    {
        id: 'second_name',
        text: 'Фамилия',
        type: 'text',
        pattern: '[A-Za-zА-Яа-я-]{1,100}',
        events,
    },
    {
        id: 'phone',
        text: 'Телефон',
        type: 'tel',
        placeholder: '+89991231100',
        pattern: '[0-9]{10,15}',
        events,
    },
    {
        id: 'password',
        text: 'Пароль',
        type: 'password',
        pattern: '[0-9A-Za-z]{8,40}',
        events,
    },
    {
        id: 'check_password',
        text: 'Пароль ещё раз',
        type: 'password',
        pattern: '[0-9A-Za-z]{8,40}',
        events,
    },
];

export default fields;
