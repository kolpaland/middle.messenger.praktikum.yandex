import PageNotFound from './notfound.hbs';
import PageStub from './../../layout/stub/stub';

import './notfound.scss';

export default PageNotFound({

    body: PageStub({
        rout : "/chat",
        routText : "Назад к чатам",
        title: "404",
        text: "Не туда попали"
    })
});