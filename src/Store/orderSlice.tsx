import { 
    // PayloadAction,
     createSlice } from "@reduxjs/toolkit";
// import { loadData, saveData } from "./localStorage";

export interface OrderStore {
    orderData: OrderForm,
    wilaya:Wilaya|null,
    commune:Commune|null
}


const initialState: OrderStore =
// loadData("order")?? 
{
    orderData: {
        to_commune_name: "",
        to_wilaya_name: "",
        fullName: "",
        contact_phone: "",
        is_stopdesk: false,
        stopdesk_id: 0,
        nots: "",
    },
    wilaya:null,
    commune:null
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        // chengeOrder: (state, action: PayloadAction<OrderStore>) => {
            
        //     state = action.payload;
        //     saveData("order",state)
        // },

    },

});



export const {
    // chengeOrder
} = orderSlice.actions;
export default orderSlice.reducer;