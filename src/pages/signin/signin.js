import PageSignin from './signin.hbs';
import Form from './../../components/form/form.js'

import './signin.scss';

export default PageSignin({
    form: Form({
        legend: "Регистрация",
        rout: "/login",
        routText: "Войти",
        buttonText: "Зарегистрироваться",
        fields: [
            {
                id: "email",
                text: "Почта",
                type: "text"    
            },
            {
                id: "login",
                text: "Логин",
                type: "text"    
            },
            {
                id: "first_name",
                text: "Имя",
                type: "text"    
            },
            {
                id: "second_name",
                text: "Фамилия",
                type: "text"    
            },
            {
                id: "phone",
                text: "Телефон",
                type: "tel",
                placeholder: "8-(999)-123-11-00"
            },
            {
                id: "password",
                text: "Пароль",
                type: "password"    
            },
            {
                id: "password",
                text: "Пароль ещё раз",
                type: "password"
            }  
        ]
    }) 

 });