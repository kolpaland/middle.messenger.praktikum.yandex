import PageChat from './chat.hbs';
import PageStub from './../../layout/stub/stub.js';

import './chat.scss';

export default PageChat({

    stub: PageStub({
        rout : "/login",
        routText : "Войти",
        title: "Чат",
        text: "Чат еще не готов"
    })
});