import PageLogin from './pages/login/login.js';
import PageSignin from './pages/signin/signin.js';
import PageError from './pages/error/error.js';
import PageChat from './pages/chat/chat.js';
import PageNotFound from './pages/notfound/notfound.js';
import PageProfile from './pages/profile/info/infoprofile.js';
import PageChangeProfile from './pages/profile/change/changeprofile.js';
import PagePassword from './pages/profile/password/passwordprofile.js';

const routes = {
    '/login': PageLogin,
    '/signin': PageSignin,
    '/error': PageError,
    '/chat': PageChat,
    '/profile': PageProfile,
    '/changeprofile': PageChangeProfile,
    '/password': PagePassword,
    '/': PageLogin
}
const root = document.querySelector('#root');
const path = window.location.pathname;

if (routes[path]) {

    root.innerHTML = routes[path];
} else {
    root.innerHTML = PageNotFound;
}