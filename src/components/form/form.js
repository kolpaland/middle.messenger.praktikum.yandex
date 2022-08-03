import Form from './form.hbs';
import Button from './../../components/button/button.js'
import Field from './components/field/field.js'

import './form.scss';

export default (data) => {
    
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