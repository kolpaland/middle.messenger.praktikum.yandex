import PageStub from './stub.hbs';

import './stub.scss';

export default (data : {
    title: string;
    text: string;
    rout: string;
    routText: string;
}):string => {
    return PageStub(data);
};
