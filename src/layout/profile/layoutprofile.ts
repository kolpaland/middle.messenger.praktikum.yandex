import LayoutProfileTemplate from './layoutprofile.hbs';
import * as ellipce from '../../../static/images/profile/Ellipse.png';
import * as union from '../../../static/images/profile/Union.png';
import LabelProfile from './components/labelProfile/labelProfile';
import InputProfileTemplate, { InputProfile } from './components/inputProfile/inputProfile';
import { FieldType, LabelText } from '../../components/constants';
import Block from '../../utils/block';

import './layoutprofile.scss';
import ButtonTemplate, { Button } from '../../components/button/button';

type Profile = {
    input: Boolean,
    email?: string,
    login?: string,
    first_name?: string,
    second_name?: string,
    phone?: string,
    display_name?: string;
    oldPassword?:string,
    newPassword?: string,
    reenterPassword?: string,
    fields: FieldType[],
    button: typeof ButtonTemplate,
    events?: Record<string, Function>
};

type ProfileData = {
    input: Boolean,
    email?: string,
    login?: string,
    first_name?: string,
    second_name?: string,
    phone?: string,
    display_name?: string;
    oldPassword?:string,
    newPassword?: string,
    reenterPassword?: string,
    fields: FieldType[],
    button: Button,
    events?: Record<string, Function>
};

export default (data: Profile) => {
    const fields = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in data) {
        if (key === 'fields' || key === 'input' || key === 'events' || key === 'button') {
            // eslint-disable-next-line no-continue
            continue;
        }

        const values = {
            id: key,
            labelText: LabelText[key as keyof typeof LabelText] as string,
            value: data[key as keyof Profile] as string,
        };
        let index = 0;
        if (data.input) {
            for (; index < data.fields.length; index++) {
                if (data.fields[index].id === key) {
                    break;
                }
            }
        }
        fields.push(data.input ? InputProfileTemplate(data.fields[index]) : LabelProfile(values));
    }

    return LayoutProfileTemplate({
        fields,
        union,
        ellipce,
    });
};

type LayoutProfileProps = {
    fields: Array<InputProfile> | Array<typeof LabelProfile>,
    union: ImageBitmap,
    ellipce: ImageBitmap,
    button: Button,
    events?: Record<string, Function>
}
export class LayoutProfile extends Block<LayoutProfileProps> {
    constructor(props: ProfileData) {
        const fields: typeof LabelProfile[] | InputProfile[] = [];
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in props) {
            if (key === 'fields' || key === 'input' || key === 'events' || key === 'button') {
                // eslint-disable-next-line no-continue
                continue;
            }

            const values = {
                id: key,
                labelText: LabelText[key as keyof typeof LabelText] as string,
                value: props[key as keyof Profile] as string,
            };
            let index = 0;
            if (props.input) {
                for (; index < props.fields.length; index++) {
                    if (props.fields[index].id === key) {
                        break;
                    }
                }
            }
            fields.push(props.input ? new InputProfile(props.fields[index]) : LabelProfile(values));
        }

        super('form', {
            fields,
            union,
            ellipce,
            button: props.button,
            events: props.events,
        });
    }

    render() {
        return this.compile(LayoutProfileTemplate);
    }
}
