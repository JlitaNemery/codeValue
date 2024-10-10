import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Product } from '../types/types';

interface editState {
    value: Product | null
};

const initialState: editState = { value: null };

export const editSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setItem: (state, action: PayloadAction<Product>) => {
            const item = action.payload;
            state.value = {
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                creationDate: item.creationDate
            };
        },
        clearById: (state, action: PayloadAction<number>) => {
            if (state.value && state.value.id === action.payload) {
                state.value = null;
            }
        }
    },
});

export const { setItem, clearById } = editSlice.actions;
export const selectEdit = (state: RootState) => state.edit.value;

export default editSlice.reducer;