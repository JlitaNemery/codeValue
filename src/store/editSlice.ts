import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Product } from "../types/types";
import { defaultProduct } from "../defaultProducts";

interface editState {
  value: Product | Omit<Product, "creationDate"> | null;
}

const initialState: editState = { value: null };

export const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    setNewItem: (state) => {
      state.value = defaultProduct;
    },
    setItem: (state, action: PayloadAction<Product>) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state.value = null;
    },
  },
});

export const { setItem, clear, setNewItem } = editSlice.actions;
export const selectEdit = (state: RootState) => state.edit.value;

export default editSlice.reducer;
