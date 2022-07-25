import PageSignin from './signin.hbs';
import Button from './../../components/button/button.js'
import Input from './../../components/input/input.js'
import Label from './../../components/label/label.js'

import './signin.scss';

export default PageSignin({ 
    button: Button("Зарегистрироваться"),
    labelEmail: Label("email", "Почта"),
    inputEmail: Input("email", "email", "Почта"),
    labelPassword: Label("password", "Пароль"),
    inputPassword: Input("password", "password", "Пароль", "password")
 });