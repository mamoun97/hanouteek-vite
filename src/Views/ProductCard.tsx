import { useDispatch, useSelector } from "react-redux"
import ApiConfig from "../Api/ApiConfig"
import { ThemeSetting } from "../Types/ThemeSetting"
import Button from "./Flowbit/Button"
import { Link } from "react-router-dom"
import LazyLoad from "./LazyLoad"
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import IconButton from "./TailwindComponent/IconButton"
import { AppDispatch, RootState } from "../Store"
import { Cart, addToFavorite, removeFromFavorite } from "../Store/cartSlice"
import { useState } from "react"
import ProductModal from "./ProductModal"
import { FiShoppingCart } from "react-icons/fi"
import { useTranslation } from "react-i18next"
import Currency from "../Constants/Currency"
import ProductView from "./Resturant/ProductView"
import imgSrc from "../utils/imgSrc"

// import ProductView from "./Resturant/ProductView"

// import tw from 'twin.macro'
// import { css } from "styled-components"
type ProductsProps = {
    data: Product,
    className?: string,
    imageClassName?: string,
    showFull?: boolean,
    hidePrice?: boolean,
    isPrivate?:boolean
}
const ProductCard = (props: ProductsProps) => {
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    if (theme.theme.templateType == "restaurant")
        return <ProductView {...props} />
    return <ProductHanouteek {...props} />
}

function ProductHanouteek({ data, showFull = false, className = "",
    isPrivate=false,
    imageClassName="",
    //  ,hidePrice=false
}: ProductsProps) {
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const client = useSelector<RootState>((state) => state.client) as UserAuth
    const hidePrice = ApiConfig.isJoomla ? (client?.id ? false : true) : false
    const dispatch: AppDispatch = useDispatch();
    const [openModal, setOpenModal] = useState(false)
    const { t } = useTranslation()
    const promo = !!data.CompareAtPrice?Math.ceil(100 - data.price * 100 / data.CompareAtPrice):0
    return <>
        <div className={"bg-white group cursor-pointer relative cardProd " + className}>

            <div className={`relative  pt-[100%]  overflow-hidden group `}>
                <Link to={"/product/" + data.slugName}>

                    <div className={"absolute top-0 left-0 right-0 bottom-0 border group/img overflow-hidden "+imageClassName}>
                        <LazyLoad className={
                            "w-full h-auto max-h-full object-fill " + (data.images.length >= 2 ? "group-hover/img:hidden" : "")
                        } src={imgSrc(data.images[0],true)} />
                        {
                            data.images.length >= 2 &&
                            <LazyLoad className={
                                "w-full h-auto max-h-full object-fill hidden " + (data.images.length >= 2 ? "group-hover/img:block" : "")
                            } src={ApiConfig.rootUrl + "/" + data.images[1]} />
                        }
                    </div>
                </Link>
                <IconButton onClick={() => {
                    let s = cart.faverites.find(el => el.id == data.id)
                    if (!s)
                        dispatch(addToFavorite(data))
                    else
                        dispatch(removeFromFavorite(data.id))
                }} className={`absolute top-1 right-1 w-9 h-9 !bg-[#FFFD] text-xl transition 
                ${cart.faverites.find(el => el.id == data.id) ? "animate-faveorite" : "translate-x-[120%] max-sm:translate-x-0"} 
                group-hover:translate-x-0 hover:text-primary `}>
                    {
                        cart.faverites.find(el => el.id == data.id) ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />
                    }

                </IconButton>
                {showFull && <IconButton onClick={() => {
                    setOpenModal(true)
                }} className={`absolute top-11 right-1 w-9 h-9 delay-75 !bg-[#FFFD] text-xl transition  translate-x-[120%]
                group-hover:translate-x-0 hover:text-primary max-sm:translate-x-0`}>
                    <FiShoppingCart />
                </IconButton>}
            </div>
            <div className="p-2 flex flex-col">
                <h1 className="text-sm  text-center leading-2 line-clamp-2 font-medium mt-3 h-[40px] ">{data.name}</h1>
                {!!!hidePrice && <div className="flex justify-center text-[13px] font-semibold mt-2 max-md:flex-col max-md:items-center">
                    {
                        !!data.CompareAtPrice && <>
                            <span className="italic text-gray-400 max-sm:text-[12px] line-through font-medium">{data.CompareAtPrice.toFixed(2)} <Currency /></span>
                            <span className="me-2  max-md:hidden"></span>
                        </>
                    }


                    <span  className={isPrivate?"text-rose":"text-primary"}>{data.price.toFixed(2)} <Currency /></span>
                </div>}

                <Link to={"/product/" + data.slugName} className="w-full">
                    <Button className={`w-full border-none mt-2 bg-transparent group-hover:bg-secondary group-hover:text-white ${isPrivate?"hover:!bg-rose":"hover:!bg-primary"} `}>
                        {t("buy")}
                    </Button>
                </Link>

            </div>
            {
                !!promo ? <div dir="ltr" className={` absolute top-1 text-sm font-semibold left-1 flex justify-center items-center  text-white rounded-full px-2 py-1 max-sm:px-1 max-sm:text-[12px] ${isPrivate?"bg-rose":"bg-primary"}`}
                    >
                    {
                        -promo
                    } %
                </div> : null
            }

        </div>
        
        {openModal && <ProductModal data={data} onClose={setOpenModal} />}

    </>
}
export default ProductCard
