import PageSigninTemplate from './signin.hbs';
import FormTemplate, { Form } from '../../components/form/form';
import Block from '../../utils/block';
import ButtonTemplate, { Button } from '../../components/button/button';
import fields from '../../components/constants';

import './signin.scss';
import { Field } from '../../components/form/components/field/field';

const data = {
    legend: 'Регистрация',
    rout: '/login',
    routText: 'Войти',
    button: ButtonTemplate('Зарегистрироваться'),
    fields,
};

export default PageSigninTemplate({
    form: FormTemplate(data),
});

export class PageSignin extends Block {
    constructor() {
        const formfields = [];
        for (let i = 0; i < fields.length; i++) {
            formfields.push(new Field(fields[i]));
        }

        const props = {
            form: new Form({
                ...data,
                fields: formfields,
                button: new Button({
                    text: 'Зарегистрироваться',
                }),
                events: {
                    submit: PageSignin.onSubmit,
                },
            }),
        };

        super('div', props);
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

    render(): Node | undefined {
        return this.compile(PageSigninTemplate);
    }
}
