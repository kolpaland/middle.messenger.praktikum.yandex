import PageError from './error.hbs';
import PageStub from './../../layout/stub/stub.js';

import './error.scss';

export default PageError({

    body: PageStub({
        rout : "/chat",
        routText : "Назад к чатам",
        title: "500",
        text: "Мы уже фиксим"
    })
});