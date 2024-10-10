import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface addState {
    value: Boolean
};

const initialState: addState = { value: false };

export const addSlice = createSlice({
    name: 'add',
    initialState,
    reducers: {
        setIsAdd: (state) => {
            state.value = !state.value;
        }
    },
});

export const { setIsAdd } = addSlice.actions;
export const selectIsAdd = (state: RootState) => state.add.value;

export default addSlice.reducer;