import PageLogin from './pages/login/login';
import PageSignin from './pages/signin/signin';
import PageError from './pages/error/error';
import PageChat from './pages/chat/chat';
import PageNotFound from './pages/notfound/notfound';
import PageProfile from './pages/profile/info/infoprofile';
import PageChangeProfile from './pages/profile/change/changeprofile';
import PagePassword from './pages/profile/password/passwordprofile';

const routes : { [key: string]: string } = {
    '/login': PageLogin,
    '/signin': PageSignin,
    '/error': PageError,
    '/chat': PageChat,
    '/profile': PageProfile,
    '/changeprofile': PageChangeProfile,
    '/password': PagePassword,
    '/': PageLogin
}
const root: Element | null = document.querySelector('#root');
const path: string = window.location.pathname;

if (root){
    if (routes[path]) {
        root.innerHTML = routes[path];
    } else {
        root.innerHTML = PageNotFound;
    }
}