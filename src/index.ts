import PageLoginTemplate, { PageLogin } from './pages/login/login';
import PageSigninTemplate, { PageSignin } from './pages/signin/signin';
import PageError from './pages/error/error';
import PageChatTemplate, { PageChat } from './pages/chat/chat';
import PageNotFound from './pages/notfound/notfound';
import PageProfile from './pages/profile/info/infoprofile';
import PageChangeProfileTemplate, { PageChangeProfile } from './pages/profile/change/changeprofile';
import PagePassword from './pages/profile/password/passwordprofile';

const routes : { [key: string]: string } = {
    '/login': PageLoginTemplate,
    '/signin': PageSigninTemplate,
    '/error': PageError,
    '/chat': PageChatTemplate,
    '/profile': PageProfile,
    '/changeprofile': PageChangeProfileTemplate,
    '/password': PagePassword,
    '/': PageLoginTemplate,
};
const root: Element | null = document.querySelector('#root');
const path: string = window.location.pathname;

if (root) {
    switch (path) {
    case '/':
    case '/login':
        root.appendChild(new PageLogin().render() as Node);
        break;
    case '/signin':
        root.appendChild(new PageSignin().render() as Node);
        break;
    case '/changeprofile':
        root.appendChild(new PageChangeProfile().render() as Node);
        break;
    case '/chat':
        root.appendChild(new PageChat().render() as Node);
        break;
    case '/error':
    case '/profile':
    case '/password':
        root.innerHTML = routes[path];
        break;
    default:
        root.innerHTML = PageNotFound;
    }
}
