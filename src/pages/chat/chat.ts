import PageChatTemplate from './chat.hbs';
import ListItem, { ListItemType } from './components/listitem/listitem';
import Message, { MessageType } from './components/message/message';
import * as ellipce from '../../../static/images/profile/Ellipse.png';
import Button from '../../components/button/button';
import InputTemplate, { Input } from '../../components/input/input';
import Block from '../../utils/block';

import './chat.scss';

function getList(): Array<typeof ListItem> {
    const data: Array<ListItemType> = [
        {
            name: 'Андрей',
            text: 'Привет, привет!',
            time: '12:34',
        },
        {
            name: 'Анна',
            text: 'Привет, привет!',
            time: '12:10',
        },
        {
            name: 'Кристина',
            text: 'Привет, привет!',
            time: '16:19',
        },
    ];
    const list: Array<typeof ListItem> = [];

    for (let i = 0; i < data.length; i++) {
        list.push(ListItem(data[i]));
    }

    return list;
}

function getMessages(): Array<typeof Message> {
    const data: Array<MessageType> = [
        {
            text: 'Привет, привет!',
            date: '12.08.22',
            time: '12:34',
        },
        {
            text: 'Привет, привет!',
            date: '12.08.22',
            time: '12:10',
        },
    ];
    const list: Array<typeof Message> = [];

    for (let i = 0; i < data.length; i++) {
        list.push(Message(data[i]));
    }

    return list;
}

export default PageChatTemplate({
    list: getList(),
    messages: getMessages(),
    ellipce,
    button: Button('Отправить'),
    input: InputTemplate({
        id: 'message',
        name: 'message',
        placeholder: 'Сообщение',
        type: 'text',
    }),
});
export class PageChat extends Block {
    constructor() {
        const props = {
            list: getList(),
            messages: getMessages(),
            ellipce,
            button: Button('Отправить'),
            input: new Input({
                id: 'message',
                name: 'message',
                placeholder: 'Сообщение',
                type: 'text',
            }),
        };
        super('article', props);

        const events = {
            blur: this.onBlurInput.bind(this),
            focus: this.onFocusInput.bind(this),
        };

        this.children.input.registerEvents(events);
    }

    onBlurInput(event: InputEvent) {
        console.log('Blur in chat');
        const target = event.target as HTMLInputElement;
        if (target.value.length === 0) {
            console.log('Поле сообщения не должно быть пустым!');
        }
    }

    onFocusInput(event: InputEvent) {
        console.log('Focus in chat');
        const target = event.target as HTMLInputElement;
        if (target.value.length === 0) {
            console.log('Поле сообщения не должно быть пустым!');
        }
    }

    render(): DocumentFragment | null {
        return this.compile(PageChatTemplate, this.props);
    }
}
