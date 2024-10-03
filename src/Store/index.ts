import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice";
import cartSlice from "./cartSlice";
import orderSlice from "./orderSlice";
import authSlice from "./authSlice";
import authSliceSupplier from "./authSliceSupplier";
import globalSlice from "./globalSlice";
import authSliceClient from "./authSliceClient";


export const store = configureStore({
  reducer: {
    theme: themeSlice,
    cart:cartSlice,
    order:orderSlice,
    user:authSlice,
    // client:authSliceClient,
    global:globalSlice,
    // supplier:authSliceSupplier
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
