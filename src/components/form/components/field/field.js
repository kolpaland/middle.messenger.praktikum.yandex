import Field from './field.hbs';
import Label from './../../../label/label.js'
import Input from './../../../input/input.js'

import './field.scss';

export default (data) => {

    return Field({
        label: Label({
            forId: data.id,
            text: data.text
        }),
        input: Input({
            id: data.id,
            name: data.id,
            placeholder: data.placeholder ? data.placeholder : data.text,
            type: data.type
        })
    });
}