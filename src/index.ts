import PageLoginTemplate, { PageLogin } from './pages/login/login';
import PageSignin from './pages/signin/signin';
import PageError from './pages/error/error';
import PageChatTemplate, { PageChat } from './pages/chat/chat';
import PageNotFound from './pages/notfound/notfound';
import PageProfile from './pages/profile/info/infoprofile';
import PageChangeProfile from './pages/profile/change/changeprofile';
import PagePassword from './pages/profile/password/passwordprofile';

const routes : { [key: string]: string } = {
    '/login': PageLoginTemplate,
    '/signin': PageSignin,
    '/error': PageError,
    '/chat': PageChatTemplate,
    '/profile': PageProfile,
    '/changeprofile': PageChangeProfile,
    '/password': PagePassword,
    '/': PageLoginTemplate,
};
const root: Element | null = document.querySelector('#root');
const path: string = window.location.pathname;

if (root) {
    switch (path) {
    case '/chat':
        root.appendChild(new PageChat().render() as Node);
        break;
    case '/':
    case '/login':
        root.appendChild(new PageLogin().render() as Node);
        break;
    case '/signin':
    case '/error':
    case '/profile':
    case '/changeprofile':
    case '/password':
        root.innerHTML = routes[path];
        break;
    default:
        root.innerHTML = PageNotFound;
    }
}
