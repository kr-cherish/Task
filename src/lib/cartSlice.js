import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = action.payload;
      const existingItem = state.cartItems.find(item => item._id === productToAdd._id);
      if (!existingItem) {
        state.cartItems.push({ ...productToAdd, quantity: 1 });
      }
      else {
        existingItem.quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const existingItem = state.cartItems.find(item => item._id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1; 
        } else {
          state.cartItems = state.cartItems.filter(item => item._id !== productId);
        }
      }
    },
  },
});
export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
