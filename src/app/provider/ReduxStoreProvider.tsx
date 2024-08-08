import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { randomUserApi } from '../../api/random-user.api';
import { Provider } from 'react-redux';
import themeStore from '../../store/theme.store';

type PropTypes = {
    children: React.ReactNode;
};

const store = configureStore({
    reducer: combineReducers({
        theme: themeStore,
        [randomUserApi.reducerPath]: randomUserApi.reducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(randomUserApi.middleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const ReduxStoreProvider = (props: PropTypes) => {
    return <Provider store={store} children={props.children} />;
};

export default ReduxStoreProvider;
