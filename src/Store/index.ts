import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import authSlice from "./authSlice";
import globalSlice from "./globalSlice";


export const store = configureStore({
  reducer: {
    theme: themeSlice,
    cart:cartSlice,
    order:orderSlice,
    user:authSlice,
    global:globalSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
