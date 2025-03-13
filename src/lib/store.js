import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/lib/cartSlice"

export const store = configureStore({
    reducer:{
        cart:cartReducer
    }
})