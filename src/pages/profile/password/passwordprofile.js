import PagePasswordProfile from './passwordprofile.hbs';
import LayoutProfile from './../../../layout/profile/layoutprofile.js';
import Button from './../../../components/button/button.js';

import './passwordprofile.scss';

const data = {
    oldPassword: "0000",
    newPassword: "0000",
    reenterPassword: "0000"
}

export default PagePasswordProfile({
    layoutProfile : LayoutProfile(data, true),
    button: Button("Сохранить")
});