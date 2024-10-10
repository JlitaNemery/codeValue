import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import { Product } from '../types/types';

interface ProductsState {
    value: Product[]
};

const initialState: ProductsState = {
    value: [
        {
            id: 3,
            name: 'z',
            description: 'z',
            price: 40,
            creationDate: 1
        },
        {
            id: 4,
            name: 'a',
            description: 'd',
            price: 40,
            creationDate: new Date().getTime()
        }
    ]
};

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        sortByName: (state) => {
            state.value.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        },
        sortByDate: (state) => { 
            state.value.sort((a, b) => a.creationDate - b.creationDate);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const idx = action.payload;
            if (idx === 0) {
                state.value = state.value.slice(1);
            } else if (idx === (state.value.length - 1)) {
                state.value = state.value.slice(0, 1);
            } else {
                state.value = [...state.value.slice(0, idx), ...state.value.slice(idx + 1)];
            }
        },
        addItem: (state, action: PayloadAction<Omit<Product, 'id' | 'creationDate'>>) => {
            const ids: number[] = [];
            let rand = 0;
            for (let i = 0; i < state.value.length; i++){
                ids.push(state.value[i].id);
            }
            while (true) {
                rand = Math.floor(Math.random() * 501);
                if (!ids.includes(rand)) {
                    break;
                }
            }
            state.value.push({
                id: rand,
                name: action.payload.name,
                description: action.payload.description,
                price: action.payload.price,
                creationDate: new Date().getTime()
            });
        },
        editItem: (state, action: PayloadAction<Omit <Product, 'creationDate'>>) => {
            const prevItem = state.value.find((item) => item.id === action.payload.id);
            if (prevItem) {
                prevItem.description = action.payload.description;
                prevItem.name = action.payload.name;
                prevItem.price = action.payload.price;
            }
            
        }
    },
})

export const { sortByName, sortByDate, removeItem, addItem, editItem } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.value;

export default productsSlice.reducer;