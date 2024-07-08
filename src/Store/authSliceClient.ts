import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadData, saveData } from "./localStorage";


type ClientAuthS= UserAuth|null

const initialState:ClientAuthS=loadData("client")

const authSliceClient = createSlice({
  name: "client",
  initialState,
  reducers: {
    changeClient: (state:ClientAuthS, action: PayloadAction<ClientAuthS>) => {
      state=action.payload;
   
      saveData("client",action.payload)
      return state
    },
  },
 
});



export const { changeClient } = authSliceClient.actions;

export default authSliceClient.reducer;