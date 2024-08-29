import { useState } from "react"
import Attribute from "../../../Views/Attribute"
import Qte from "../../../Views/Qte"
import { Button } from "rizzui"
import useLang from "../../../hoock/useLang"
// import ApiConfig from "../../../Api/ApiConfig"

const NULL_STOCK = -9999999
export function ProductOptions({ data, setValue }:
    { data: ProductCart, setValue: (e: OrderFullItem) => void }) {
    const {tr}=useLang()
    const t=tr.order
    const [prod, setProd] = useState<ProductCart>(data)
    const [stock, setStock] = useState<number>(NULL_STOCK)
    const initSizes = prod.attribute.options.length ? (prod.attribute.options[0].sizes.length ? true : false) : false;
    const addToCart = () => {

        if (isValid())
            setValue({
                "index": Date(),
                "name": prod.name,
                "price_item": prod.price,
                "price_total": prod.price * prod.qte,
                "color": prod.checkData.color?.value ?? "",
                "size": prod.checkData.size?.value ?? "",
                "qte": prod.qte,
                min_selling_drop_price: prod.min_selling_drop_price,
                "cancelled": false,
                "product": {
                    id: prod.id,
                    images: prod.images
                }
            })
        else alert(t.select_ops)


    }

    const isValid = (): boolean => {
        if (prod.attribute.options.length == 0) return true;
        if (prod.checkData.color) {
            if (prod.checkData.color.sizes.length != 0)
                return prod.checkData.size != null
            else
                return true
        }
        return false
    }

    return <div className="p-4 border border-gray-100 dark:border-[#444] dark:bg-[#222] mt-3  rounded-lg  ">

        <div className="flex gap-2 flex-col">




            <div>
                {prod.attribute.options.length ? <div className="mt-3">
                    <h2 className="font-medium italic">{t.color}</h2>
                    <Attribute
                        product={prod}
                        setProduct={setProd}
                        onClick={(el: Color) => {
                            setProd({
                                ...prod,
                                checkData: {
                                    size: null,
                                    color: el
                                },
                                price: el.price ? el.price : data.price
                            })
                            setStock(el.sizes.length != 0 ? NULL_STOCK : el.stock)


                        }}
                        ActiveId={prod.checkData.color?.id}
                        data={prod.attribute.options}
                    />
                </div> : ""}
                {
                    initSizes ? <div className="mt-2">
                        <h2 className="font-medium italic">{t.size}</h2>
                        <Attribute
                            product={prod}
                            setProduct={setProd}
                            onClick={(el: Size) => {
                                setProd({
                                    ...prod,
                                    checkData: {
                                        ...prod.checkData,
                                        size: el
                                    },
                                    price: el.price ? el.price : data.price
                                })
                                if (prod.checkData.color)
                                    setStock(el.stock)

                            }}
                            ActiveId={prod.checkData.size?.id}
                            data={prod.checkData.color ? prod.checkData.color.sizes : prod.attribute.options[0].sizes}
                        />
                    </div> : ""
                }
                {
                    stock != NULL_STOCK && stock > 0 ? <div className="flex justify-center bg-green-100 p-3 my-2 dark:text-black">
                        {stock <= 0 ? <>
                            <span className='text-red-800'>{t.non_dispo}</span>
                        </> : <>
                            {t.qte_in_stock} <div className="me-2"></div> <strong >{stock}</strong>
                        </>}
                    </div> : ""
                }

                <div className="mt-2">
                    <h2 className="font-medium italic">{t.qte}</h2>
                    <div className="flex mt-2 gap-2">
                        <Qte
                            addClick={() => {
                                setProd({
                                    ...prod,
                                    qte: prod.qte + 1
                                })
                            }}
                            removeClick={() => {
                                setProd({
                                    ...prod,
                                    qte: prod.qte - 1
                                })
                            }}
                            value={prod.qte}
                            large={true} />

                        <Button
                            onClick={() => addToCart()}
                            className={"text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"}>
                            {t.add_prod}
                        </Button>


                    </div>
                </div>
            </div>
        </div>

    </div>


}