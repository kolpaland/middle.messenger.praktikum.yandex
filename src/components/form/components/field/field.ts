import Field from './field.hbs';
import Label from '../../../label/label';
import Input from '../../../input/input';

import './field.scss';

export default (data: {
    id: string,
    text: string,
    type: string,
    placeholder?: string
}) => {
    return Field({
        label: Label({
            forId: data.id,
            text: data.text,
        }),
        input: Input({
            id: data.id,
            name: data.id,
            placeholder: data.placeholder ? data.placeholder : data.text,
            type: data.type,
        }),
    });
};
