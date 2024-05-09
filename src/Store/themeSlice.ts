import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ThemeSetting } from "../Types/ThemeSetting";
import { loadData, saveData } from "./localStorage";


type Theme= ThemeSetting|null

const initialState:Theme=loadData("theme")

const cartSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state:Theme, action: PayloadAction<Theme>) => {
      state=action.payload;
   
      saveData("theme",action.payload)
      return state
    },
  },
 
});



export const { changeTheme } = cartSlice.actions;

export default cartSlice.reducer;