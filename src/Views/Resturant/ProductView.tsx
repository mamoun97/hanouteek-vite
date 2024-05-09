import { useDispatch, useSelector } from "react-redux"
import ApiConfig from "../../Api/ApiConfig"
import { ThemeSetting } from "../../Types/ThemeSetting"
import Button from "../Flowbit/Button"
import { Link } from "react-router-dom"
import LazyLoad from "../LazyLoad"
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import IconButton from "../TailwindComponent/IconButton"
import { AppDispatch, RootState } from "../../Store"
import { Cart, addToFavorite, removeFromFavorite } from "../../Store/cartSlice"


import { useTranslation } from "react-i18next"
import Currency from "../../Constants/Currency"
import { FiShoppingCart } from "react-icons/fi"
// import tw from 'twin.macro'
// import { css } from "styled-components"

export default function ProductView({ data, showFull = false, className = "" }: { data: Product, className?: string, showFull?: boolean }) {
    if (showFull) { }
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const dispatch: AppDispatch = useDispatch();
    const { t } = useTranslation()
    return <>
        <div className={"bg-white group cursor-pointer   transition-all duration-500 shadow-md shadow-neutral-200/70 rounded-lg  relative cardProd " + className}>
            <div className="relative">
                <div className={`sticky top-[58px] bottom-24  z-10    overflow-hidden group rounded-t-lg  `}>
                    <Link to={"/product/" + data.slugName} className="w-full border  relative pt-[100%] block   ">

                        <div className=" group/img w-full overflow-hidden   rounded-none absolute top-0 left-0 right-0 bottom-0    shadow-md shadow-neutral-100 bg-white ">
                            <img className={
                                "w-full h-full min-h-full min-w-full  object-cover object-center rounded-none " + (data.images.length >= 2 ? "group-hover/img:hidden" : "")
                            } src={ApiConfig.rootUrl + "/" + data.images[0]} loading="lazy" />


                            {
                                data.images.length >= 2 &&
                                <img className={
                                    "w-full h-full min-h-full min-w-full  object-cover object-center rounded-none hidden " + (data.images.length >= 2 ? "group-hover/img:block" : "")
                                } src={ApiConfig.rootUrl + "/" + data.images[1]} loading="lazy" />
                            }
                        </div>
                    </Link>
                    <IconButton onClick={() => {
                        let s = cart.faverites.find(el => el.id == data.id)
                        if (!s)
                            dispatch(addToFavorite(data))
                        else
                            dispatch(removeFromFavorite(data.id))
                    }} className={`absolute top-2 right-2 w-9 h-9 !bg-[#FFFD] text-xl transition 
                ${cart.faverites.find(el => el.id == data.id) ? "animate-faveorite" : "translate-x-[120%] max-sm:translate-x-0"} 
                group-hover:translate-x-0 hover:text-primary `}>
                        {
                            cart.faverites.find(el => el.id == data.id) ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />
                        }

                    </IconButton>

                    {/* {showFull && <IconButton onClick={() => {
                    setOpenModal(true)
                }} className={`absolute top-11 right-1 w-9 h-9 delay-75 !bg-[#FFFD] text-xl transition  translate-x-[120%]
                group-hover:translate-x-0 hover:text-primary max-sm:translate-x-0`}>
                    <FiShoppingCart />
                </IconButton>} */}
                </div>
                <div className="p-2 pb-0 flex flex-col  relative">
                    <h1 className="text-base tracking-wider  text-center leading-5 font-semibold text-gray-600 mt-3 h-[40px] line-clamp-2 lowercase ">{data.name}</h1>
                    <div className="flex  justify-center mt-2 text-base font-semibold  max-md:flex-col max-md:items-center">


                        <span className="text-primary">{data.price.toFixed(2)} <Currency /></span>
                    </div>

                </div>
            </div>
            <div className="p-2 pt-0">
                <Link to={"/product/" + data.slugName} className="w-full flex justify-center gap-2">
                    <Button className={`grow  border-none mt-2 !bg-gray-100 text-gray-700 `}>
                        {t("buy")}
                    </Button>
                    <Button className={`text-lg  border-none w-10  mt-2 !bg-gray-100 text-gray-700 !p-0 flex items-center justify-center`}>
                        <FiShoppingCart />
                    </Button>
                </Link>
            </div>




        </div>

        {/* {openModal && <ProductModal data={data} onClose={setOpenModal} />} */}

    </>
}
