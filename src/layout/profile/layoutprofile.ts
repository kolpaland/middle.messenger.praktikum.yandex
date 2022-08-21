import LayoutProfileTemplate from './layoutprofile.hbs';
import * as ellipce from '../../../static/images/profile/Ellipse.png';
import * as union from '../../../static/images/profile/Union.png';
import LabelProfile from './components/labelProfile/labelProfile';
import InputProfileTemplate, { InputProfile } from './components/inputProfile/inputProfile';
import { FieldType, LabelText } from '../../components/constants';
import Block from '../../utils/block';

import './layoutprofile.scss';

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
    fieldsdata: FieldType[],
    events?: Record<string, Function>
};

export default (data: Profile) => {
    const fields = [];
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in data) {
        if (key === 'fieldsdata' || key === 'input' || key === 'events') {
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
            for (; index < data.fieldsdata.length; index++) {
                if (data.fieldsdata[index].id === key) {
                    break;
                }
            }
        }

        fields.push(data.input ? InputProfileTemplate(data.fieldsdata[index]) : LabelProfile(values));
    }

    return LayoutProfileTemplate({
        fields,
        union,
        ellipce,
    });
};

export class LayoutProfile extends Block {
    constructor(props: Profile) {
        const fields: typeof LabelProfile[] | InputProfile[] = [];
        // eslint-disable-next-line no-restricted-syntax, guard-for-in
        for (const key in props) {
            if (key === 'fieldsdata' || key === 'input' || key === 'events') {
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
                for (; index < props.fieldsdata.length; index++) {
                    if (props.fieldsdata[index].id === key) {
                        break;
                    }
                }
            }
            fields.push(props.input ? new InputProfile(props.fieldsdata[index]) : LabelProfile(values));
        }

        super('div', {
            fields,
            union,
            ellipce,
        });
    }

    render() {
        return this.compile(LayoutProfileTemplate, this.props);
    }
}
