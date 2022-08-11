import PageChat from './chat.hbs';
import ListItem, {ListItemType} from './components/listitem/listitem'
import Message, {MessageType} from './components/message/message'
import * as ellipce from './../../../static/images/profile/Ellipse.png'

import './chat.scss';

function getList(): Array<typeof ListItem> {
    let data: Array<ListItemType> = [
        {
            name: "Андрей",
            text: "Привет, привет!",
            time: "12:34"
        },
        {
            name: "Анна",
            text: "Привет, привет!",
            time: "12:10"
        },
        {
            name: "Кристина",
            text: "Привет, привет!",
            time: "16:19"
        }
    ];
    let list: Array<typeof ListItem> = [];

    for (let i = 0; i < data.length; i++) {
        list.push(ListItem(data[i]));
    }

    return list;
}

function getMessages(): Array<typeof Message> {
    let data: Array<MessageType> = [
        {
            text: "Привет, привет!",
            date: "12.08.22",
            time: "12:34"
        },
        {
            text: "Привет, привет!",
            date: "12.08.22",
            time: "12:10"
        },
        {
            text: "Привет, привет!",
            date: "12.08.22",
            time: "16:19"
        }
    ];
    let list: Array<typeof Message> = [];

    for (let i = 0; i < data.length; i++) {
        list.push(Message(data[i]));
    }

    return list;
}

export default PageChat({
        list : getList(),
        messages: getMessages(),
        ellipce
    });