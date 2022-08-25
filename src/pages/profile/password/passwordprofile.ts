import PagePasswordTemplate from './passwordprofile.hbs';
import LayoutProfileTemplate, { LayoutProfile } from '../../../layout/profile/layoutprofile';
import ButtonTemplate from '../../../components/button/button';
import { events, LabelText } from '../../../components/constants';
import Block from '../../../utils/block';

import './passwordprofile.scss';

function getPasswordFields() {
    const attr = {
        type: 'password',
        pattern: '[0-9A-Za-z]{8,40}',
        events,
    };
    return {
        input: true,
        oldPassword: '0000',
        newPassword: '0000',
        reenterPassword: '0000',
        button: ButtonTemplate('Сохранить'),
        fields: [{
            id: 'oldPassword',
            text: LabelText.oldPassword,
            ...attr,
        },
        {
            id: 'newPassword',
            text: LabelText.newPassword,
            ...attr,
        },
        {
            id: 'reenterPassword',
            text: LabelText.reenterPassword,
            ...attr,
        }],
    };
}

export default PagePasswordTemplate({
    layoutProfile: LayoutProfileTemplate(getPasswordFields()),
});

export class PagePasswordProfile extends Block {
    constructor() {
        const props = {
            layoutProfile: new LayoutProfile({
                ...getPasswordFields(),
                events: {
                    submit: PagePasswordProfile.onSubmit,
                },
            }),
        };

        super('div', props);
    }

    static onSubmit(event: SubmitEvent) {
        event.preventDefault();
        event.stopPropagation();
        const data = getPasswordFields();
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
        return this.compile(PagePasswordTemplate);
    }
}
