import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../../router/index.router';

const BrowserRouterAppProvider = () => {
    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
};

export default BrowserRouterAppProvider;
