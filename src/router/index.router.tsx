import { RouteObject } from 'react-router-dom';
import App from '../App';
import ManagerUserPage from '../page/manager-user.page';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <ManagerUserPage />
            }
        ]
    }
];
