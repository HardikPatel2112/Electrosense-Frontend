import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    return {
      products: [], 
    };
  };
  

export const productsSlice=createSlice({
    name: "products",
    initialState: initialState(),
    reducers: {
        SetProductsReducer: (state, action) => {
          state.products = action.payload;
        }
      }

});

export const {SetProductsReducer } = productsSlice.actions;
export const productsReducer = productsSlice.reducer;