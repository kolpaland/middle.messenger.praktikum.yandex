import PageChatTemplate from './chat.hbs';
import ListItem, { ListItemType } from './components/listitem/listitem';
import Message, { MessageType } from './components/message/message';
import * as ellipce from '../../../static/images/profile/Ellipse.png';
import ButtonTemplate, { Button } from '../../components/button/button';
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
    button: ButtonTemplate('Отправить'),
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
            button: new Button({
                text: 'Отправить',
                events: {
                    click: PageChat.onSubmit,
                },
            }),
            input: new Input({
                id: 'message',
                name: 'message',
                placeholder: 'Сообщение',
                type: 'text',
                events: {
                    blur: PageChat.onBlurInput,
                    focus: PageChat.onFocusInput,
                    invalid: PageChat.onInvalidInput,
                },
            }),
        };
        super('article', props);
    }

    static onInvalidInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        if (target.value === '') {
            target.setCustomValidity('Enter messsage to send');
        }
    }

    static onBlurInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity('');
        target.checkValidity();
    }

    static onFocusInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        target.setCustomValidity('');
        target.reportValidity();
    }

    static onSubmit(event: MouseEvent) {
        const { target } = event;
        const { parentElement } = target as HTMLInputElement;
        const message = parentElement?.children?.namedItem('message') as HTMLInputElement;
        if (message && message.reportValidity()) {
            // согласно ТЗ выводим данные из форм в консоль
            console.log(`Сообщение: ${message.value}`);
            message.value = '';
            event.preventDefault();
        }
    }

    render(): DocumentFragment | null {
        return this.compile(PageChatTemplate, this.props);
    }
}
