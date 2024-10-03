import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadData, saveData } from "./localStorage";


type authtypeTypes="client"|"user"|"supplier"|null
export type GlobalS = {
    platform: string | null,
    authtype:authtypeTypes
} | null

const initialState: GlobalS = {
    platform: null,
    authtype:["client", "user", "supplier"].includes(loadData("authtype")) ? loadData("authtype") : null
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        changePlatform: (state, action: PayloadAction<string>) => {
            state.platform =action.payload;
            return state
        },
        changeAuthType: (state, action: PayloadAction<authtypeTypes>) => {
            state.authtype =action.payload;
            saveData("authtype",action.payload)
            return state
        },
      
    },

});

export const { changePlatform,changeAuthType } = globalSlice.actions;
export default globalSlice.reducer;