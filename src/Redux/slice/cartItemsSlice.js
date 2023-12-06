import { createSlice } from '@reduxjs/toolkit';

const initialState = () => {
  return {
    cartItems: [], 
  };
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState:  initialState(),
  reducers: {
    SetCartItemsReducer: (state, action) => {
      state.cartItems = action.payload;
    },
    AddItemToCartReducer: (state, action) => {
      state.cartItems = state.cartItems.concat(action.payload);
    },
    RemoveItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(x=>x.productId != action.payload.productId);
    },
    ClearCart: (state,action) => {
      state.cartItems = [];
    },
  }
});

export const { SetCartItemsReducer, ClearCart,AddItemToCartReducer,RemoveItemFromCart } = cartItemsSlice.actions;
export const cartItemsReducer = cartItemsSlice.reducer;

