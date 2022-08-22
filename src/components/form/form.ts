import FormTemplate from './form.hbs';
import ButtonTemplate, { Button } from '../../components/button/button';
import FieldTemplate, { Field } from './components/field/field';
import { FieldType } from '../constants';
//import Block from '../../utils/block';
import Component from '../../utils/component';

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
    fields: Array<FieldType>,
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

export class Form extends Component {
    constructor(props: FormDataType) {
        const {
            legend,
            rout,
            routText,
            button,
            events,
        } = props;
        const fields = [];

        for (let i = 0; i < props.fields.length; i++) {
            fields.push(new Field(props.fields[i]));
        }
        const data = {
            legend,
            rout,
            routText,
            button,
            fields,
            events,
        };

        super('div', data);
    }

    render() {
        return this.compile(FormTemplate);
    }
}
