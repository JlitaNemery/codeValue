import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productsSlice';
import editReducer from './editSlice';
import addReducer from './addSlice';

export const store = configureStore({
    reducer: {
        products: productReducer,
        edit: editReducer,
        add: addReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;