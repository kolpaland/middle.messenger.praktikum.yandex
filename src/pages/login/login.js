import PageLogin from './login.hbs';
import Button from './../../components/button/button.js'
import Input from './../../components/input/input.js'
import Label from './../../components/label/label.js'

import './login.scss';

export default PageLogin({ 
    button: Button("Войти"),
    labelLogin: Label("login", "Логин"),
    inputLogin: Input("login", "login", "Логин"),
    labelPassword: Label("password", "Пароль"),
    inputPassword: Input("password", "password", "Пароль", "password")
 });