import FieldTemplate from './field.hbs';
import LabelTemplate from '../../../label/label';
import InputTemplate, { Input } from '../../../input/input';
//import Block from '../../../../utils/block';
import Component from '../../../../utils/component';
import Block from '../../../../utils/block';
import { FieldType } from '../../../constants';

import './field.scss';

export default (data: FieldType) => {
    return FieldTemplate({
        label: LabelTemplate({
            forId: data.id,
            text: data.text,
        }),
        input: InputTemplate({
            id: data.id,
            name: data.id,
            placeholder: data.placeholder ? data.placeholder : data.text,
            type: data.type,
            pattern: data.pattern,
        }),
    });
};

type FieldProps = {
    label: typeof LabelTemplate,
    input: Input,
    events?: Record<string, Function>
}
export class Field extends Block<FieldProps> {
    constructor(props: FieldType) {
        const data = {
            label: LabelTemplate({
                forId: props.id,
                text: props.text,
            }),
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
        return this.compile(FieldTemplate);
    }
}
