import { MdDeleteOutline } from "react-icons/md";

import ApiConfig from "../../../Api/ApiConfig";
import Qte from "../../../Views/Qte";



export default function CartItem2({ data, index, cart,
    setCart }: {
        data: OrderFullItem, index: number, cart: OrderFullItem[],
        setCart: any

    }) {


    return (
        <div className="flex gap-2 relative my-1">

            <div className={`bg-cover cursor-pointer bg-no-repeat bg-center w-14 h-14 min-w-[56px] rounded-md mt-2 sticky 
            top-[60px]`}
                style={{ backgroundImage: "url('" + ApiConfig.rootUrl + "/" + data.product?.images[0] + "')" }} >
                <div className="w-5 h-5 text-[12px] font-medium rounded-full bg-primary text-white absolute bottom-[2px] right-[2px] flex items-center justify-center">
                    {data.qte}
                </div>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex w-full ">

                    <h1 className="text-sm font-semibold text-gray-600 dark:text-zinc-200 line-clamp-2">{data.name}</h1>
                    <div className="grow ms-[4px]"></div>
                    <h1 className="font-semibold whitespace-nowrap text-sm">
                        {data.price_total.toFixed(2)} DZD
                    </h1>
                </div>
                <div className="text-[12px] text-gray-600 dark:text-zinc-200">
                    <div className="flex gap-2">
                        <span>unit_price :</span>
                        <span className="font-semibold">{data.price_item.toFixed(2)} DZD</span>
                    </div>
                    {data.color ? <div className="flex gap-2">
                        <span>Colour:</span>
                        <span className="font-semibold">{data.color}</span>
                    </div> : ""}
                    {data.size ? <div className="flex gap-2">
                        <span>Pointure :</span>
                        <span className="font-semibold">{data.size}</span>
                    </div> : ""}
                </div>
                <div className="flex items-center mt-2">
                    <Qte
                        addClick={() => {
                            setCart(
                                cart.map((el, k) => {
                                    return {
                                        ...el,
                                        qte: k == index ? el.qte + 1 : el.qte,
                                        price_total: k == index ? (el.qte + 1) * el.price_item : el.price_total
                                    }
                                })
                            )
                        }}
                        removeClick={() => {
                            if (data.qte > 1) {
                                setCart(
                                    cart.map((el, k) => {
                                        return {
                                            ...el,
                                            qte: k == index ? el.qte - 1 : el.qte,
                                            price_total: k == index ? (el.qte - 1) * el.price_item : el.price_total
                                        }
                                    })
                                )
                            }
                        }}
                        value={data.qte}
                    />
                    <div className="grow"></div>
                    <button
                        type="button"
                        onClick={() => {
                            setCart(
                                cart.filter((_, k) => k != index)
                            )
                        }}
                        className="bg-red-50 text-red-600  w-7 h-7 text-center hover:bg-red-600 hover:text-white  flex justify-center cursor-pointer items-center rounded-md disabled:!bg-gray-100 disabled:!text-gray-500">
                        <MdDeleteOutline />
                    </button>
                </div>
            </div>
        </div>
    )
}
