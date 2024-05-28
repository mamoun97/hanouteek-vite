
import Container from "../Views/Container"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Store"
import { useTranslation } from "react-i18next"
import { Cart, addToFavorite, addToCartItems, openCart, removeFromFavorite } from "../Store/cartSlice"
import { viewContentEvent } from "../Api/PixelService"
import Attribute from "../Views/Attribute"
import IconButton from "../Views/TailwindComponent/IconButton"
import Qte from "../Views/Qte"
import ProductZoom from "../Views/ProductZoom"
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md"
import { Button } from "rizzui"
import { FiShoppingCart } from "react-icons/fi"
import Currency from "../Constants/Currency"
// import OfferCard from "../Views/OfferCard"
import { useGetOfferById } from "../Api/Services"
import { useParams } from "react-router-dom"
import ApiConfig from "../Api/ApiConfig"
import { IoMdCheckmarkCircle } from "react-icons/io"
import toast, { Toaster } from "react-hot-toast"
import { FaInfoCircle } from "react-icons/fa"


type ProductCartStock = ProductCart & {
    stock: number
}
const NULL_STOCK = -9999999

export default function Offer() {
    const param = useParams()
    const { t, i18n } = useTranslation()
    const dispatch: AppDispatch = useDispatch();
    const { data: offers, isLoading } = useGetOfferById(param.id ?? "")
    const offers_ref = useRef<HTMLDivElement | null>(null);
    const product_page_ref = useRef<HTMLDivElement | null>(null);
    const [prods, setProds] = useState<ProductCartStock[]>([])
    const [index, setIndex] = useState(0)

    const isValid = (prod: ProductCartStock): boolean => {
        if (prod.attribute.options.length == 0) return true;
        if (prod.checkData.color) {
            if (prod.checkData.color.sizes.length != 0)
                return prod.checkData.size != null
            else
                return true
        }
        return false
    }
    const updateProds = (i: number, p: ProductCartStock) => {
        let d = [...prods]
        d[i] = p
        setProds(d)
    }

    useEffect(() => {

        if (offers) {
            initialData()
        }

    }, [offers])
    useEffect(() => {
        if (offers_ref.current) {
            scrollToProductPage()
            // window.scroll({ top: offers_ref.current.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
        }
    }, [index])
    const scrollToProductPage = () => {
        if (product_page_ref.current) {
            window.scroll({ top: product_page_ref.current.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
        }
    }

    const initialData = () => {
        setProds(
            offers?.offerItems.map((o) => {
                return {
                    ...o.product,
                    hasOffer: o.product.hasOffer,
                    minNumberQteOffer: o.product.minNumberQteOffer,
                    priceOffer: o.product.priceOffer,
                    price: o.price,
                    oldPrice: o.product.price,
                    qte: 1,
                    stock: -9999999,
                    checkData: {
                        color: null,
                        size: null
                    }
                }
            }) ?? []
        )
        setIndex(0)
    }
    const alert=(s:any)=>{
        toast(s, {
            icon: <FaInfoCircle className="w-10 text-yellow-400"/>,
            className:"shadow-xl",
            style:{
                zIndex:10000
            }
          });
    }
    const addToCart = () => {
        if (!isValid(prods[index])) {
            alert(t("please_select_att"))
            scrollToProductPage()
            return
        }
        for (let i = 0; i < prods.length; i++) {
            if (!isValid(prods[i])) {
                alert(
                    <div className="flex">
                        {t("must_add_all_prods")}
                    </div>
                )
                setIndex(i);
                return
            }
        }

        dispatch(addToCartItems(prods))
        dispatch(openCart(true))
        initialData()
    }
    function Products({ isGrid = false }: { isGrid?: boolean }) {
        const items = prods.map((el, k) => {
            return <div key={k}
                onClick={() => {
                    setIndex(k)
                    if (k == index) {
                        scrollToProductPage()
                    }
                }}
                className={` animate-anim_border  shadow-md bg-white inline-block rounded-lg overflow-hidden   p-0
            ${!isValid(prods[k]) ? "" : ""}
             cursor-pointer
             ${(index == k) ? "shadow-xl scale-110 z-10" : "  "}
             ${!isValid(prods[k]) && index == k ? "animate-vibre_sc border border-primary" : ""}
            `}>
                <div className={`w-28  h-28  max-[330px]:w-full   z-0 overflow-hidden   transition-all duration-500  bg-cover bg-center bg-no-repeat 
                
                
                `}

                    style={{
                        backgroundImage: "url('" + ApiConfig.rootUrl + "/" + el.images[0] + "')"
                    }}>

                    {(isValid(prods[k])) && <div className="w-full h-full bg-black/40 text-white  flex items-center justify-center flex-col" >
                        <IoMdCheckmarkCircle className="w-10 h-10 " />
                        <h1 className="text-center text-xs font-semibold">{t("added")}</h1>
                    </div>}
                </div>
                <h1 className="text-center  font-medium tracking-widest px-2 line-clamp-2 max-w-[112px] leading-4 mt-2 text-[12px] h-[32px]">
                    {prods[k].name}
                </h1>
                <div className="flex text-[12px] my-2 max-[390px]:flex-col items-center">
                    <span className="tracking-normal  line-through text-gray-500  mx-1">{prods[k].oldPrice} <Currency/></span>
                    <span className="tracking-normal font-bold text-primary">{prods[k].price} <Currency/></span>

                </div>
            </div>

        })
        if (isGrid)
            return <div className="flex place-items-center max-[464px]:grid max-[330px]:grid-cols-2 grid-cols-3  gap-3 p-4 max-sm:p-2 max-[530px]:gap-1 ">
                {items}
            </div>
        return <div className="flex place-items-center  grid-cols-3  gap-3 p-4 max-sm:p-2 max-[530px]:gap-1 ">
            {items}
        </div>
    }

    return <div className="relative z-0 ">
        {
            isLoading ? <div className="h-screen flex items-center justify-center">
                <svg aria-hidden="true" role="status" className="inline scale-125 w-20 h-20  text-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
            </div> :
                <div ref={offers_ref} className="">
                    {offers && <>
                        <div className={"p-2 overflow-hidden"}>
                            <Container className={" my-3 relative  shadow-sm rounded-xl   offer-card " + (i18n.language == "ar" ? "offer-rtl" : "")}>

                                <div className="rounded-lg bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200  absolute top-0 left-0 w-full h-full"></div>
                                <span className="offer-span" data-content={t("offre")}></span>
                                <div className="flex gap-3  p-4 py-6  items-center max-[570px]:flex-col  z-0  relative"
                                >


                                    <div className="!h-full   grow flex flex-col items-center gap-3 relative">
                                        <h1 className="text-center text- font-bold tracking-widest text-3xl">{offers?.name} 👊</h1>
                                        <div className="text-sm  max-w-4xl">
                                            <h1 className="tracking-normal  text-center text-sm  ">
                                               
                                                <div dangerouslySetInnerHTML={{ __html: offers.description }} ></div>
                                            </h1>

                                        </div>
                                        <Products />
                                        <div className="flex">
                                            <Button
                                                onClick={() => addToCart()}
                                                className={"text-gray-900 animate-vibre bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"}>

                                                <FiShoppingCart className="text-xl" />
                                                <div className="me-2"></div>
                                                {t("add_to_cart")}


                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="border-t my-8 mt-3"></div> */}
                            </Container>
                        </div>
                        {
                            prods[index] ? <div ref={product_page_ref}
                                key={"offerindex-" + index + prods[index]?.id}
                            >
                                <OfferPage

                                    data={prods[index]}
                                    {...{
                                        updateProds,
                                        index,
                                        addToCart
                                    }}
                                    products={<Products isGrid={true} />}
                                />
                            </div> : null
                        }
                    </>}
                </div>
        }

        <Toaster position="bottom-center" />
    </div>
}

function OfferPage({
    data,
    index,
    addToCart,
    products,
    updateProds
}: {
    data: ProductCartStock,
    index: number,
    products: React.ReactNode,
    updateProds: (i: number, p: ProductCartStock) => void
    addToCart: () => void
}) {
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const { t } = useTranslation()

    const dispatch: AppDispatch = useDispatch();
    const [prod, setProd] = useState<ProductCartStock>(data)
    // const [stock, setStock] = useState<number>(data.stock)
    const [detect, setDetect] = useState<string | null>(null)
    const initSizes = prod.attribute.options.length ? (prod.attribute.options[0].sizes.length ? true : false) : false;


    useEffect(() => {

        viewContentEvent(data.id, data.price)
    }, [])
    const isQteChange = prod.checkData.size &&
        prod.qte > prod.checkData.size.stock &&
        !!prod.checkData.color &&
        !prod.checkData.size.underStock
    useEffect(() => {
        if (
            isQteChange
        )
            setProd(
                { ...prod, qte: prod.checkData.size?.stock ?? 1 }
            )
        updateProds(index, prod)
    }, [prod.checkData.size, prod.qte])
    useEffect(() => {

        updateProds(index, prod)
    }, [prod.checkData, prod.qte])

    return <Container className={"mt-5 "}>
        <div className={"grid grid-cols-2 gap-4 max-md:grid-cols-1"}>
            <div className="col-span-1 ">
                <div className="sticky top-[74px]">
                    <ProductZoom data={data} detect={detect} />
                </div>

            </div>
            <div className="col-span-1">
                {/* {prod.hasOffer && prod.minNumberQteOffer && prod.priceOffer ? <OfferCard prod={prod} /> : ""} */}
                <h1 className="text-2xl font-semibold tracking-wider">{prod.name}  </h1>
                <div className="flex mt-2 items-center font-semibold">
                    {!!data.CompareAtPrice && <>
                        <span className="italic text-gray-600 text-sm line-through font-normal">{prod.CompareAtPrice.toFixed(2)} <Currency /></span>
                        <span className="me-2 mb-2"></span>
                    </>}
                    <span className="text-lg text-primary">{prod.price.toFixed(2)} <Currency /></span>
                </div>
                {prod.attribute.options.length ? <div className="mt-3">

                    <h2 className="font-medium italic">{prod.attribute.name}</h2>

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
                                price: (prod.hasOffer && prod.minNumberQteOffer && prod.priceOffer && prod.qte >= prod.minNumberQteOffer) ? prod.priceOffer : (el.price ? el.price : data.price),
                                stock: el.sizes.length != 0 ? NULL_STOCK : el.stock
                            })
                            if (!!el.image)
                                setDetect(el.image)

                        }}
                        ActiveId={prod.checkData.color?.id}
                        data={prod.attribute.options}
                    />
                </div> : ""}
                {
                    initSizes ? <div className="mt-2">
                        <h2 className="font-medium italic">{prod.attribute.optionsName}</h2>
                        <Attribute
                            setProduct={setProd}
                            product={prod}
                            onClick={(el: Size) => {
                                setProd({
                                    ...prod,
                                    checkData: {
                                        ...prod.checkData,
                                        size: el
                                    },
                                    price: (prod.hasOffer && prod.minNumberQteOffer && prod.priceOffer && prod.qte >= prod.minNumberQteOffer) ? prod.priceOffer : (el.price ? el.price : data.price),
                                    ...prod.checkData.color ? {
                                        stock: el.stock
                                    } : {}

                                })

                            }}
                            type="size"
                            ActiveId={prod.checkData.size?.id}
                            data={prod.checkData.color ? prod.checkData.color.sizes : prod.attribute.options[0].sizes}
                        />
                    </div> : ""
                }
                {
                    prod.stock != NULL_STOCK && prod.stock > 0 ? <div className="flex justify-center bg-green-100 p-3 my-2">
                        {prod.stock <= 0 ? <>
                            <span className='text-red-800'>{t("no_dispo")}</span>
                        </> : <>
                            {t("qte_instock")} <div className="me-2"></div> <strong >{prod.stock}</strong>
                        </>}
                    </div> : ""
                }

                <div className="mt-2 flex items-center">
                    <IconButton onClick={() => {
                        let s = cart.faverites.find(el => el.id == data.id)
                        if (!s)
                            dispatch(addToFavorite(data))
                        else
                            dispatch(removeFromFavorite(data.id))
                    }} className={` w-9 h-9 bg-white text-xl transition 
                            ${cart.faverites.find(el => el.id == data.id) ? "animate-faveorite" : ""} 
                             hover:text-primary `}>
                        {
                            cart.faverites.find(el => el.id == data.id) ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />
                        }

                    </IconButton>
                    <div className="me-2"></div>
                    <h2 className="font-medium text-sm">{
                        !cart.faverites.find(el => el.id == data.id) ? t("add_faves") : t("remove_faver")
                    }</h2>
                </div>
                <div className="mt-2">
                    <h2 className="font-medium italic">
                        {t("select_all_prod")}
                    </h2>
                    {
                        products
                    }
                </div>

                <div className="mt-2">
                    <h2 className="font-medium italic">{t("qte")}</h2>
                    <div className="flex mt-2 gap-2">
                        <Qte
                            addClick={() => {
                                setProd({
                                    ...prod,
                                    qte: prod.qte + 1,
                                    ...prod.hasOffer && prod.minNumberQteOffer && prod.priceOffer ? {
                                        ...(prod.qte + 1) >= prod.minNumberQteOffer ? {
                                            price: prod.priceOffer
                                        } : {
                                            price: data.price
                                        }
                                    } : {}
                                })

                            }}
                            removeClick={() => {
                                setProd({
                                    ...prod,
                                    qte: prod.qte - 1,
                                    ...prod.hasOffer && prod.minNumberQteOffer && prod.priceOffer ? {
                                        ...(prod.qte - 1) >= prod.minNumberQteOffer ? {
                                            price: prod.priceOffer
                                        } : {
                                            price: data.price
                                        }
                                    } : {}
                                })

                            }}
                            value={prod.qte}
                            large={true} />

                        <Button
                            onClick={() => addToCart()}
                            className={"text-gray-900 animate-vibre bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"}>

                            <FiShoppingCart className="text-xl" />
                            <div className="me-2"></div>
                            {t("add_to_cart")}

                        </Button>


                    </div>
                </div>

                <div className="mt-2">
                    <h2 className="font-medium italic">{t("desc")}</h2>
                    <div className="overflow-auto font-normal mt-2">
                        <div dangerouslySetInnerHTML={{ __html: data.description }} ></div>
                    </div>

                </div>
            </div>
        </div>



    </Container>

}
