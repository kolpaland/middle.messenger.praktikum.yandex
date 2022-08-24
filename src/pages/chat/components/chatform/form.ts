import ChatFormTemplate from './form.hbs';
import ButtonTemplate, { Button } from '../../../../components/button/button';

import Block from '../../../../utils/block';

import './form.scss';
import InputTemplate, { Input } from '../../../../components/input/input';

type ChatFormTemplateDataType = {
    input: typeof InputTemplate,
    button: typeof ButtonTemplate,
};

type ChatFormDataType = {
    input: Input,
    button: Button,
    events?: Record<string, Function>
};

export default (data: ChatFormTemplateDataType) => {
    return ChatFormTemplate(data);
};

export class ChatForm extends Block {
    constructor(props: ChatFormDataType) {
        super('form', props);
    }

    render() {
        return this.compile(ChatFormTemplate);
    }
}
