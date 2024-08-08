import ReactDOM from 'react-dom/client';
import ReduxStoreProvider from './app/provider/ReduxStoreProvider.tsx';
import BrowserRouterAppProvider from './app/provider/BrowserRouterAppProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReduxStoreProvider>
        <BrowserRouterAppProvider />
    </ReduxStoreProvider>
);
