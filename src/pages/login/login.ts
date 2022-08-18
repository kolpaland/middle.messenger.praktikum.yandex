import PageLoginTemplate from './login.hbs';
import FormTemplate, { Form } from '../../components/form/form';
import Block from '../../utils/block';

import './login.scss';

export default PageLoginTemplate({
    form: FormTemplate({
        legend: 'Вход',
        rout: '/signin',
        routText: 'Нет аккаунта?',
        buttonText: 'Войти',
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
                buttonText: 'Войти',
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

    render(): DocumentFragment | null {
        return this.compile(PageLoginTemplate, this.props);
    }
}
