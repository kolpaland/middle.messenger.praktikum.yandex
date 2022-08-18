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
                    },
                    {
                        id: 'password',
                        text: 'Пароль',
                        type: 'password',
                    },
                ],
            }),
        };

        super('form', props);
    }

    static onSubmit() {
        console.log('login submit');
    }

    render(): DocumentFragment | null {
        return this.compile(PageLoginTemplate, this.props);
    }
}
