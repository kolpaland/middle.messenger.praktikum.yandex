import FieldTemplate from './field.hbs';
import LabelTemplate from '../../../label/label';
import InputTemplate, { Input } from '../../../input/input';
import Block from '../../../../utils/block';

import './field.scss';

export type FieldTemplateType = {
    id: string,
    text: string,
    type: string,
    placeholder?: string
    events?: Record<string, Function>
};

export default (data: FieldTemplateType) => {
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
        }),
    });
};

export class Field extends Block {
    constructor(props: FieldTemplateType) {
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
                events: props.events,
            }),
        };

        super('div', data);
    }

    render() {
        return this.compile(FieldTemplate, this.props);
    }
}
