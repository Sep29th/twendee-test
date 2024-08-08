import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '../constant/theme.enum';

const initialState: Theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(_state, action: PayloadAction<Theme>) {
            return action.payload;
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
