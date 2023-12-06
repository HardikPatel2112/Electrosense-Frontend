import {configureStore} from '@reduxjs/toolkit'
import { cartItemsReducer } from './slice/cartItemsSlice'
import { productsReducer } from './slice/productsSlice';




export const store=configureStore({
    reducer:{
        //setup reducer
        cartItemsStore:cartItemsReducer,
        productsStore: productsReducer
    }
});

console.log(store.getState());