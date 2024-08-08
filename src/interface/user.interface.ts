import { Login } from './login.interface';
import { Name } from './name.interface';
import { Picture } from './picture.interface';

export interface User {
    name: Name;
    login: Login;
    picture: Picture;
}
