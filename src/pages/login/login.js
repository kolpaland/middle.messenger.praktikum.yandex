import PageLogin from './login.hbs';
import Form from './../../components/form/form.js'

import './login.scss';

export default PageLogin({ 
    form: Form({
        legend: "Вход",
        rout: "/signin",
        routText: "Нет аккаунта?",
        buttonText: "Войти",
        fields: [
            {
                id: "login",
                text: "Логин",
                type: "text"    
            },
            {
                id: "password",
                text: "Пароль",
                type: "password"
            }  
        ]
    }),
 });