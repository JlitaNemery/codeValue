import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Product } from "../types/types";
import defaultProducts from "../defaultProducts";

interface ProductsState {
  value: Product[];
}

const getLocalProducts = () => {
  try {
    const localItemsStr = localStorage.getItem("products");
    if (localItemsStr === null || localItemsStr === "undefined") {
      return defaultProducts;
    } else {
      return JSON.parse(localItemsStr);
    }
  } catch (e) {
    return defaultProducts;
  }
};

const initialState: ProductsState = {
  value: getLocalProducts(),
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<number>) => {
      const idx = state.value.findIndex(
        (product) => product.id == action.payload
      );
      if (idx === 0) {
        state.value = state.value.slice(1);
      } else if (idx === state.value.length - 1) {
        state.value = state.value.slice(0, idx);
      } else {
        state.value = [
          ...state.value.slice(0, idx),
          ...state.value.slice(idx + 1),
        ];
      }
    },
    addItem: (
      state,
      action: PayloadAction<Omit<Product, "id" | "creationDate">>
    ) => {
      const ids: number[] = [];
      let rand = 0;
      for (let i = 0; i < state.value.length; i++) {
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
        creationDate: new Date().getTime(),
      });
    },
    editItem: (state, action: PayloadAction<Omit<Product, "creationDate">>) => {
      const prevItem = state.value.find(
        (item) => item.id === action.payload.id
      );
      if (prevItem) {
        prevItem.description = action.payload.description;
        prevItem.name = action.payload.name;
        prevItem.price = action.payload.price;
      }
    },
  },
});

export const { removeItem, addItem, editItem } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.value;

export default productsSlice.reducer;
