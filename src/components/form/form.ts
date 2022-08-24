import FormTemplate from './form.hbs';
import ButtonTemplate, { Button } from '../../components/button/button';
import FieldTemplate, { Field } from './components/field/field';
import { FieldType } from '../constants';
import Component from '../../utils/component';
import Block from '../../utils/block';

import './form.scss';

type FormTemplateDataType = {
    legend: string,
    rout: string,
    routText: string,
    button: typeof ButtonTemplate,
    fields: Array<FieldType>
};

type FormDataType = {
    legend: string,
    rout: string,
    routText: string,
    button: Button,
    fields: Array<Field>,
    events?: Record<string, Function>
};

export default (data: FormTemplateDataType) => {
    const fields = [];

    for (let i = 0; i < data.fields.length; i++) {
        fields.push(FieldTemplate(data.fields[i]));
    }

    return FormTemplate({
        fields,
        legend: data.legend,
        rout: data.rout,
        routText: data.routText,
        button: data.button,
    });
};

export class Form extends Block {
    constructor(props: FormDataType) {
        super('form', props);
    }

    render() {
        return this.compile(FormTemplate);
    }
}
