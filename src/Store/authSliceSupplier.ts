import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadData, saveData } from "./localStorage";


type SupplierAuthS= SupplierAuth|null

const initialState:SupplierAuthS=loadData("supplier")

const authSliceSupplier = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    changeSupplier: (state:SupplierAuthS, action: PayloadAction<SupplierAuthS>) => {
      state=action.payload;
   
      saveData("supplier",action.payload)
      return state
    },
  },
 
});



export const { changeSupplier } = authSliceSupplier.actions;

export default authSliceSupplier.reducer;