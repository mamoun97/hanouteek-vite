import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadData, saveData } from "./localStorage";


type UserAuthS= UserAuth|null

const initialState:UserAuthS=loadData("user")

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUser: (state:UserAuthS, action: PayloadAction<UserAuthS>) => {
      state=action.payload;
   
      saveData("user",action.payload)
      return state
    },
  },
 
});



export const { changeUser } = authSlice.actions;

export default authSlice.reducer;