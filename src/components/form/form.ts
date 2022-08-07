import Form from './form.hbs';
import Button from './../../components/button/button'
import Field from './components/field/field'

import './form.scss';

type FieldType = {
    id: string,
    text: string,
    type: string,
    placeholder?: string
};

export default (data: {
    legend: string,
    rout: string,
    routText: string,
    buttonText: string,
    fields: Array<FieldType>
}) => {
    
    let fields = [];

    for(let i = 0; i < data.fields.length; i++){
        fields.push(Field(data.fields[i]));
    }

    return Form({
        fields,
        legend: data.legend, 
        rout: data.rout, 
        routText: data.routText,
        button: Button(data.buttonText),
    });
}