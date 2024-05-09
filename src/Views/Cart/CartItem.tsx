import { MdDeleteOutline } from "react-icons/md";
import ApiConfig from "../../Api/ApiConfig";
import Qte from "../Qte";
import { AppDispatch } from "../../Store";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart } from "../../Store/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Currency from "../../Constants/Currency";

export default function CartItem({ data, index, onClose = () => { }, isCheckout = false, editable = true }: {

    data: ProductCart, index: number, isCheckout?: boolean, editable?: boolean, onClose?: any
}) {
    const dispatch: AppDispatch = useDispatch();
    const param = useParams()
    // const navigate = useNavigate()
    const { t } = useTranslation()
    const getTotal=()=>{
        return data.price*data.qte+
        (data.checkData.addon?.reduce((a,b)=>{return a+b.price*b.qte},0)??0)
    }
    return (
        <div className="flex gap-2 relative my-1">

            <div className={`bg-cover cursor-pointer bg-no-repeat bg-center w-14 h-14 min-w-[56px] rounded-md mt-2 sticky 
            ${isCheckout ? "top-[60px]" : "top-1"}`}
                style={{ backgroundImage: "url('" + ApiConfig.rootUrl + "/" + data.images[0] + "')" }} onClick={() => {
                    // navigate("/product/" + data.slugName + "/" + index)
                    // onClose()
                }}>
                {(isCheckout && !editable) && <div className="w-5 h-5 text-[12px] font-medium rounded-full bg-primary text-white absolute bottom-[2px] right-[2px] flex items-center justify-center">
                    {data.qte}
                </div>}
            </div>
            <div className="flex flex-col w-full">
                <div className="flex w-full ">

                    <h1 className="text-sm font-semibold text-gray-600 line-clamp-2">{data.name}</h1>
                    <div className="grow ms-[4px]"></div>
                    <h1 className="font-semibold whitespace-nowrap text-sm">
                        {(getTotal() ).toFixed(2)} <Currency />
                    </h1>
                </div>
                <div className="text-[13px] text-gray-600">
                    <div className="flex gap-2">
                        <span>{t("unit_price")} :</span>
                        <span className="font-semibold">{data.price.toFixed(2)} <Currency /></span>
                    </div>
                    {data.checkData.color ? <div className="flex gap-2">
                        <span>{data.attribute.name} :</span>
                        <span className="font-semibold">{data.checkData.color.value}</span>
                    </div> : ""}
                    {data.checkData.size ? <div className="flex gap-2">
                        <span>{!!data.attribute.optionsName ? data.attribute.optionsName : "Pointure"} :</span>
                        <span className="font-semibold">{data.checkData.size.value}</span>
                    </div> : ""}
                    {
                        data.checkData.addon ? <>
                            {
                                data.checkData.addon?.map((el, k) => {
                                    return <div className="flex gap-2 items-center" key={k}>
                                        <span className="underline"># {el.value}  </span>
                                        {!!el.price && <>
                                            <span>x  </span>
                                            <span>{el.qte} </span>
                                            <div className="border-b border-dashed grow"></div>
                                            <span className="font-semibold">{el.price*el.qte} <Currency /></span>
                                        </>}

                                    </div>
                                })
                            }
                        </> : ""
                    }

                </div>
                {editable && <div className="flex items-center mt-2">
                    <Qte
                        addClick={() => {
                            dispatch(updateCart({
                                item: {
                                    ...data,
                                    qte: data.qte + 1,
                                    price: (data.hasOffer && data.minNumberQteOffer && data.priceOffer && (data.qte + 1) >= data.minNumberQteOffer) ? data.priceOffer : (data.originalPrice ?? data.price)
                                },
                                index
                            }))
                        }}
                        removeClick={() => {
                            if (data.qte > 1)
                                dispatch(updateCart({
                                    item: {
                                        ...data,
                                        qte: data.qte - 1,
                                        price: (data.hasOffer && data.minNumberQteOffer && data.priceOffer && (data.qte - 1) >= data.minNumberQteOffer) ? data.priceOffer : (data.originalPrice ?? data.price)
                                    },
                                    index
                                }))
                        }}
                        value={data.qte}
                    />
                    <div className="grow"></div>
                    {!!!param.index && <button
                        type="button"
                        onClick={() => {
                            dispatch(removeFromCart(index))
                        }}
                        className="bg-red-50 text-red-600  w-7 h-7 text-center hover:bg-red-600 hover:text-white  flex justify-center cursor-pointer items-center rounded-md disabled:!bg-gray-100 disabled:!text-gray-500">
                        <MdDeleteOutline />
                    </button>}
                </div>}
            </div>
        </div>
    )
}
