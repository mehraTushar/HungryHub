import { createSlice } from '@reduxjs/toolkit';

const initialState = { info: '', cartItems: [] };

export const ResturantSlice = createSlice({
  name: 'Resturant',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.cartItems.find((item) => item.Id === action.payload.Id);
      if (!item) {
        state.cartItems.push(action.payload);
      } else {
        item.Quantity += 1;
      }
    },
    reset: (state, action) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.Id === action.payload.Id);
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].Quantity === 1) {
          state.cartItems.splice(itemIndex, 1);
        } else {
          state.cartItems[itemIndex].Quantity -= 1;
        }
      }
    },
    addInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { addItem, removeItem, addInfo, reset } = ResturantSlice.actions;

export default ResturantSlice.reducer;
