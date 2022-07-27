import PageLogin from './pages/login/login.js';
import PageSignin from './pages/signin/signin.js';
import PageError from './pages/error/error.js';
import PageChat from './pages/chat/chat.js';
import PageNotFound from './pages/notfound/notfound.js';

const routes = {
    '/login': PageLogin,
    '/signin': PageSignin,
    '/error': PageError,
    '/chat': PageChat,
    '/': PageLogin
}
const root = document.querySelector('#root');
const path = window.location.pathname;

if (routes[path]) {

    root.innerHTML = routes[path];
} else {
    root.innerHTML = PageNotFound;
}