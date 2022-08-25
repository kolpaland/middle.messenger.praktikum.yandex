import PageChangeProfileTemplate from './changeprofile.hbs';
import LayoutProfileTemplate, { LayoutProfile } from '../../../layout/profile/layoutprofile';
import ButtonTemplate, { Button } from '../../../components/button/button';
import fieldsdata, { events } from '../../../components/constants';
import Block from '../../../utils/block';

import './changeprofile.scss';

function getProfile() {
    const fields = [];
    // take first 5 fields, exclude password

    for (let i = 0; i < 5; i++) {
        fields.push(fieldsdata[i]);
    }
    fields.push({
        id: 'display_name',
        text: 'Имя',
        type: 'text',
        pattern: '[A-Za-zА-Яа-я-]{1,100}',
        events,
    });
    return {
        input: true,
        email: 'pochta@yandex.ru',
        login: 'ivanivanov',
        first_name: 'Иван',
        second_name: 'Иванов',
        phone: '+7 (909) 967 30 30',
        display_name: 'Иван',
        button: ButtonTemplate('Сохранить'),
        fields,
    };
}

const data = getProfile();

export default PageChangeProfileTemplate({
    layoutProfile: LayoutProfileTemplate(data),
});
export class PageChangeProfile extends Block {
    constructor() {
        const props = {
            layoutProfile: new LayoutProfile({
                ...data,
                button: new Button({ text: 'Сохранить' }),
                events: {
                    submit: PageChangeProfile.onSubmit,
                },
            }),
        };

        super('div', props);
    }

    static onSubmit(event: SubmitEvent) {
        const { fields } = getProfile();
        event.preventDefault();
        event.stopPropagation();
        const target: HTMLFormElement = event.target as HTMLFormElement;
        const elements: HTMLFormControlsCollection = target.elements as HTMLFormControlsCollection;
        const values = [];
        for (let i = 0; i < fields.length; i++) {
            const { id } = fields[i];
            const elem = elements.namedItem(id) as HTMLInputElement;
            if (elem && elem.validity.valid) {
                values.push({ label: fields[i].text, value: elem.value });
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
        return this.compile(PageChangeProfileTemplate);
    }
}
