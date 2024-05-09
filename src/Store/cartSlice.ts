import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { loadData, saveData } from "./localStorage";
import { addToWishlistEvent } from "../Api/PixelService";

type ProductCartUpdate = {
  item: ProductCart,
  index: number
}
export interface Cart {
  items: Array<ProductCart>;
  faverites: Array<Product>,
  cartOpen: boolean
}

const initialState: Cart = 
// loadData("cart") 
// ? {
//   ...loadData("cart"),
//   cartOpen: false,
// } :
 {
  items: [],
  faverites: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action: PayloadAction<ProductCart>) => {
      let s = state.items.findIndex(
        el => el.id == action.payload.id &&
          el.checkData.color?.id == action.payload.checkData.color?.id &&
          el.checkData.size?.id == action.payload.checkData.size?.id
          
      )
      if (s != -1&&!(action.payload.checkData.addon?.length)) {
        state.items = state.items.map((el, k) => {
          return s == k ? {
            ...action.payload,
            qte: state.items[s].qte + action.payload.qte
          } : el
        });
      } else
        state.items = [...state.items, action.payload];
      // saveData("cart", state);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((el, index) => el && action.payload != index);
      // saveData("cart", state);
    },
    updateCart: (state, action: PayloadAction<ProductCartUpdate>) => {
      state.items = state.items.map((el, k) => {
        return action.payload.index == k ? action.payload.item : el
      });
      // saveData("cart", state);
    },
    videCart: (state) => {
      state.items = []
      // saveData("cart", state);
    },

    openCart: (state, action: PayloadAction<boolean>) => {
      state.cartOpen = action.payload;
    },

    addToFavorite: (state, action: PayloadAction<Product>) => {
      addToWishlistEvent(action.payload.id, action.payload.price)
      state.faverites = [...state.faverites, action.payload];
      // saveData("cart", state);
      // saveData("favorites",state);
    },
    removeFromFavorite: (state, action: PayloadAction<number>) => {
      state.faverites = state.faverites.filter(el => el.id != action.payload);
      // saveData("favorites", state)
    },
  },

});



export const {
  addToCart,
  openCart,
  removeFromCart,
  updateCart,
  videCart,
  addToFavorite,
  removeFromFavorite
} = cartSlice.actions;
export const selectCart = (state: { cart: Cart }) => state.cart;
export default cartSlice.reducer;