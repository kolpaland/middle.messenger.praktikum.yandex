import Message from './message.hbs';


import './message.scss';

type MessageType = {
    text: string,
    date: string,
    time: string
};

export {MessageType};


export default (data: MessageType) => {
    return Message({
        data
    });
}
