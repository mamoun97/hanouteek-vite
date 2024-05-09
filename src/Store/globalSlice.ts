import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type GlobalS = {
    platform: string | null
} | null

const initialState: GlobalS = {
    platform: null
}

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        changePlatform: (state, action: PayloadAction<string>) => {
            state.platform =action.payload;
            return state
        },
      
    },

});

export const { changePlatform } = globalSlice.actions;
export default globalSlice.reducer;