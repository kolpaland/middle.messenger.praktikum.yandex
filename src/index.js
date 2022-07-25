
//import {sum} from './modules/sum';
//import tpl from './index.hbs';
import PageLogin from './pages/login/login.js';
import PageSignin from './pages/signin/signin.js';

const routes = {
    '/login' : PageLogin,
    '/signin': PageSignin,
    '/': PageLogin
}

const path = window.location.pathname;

console.log('path ' + path);
if (routes[path]) {
    document.body.innerHTML = routes[path];
} else {
    document.body.innerHTML = PageLogin;
}


//document.body.innerHTML = tpl({id: "root"});

//const root = document.querySelector('#root');
//root.textContent = sum(6, -1).toString(); 