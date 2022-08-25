import Block from '../../../../utils/block';
import InputProfileTemplate from './inputProfile.hbs';
import InputTemplate, { Input } from '../../../../components/input/input';
import { FieldType } from '../../../../components/constants';

import './inputProfile.scss';

export default (data: FieldType) => {
    const props = {
        id: data.id,
        name: data.id,
        placeholder: data.placeholder ? data.placeholder : data.text,
        type: data.type,
        pattern: data.pattern,
        events: data.events,
    };
    return InputProfileTemplate({
        labelText: data.text,
        input: InputTemplate(props),
    });
};

export class InputProfile extends Block {
    constructor(props: FieldType) {
        const data = {
            labelText: props.text,
            input: new Input({
                id: props.id,
                name: props.id,
                placeholder: props.placeholder ? props.placeholder : props.text,
                type: props.type,
                pattern: props.pattern,
                events: props.events,
            }),
        };

        super('div', data);
    }

    render() {
        return this.compile(InputProfileTemplate);
    }
}
