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
                    events: {
                        click: PageLogin.onSubmit,
                    },
                }),
                fields: [
                    {
                        id: 'login',
                        text: 'Логин',
                        type: 'text',
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
                        events: {
                            blur: PageLogin.onBlurInput,
                            focus: PageLogin.onFocusInput,
                            invalid: PageLogin.onInvalidInput,
                        },
                    },
                ],
            }),
        };

        super('form', props);
    }

    static onInvalidInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        if (target.value === '') {
            target.setCustomValidity('Enter messsage to send');
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
    }

    render(): DocumentFragment | null {
        return this.compile(PageLoginTemplate, this.props);
    }
}
