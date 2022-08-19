import PageSigninTemplate from './signin.hbs';
import FormTemplate, { Form } from '../../components/form/form';
import Block from '../../utils/block';
import ButtonTemplate, { Button } from '../../components/button/button';
import helpers from '../../utils/helpers';

import './signin.scss';

const events = {
    blur: helpers.onBlurInput,
    focus: helpers.onFocusInput,
    invalid: helpers.onInvalidInput,
};
const data = {
    legend: 'Регистрация',
    rout: '/login',
    routText: 'Войти',
    button: ButtonTemplate('Зарегистрироваться'),
    fields: [
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
    ],
};

export default PageSigninTemplate({
    form: FormTemplate(data),
});

export class PageSignin extends Block {
    constructor() {
        const props = {
            form: new Form({
                ...data,
                button: new Button({
                    text: 'Зарегистрироваться',
                }),
                events: {
                    submit: PageSignin.onSubmit,
                },
            }),
        };

        super('form', props);
    }

    static onSubmit(event: MouseEvent): Boolean {
        event.preventDefault();
        event.stopPropagation();
        const target: HTMLFormElement = event.target as HTMLFormElement;
        const elements: HTMLFormControlsCollection = target.elements as HTMLFormControlsCollection;
        const values = [];
        for (let i = 0; i < data.fields.length; i++) {
            const { id } = data.fields[i];
            const elem = elements.namedItem(id) as HTMLInputElement;
            if (elem && elem.validity.valid) {
                values.push({ label: data.fields[i].text, value: elem.value });
            } else {
                return false;
            }
        }

        values.forEach((item) => {
            console.log(`${item.label}: ${item.value}`);
        });

        target.reset();
        return false;
    }

    render(): DocumentFragment | null {
        return this.compile(PageSigninTemplate, this.props);
    }
}
