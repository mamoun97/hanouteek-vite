
import { Cart } from "../Store/cartSlice";



export const getSubTotal = (cart:Cart): number => {
    let s = 0;
    for (let i = 0; i != cart.items.length; i++)
        s += cart.items[i].price * cart.items[i].qte
    return s
}
