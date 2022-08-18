import FormTemplate from './form.hbs';
import ButtonTemplate, { Button } from '../../components/button/button';
import FieldTemplate, { FieldTemplateType, Field } from './components/field/field';
import Block from '../../utils/block';

import './form.scss';

type FormTemplateDataType = {
    legend: string,
    rout: string,
    routText: string,
    buttonText: string,
    fields: Array<FieldTemplateType>
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
        button: ButtonTemplate(data.buttonText),
    });
};

export class Form extends Block {
    constructor(props: FormTemplateDataType) {
        const { legend, rout, routText } = props;
        const fields = [];

        for (let i = 0; i < props.fields.length; i++) {
            fields.push(new Field(props.fields[i]));
        }
        const data = {
            legend,
            rout,
            routText,
            button: new Button({ text: props.buttonText }),
            fields,
        };

        super('form', data);
    }

    render() {
        return this.compile(FormTemplate, this.props);
    }
}
