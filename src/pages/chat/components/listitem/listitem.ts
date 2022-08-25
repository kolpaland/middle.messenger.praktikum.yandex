import ListItem from './listitem.hbs';
import * as ellipce from '../../../../../static/images/profile/Ellipse.png';

import './listitem.scss';

type ListItemType = {
    name: string,
    text: string,
    time: string
};

export { ListItemType };

export default (data: ListItemType) => {
    return ListItem({
        ellipce,
        data,
    });
};
