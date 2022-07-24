import PageLogin from './login.hbs';
import Button from './../../components/button/button.js'
import Input from './../../components/input/input.js'

import './login.scss';

function pageLoginInput( id, name, placeholder, type = "text"){
    return { id, name, placeholder, type };
}

export default PageLogin({ 
    button: Button("Войти"),
    inputLogin: Input(pageLoginInput("login", "login", "Логин")),
    inputPassword: Input(pageLoginInput("password", "password", "Пароль", "password"))
 });