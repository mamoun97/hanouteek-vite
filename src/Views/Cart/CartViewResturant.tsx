import { FiShoppingCart } from "react-icons/fi"
import { AppDispatch, RootState } from "../../Store";
import { useDispatch, useSelector } from "react-redux";
import { Cart } from "../../Store/cartSlice";
import Currency from "../../Constants/Currency";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import IconButton from "../TailwindComponent/IconButton";
import { IoClose } from "react-icons/io5";
import { openCart } from "../../Store/cartSlice";
import CartItem from "./CartItem";
import Button from "../Flowbit/Button";
import CartEmpty from "../CartEmpty";

export default function CartViewResturant({ onClose }: {
    onClose: any
}) {

    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate()
    const location = useLocation()
    const { t } = useTranslation()
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const getSubTotal=(dt:ProductCart)=>{
        return dt.price*dt.qte+
        (dt.checkData.addon?.reduce((a,b)=>{return a+b.price*b.qte},0)??0)
    }
    const getTotal = () => {
        let s = 0;
        for (let i = 0; i != cart.items.length; i++)
            s += getSubTotal(cart.items[i])
        return s
    }
    return (<>


        {!cart.cartOpen&&location.pathname != "/checkout" && <div className="fixed px-4 text-white cursor-pointer flex justify-center animate-trt  items-center gap-2 bottom-3 left-1/2 z-50 -translate-x-1/2 bg-primary min-h-[50px] max-sm:w-4/5   rounded-lg shadow-black/20 shadow-xl"
            onClick={() => {
                // navigate("/checkout")
                dispatch(openCart(true))
            }}>
            <FiShoppingCart className="text-3xl" />
            <span className="text-xl font-semibold">{t("buy")}</span>
            <span className="text-xl font-semibold line-clamp-1">{getTotal().toFixed(2)} <small className=""> <Currency /> </small> </span>
        </div>}

        {
            cart.cartOpen && <div className="animate-scalet border w-full max-w-2xl fixed left-1/2 bottom-3 
            -translate-x-1/2 z-50 bg-white flex flex-col
            rounded-lg h-full max-h-[500px] p-4
            shadow-black/20 shadow-xl">
                <div className="flex items-center">
                    <h1 className='text-lg font-semibold'>{t("your_cart")}</h1>
                    <div className="grow"></div>
                    <IconButton className=" " onClick={() => {
                        dispatch(openCart(false))
                    }}>
                        <IoClose className="text-2xl" />
                    </IconButton>
                </div>

                <div className="border-b border-gray-200 mt-2"></div>
                {cart.items.length!=0?<>
                    <div className="grow py-2 overflow-auto">
                        <div className="flex flex-col gap-2">
                            {
                                cart.items.map((el, k) => {
                                    return <CartItem data={el} index={k} key={k} onClose={onClose} />
                                })
                            }
                        </div>
                    </div>
                    <div className="border-b border-gray-200 mt-2"></div>
                    <div className="flex items-center font-semibold mt-2 mb-2">
                        <h1 className="text-lg">{t("sub_total")}</h1>
                        <div className="grow"></div>
                        <h1 className="text-lg">{getTotal().toFixed(2)} <Currency/></h1>
                    </div>
                    <Link className="w-full" to={"/checkout"}>
                        <Button
                            onClick={onClose}
                            className={"customPrimary grow text-white mb-1 max-h-11 h-11 animate-vibre uppercase w-full"}>
                            {t("order")}
                        </Button>
                    </Link>
                </>: <CartEmpty/> }
            </div>
        }

    </>
    )
}
