import PageLoginTemplate from './login.hbs';
import FormTemplate, { Form } from '../../components/form/form';
import Component from '../../utils/component';
import { Field } from '../../components/form/components/field/field';

import ButtonTemplate, { Button } from '../../components/button/button';
import helpers from '../../utils/helpers';

import './login.scss';

export default PageLoginTemplate({
    form: FormTemplate({
        legend: 'Вход',
        rout: '/signin',
        routText: 'Нет аккаунта?',
        button: ButtonTemplate('Войти'),
        fields: [
            {
                id: 'login',
                text: 'Логин',
                type: 'text',
            },
            {
                id: 'password',
                text: 'Пароль',
                type: 'password',
            },
        ],
    }),
});

export class PageLogin extends Component {
    constructor() {
        const events = {
            blur: helpers.onBlurInput,
            focus: helpers.onFocusInput,
            invalid: helpers.onInvalidInput,
        };
        const props = {
            form: new Form({
                legend: 'Вход',
                rout: '/signin',
                routText: 'Нет аккаунта?',
                button: new Button({
                    text: 'Войти',
                }),
                fields: [new Field(
                    {
                        id: 'login',
                        text: 'Логин',
                        type: 'text',
                        pattern: '[0-9A-Za-z_-]{3,20}',
                        events,
                    },
                ),
                new Field({
                    id: 'password',
                    text: 'Пароль',
                    type: 'password',
                    pattern: '[0-9A-Za-z]{8,40}',
                    events,
                }),
                ],
                events: {
                    submit: PageLogin.onSubmit,
                },
            }),
        };

        super('div', props);
    }

    static onSubmit(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        const target: HTMLFormElement = event.target as HTMLFormElement;
        const elements: HTMLFormControlsCollection = target.elements as HTMLFormControlsCollection;
        const login = elements.namedItem('login') as HTMLInputElement;
        const password = elements.namedItem('password')as HTMLInputElement;
        if (login && password && login.validity.valid && password.validity.valid) {
            console.log(`Логин: ${login.value}`);
            console.log(`Пароль: ${password.value}`);
            target.reset();
        }
    }

    render(): Node | undefined {
        return this.compile(PageLoginTemplate);
    }
}
