
import {sum} from './modules/sum';
import tpl from './index.hbs';

document.body.innerHTML = tpl({id: "root"});

const root = document.querySelector('#root');
root.textContent = sum(6, -1).toString(); 