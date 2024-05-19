import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../Features/Cart/CartSlice";

export const store = configureStore({
  reducer: {
    cart: CartSlice,
  },
});
