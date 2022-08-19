import PageLoginTemplate from './login.hbs';
import FormTemplate, { Form } from '../../components/form/form';
import Block from '../../utils/block';
import ButtonTemplate, { Button } from '../../components/button/button';

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

export class PageLogin extends Block {
    constructor() {
        const props = {
            form: new Form({
                legend: 'Вход',
                rout: '/signin',
                routText: 'Нет аккаунта?',
                button: new Button({
                    text: 'Войти',
                }),
                fields: [
                    {
                        id: 'login',
                        text: 'Логин',
                        type: 'text',
                        pattern: '[0-9A-Za-z_-]{3,20}',
                        events: {
                            blur: PageLogin.onBlurInput,
                            focus: PageLogin.onFocusInput,
                            invalid: PageLogin.onInvalidInput,
                        },
                    },
                    {
                        id: 'password',
                        text: 'Пароль',
                        type: 'password',
                        pattern: '[0-9A-Za-z]{8,40}',
                        events: {
                            blur: PageLogin.onBlurInput,
                            focus: PageLogin.onFocusInput,
                            invalid: PageLogin.onInvalidInput,
                        },
                    },
                ],
                events: {
                    submit: PageLogin.onSubmit,
                },
            }),
        };

        super('form', props);
    }

    static onInvalidInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        if (target.value === '') {
            target.setCustomValidity(`${target.name} is empty!`);
        }
        if (target.validity.patternMismatch) {
            target.setCustomValidity(`${target.name} has pattern mismatch!`);
        }
    }

    static onBlurInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity('');
        target.checkValidity();
    }

    static onFocusInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity('');
        target.reportValidity();
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

    render(): DocumentFragment | null {
        return this.compile(PageLoginTemplate, this.props);
    }
}
