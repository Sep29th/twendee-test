import { useAppSelector } from './hook/redux.hook';

import Switch from './component/switch/switch';
import { Theme } from './constant/theme.enum';
import { useAppDispatch } from './hook/redux.hook';
import { setTheme } from './store/theme.store';
import { Outlet } from 'react-router-dom';

const App = () => {
    const theme = useAppSelector((state) => state.theme);
    const dispatch = useAppDispatch();

    const handleThemeChange = (isChecked: boolean) => {
        dispatch(setTheme(isChecked ? Theme.DARK : Theme.LIGHT));
    };

    return (
        <div className={`h-screen flex items-center justify-center ${theme == Theme.LIGHT ? 'bg-gray-200' : 'bg-gray-900'}`}>
            <div className={`container rounded-lg min-h-[600px] p-4 shadow-lg ${theme == Theme.LIGHT ? 'bg-white' : 'bg-gray-700'}`}>
                <div className="flex items-center justify-between">
                    <h2 className={`font-bold text-2xl ${theme == Theme.DARK && 'text-gray-200'}`}>Twendee Test</h2>
                    <div className="flex items-center gap-1">
                        <span className={`text-lg ${theme == Theme.DARK && 'text-gray-200'}`}>Dark mode:</span>
                        <Switch onChange={handleThemeChange} defaultChecked={theme == Theme.DARK} />
                    </div>
                </div>
                <hr className="py-2" />
                <Outlet />
            </div>
        </div>
    );
};

export default App;
