import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../Store'
import {  addToCart as addToCartS, addToFavorite, Cart, openCart, removeFromFavorite, updateCart } from '../../Store/cartSlice'
import { useTranslation } from 'react-i18next'
import ApiConfig from '../../Api/ApiConfig'
import { addToCartEvent, viewContentEvent } from '../../Api/PixelService'
import Container from '../Container'
import ProductZoom from '../ProductZoom'
import OfferCard from '../OfferCard'
import Currency from '../../Constants/Currency'
import Attribute from '../Attribute'
import OffersView from '../OffersView'
import IconButton from '../TailwindComponent/IconButton'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Badge, Button as ButtonR, Modal } from "rizzui";
import { BsMessenger } from 'react-icons/bs'
import Qte from '../Qte'
import { FiShoppingCart } from 'react-icons/fi'
import Reviews from '../Reviews'
import Checkout from '../../Pages/Checkout'
import RelatedProducts from '../RelatedProducts'
import OfferModal from '../OfferModal'
import Button from '../Flowbit/Button'
const NULL_STOCK = -9999999

export function ProductPageDefault({ data, isUpdate = false, index = -1, isSmall = false, onClose }:
    { data: ProductCart, isUpdate?: boolean, index?: number, isSmall?: boolean, onClose?: any }) {
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const { t } = useTranslation()
    const client = useSelector<RootState>((state) => state.client) as UserAuth
    const hidePrice = ApiConfig.isJoomla ? (client?.id ? false : true) : false
    const dispatch: AppDispatch = useDispatch();
    const [isCheck, setIsCheck] = useState(false);
    const [openOfferModal, setOpenOfferModal] = useState(false);
    const [openContact, setOpenContact] = useState(false);
    const checkoutRef = useRef<HTMLDivElement | null>(null);
    const [fixedB, setFixedB] = useState(false)
    const refF = useRef<HTMLDivElement | null>(null);
    const refA = useRef<HTMLDivElement | null>(null);

    const [prod, setProd] = useState<ProductCart>(data)
    const [stock, setStock] = useState<number>(NULL_STOCK)
    const [detect, setDetect] = useState<string | null>(null)
    const initSizes = prod.attribute.options.length ? (prod.attribute.options[0].sizes.length ? true : false) : false;
    const addToCart = (chekout = false) => {
        // setOpenOfferModal(true)
        // return
        if (!isValid()) {
            alert(t("please_select_att"))
            return
        }
        if (onClose) {
            onClose(false)
        }
        let p = { ...prod }

        if (isUpdate)
            dispatch(updateCart({ index, item: p }))
        else {
            if (!chekout)
                addToCartEvent(data.id, data.price, data.qte)
            dispatch(addToCartS(p))
            setProd({
                ...data,
                qte: 1,
                checkData: {
                    color: null,
                    size: null
                }
            })
        }
        if (chekout && !onClose) {
            setIsCheck(true)

            if (checkoutRef.current) {
                window.scroll({ top: checkoutRef.current.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
            }
        }
        else
            dispatch(openCart(true))


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

    const changeFixed = (_: any) => {
        let ref = refF.current

        if (ref)
            setFixedB(
                ref.offsetTop - ref.clientHeight < window.scrollY ||
                window.scrollY < ref.offsetTop - window.outerHeight + ref.clientHeight
            )
        else setFixedB(false)


    }
    useEffect(() => {

        viewContentEvent(data.id, data.price)
        window.addEventListener("scroll", changeFixed);
        return () => {
            window.removeEventListener("scroll", changeFixed);
        }
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
    }, [prod.checkData.size, prod.qte])
    const isDispo = (
        !!prod.checkData.color || !!prod.checkData.size ? prod.attribute.options[0].stock > 0 : true
    ) || (prod.checkData.size?.stock && prod.checkData.size.stock > 0 ||
        prod.checkData.color?.stock && prod.checkData.color.stock > 0)

    return <Container className={"mt-5 "}>
        <div className={"grid grid-cols-2 gap-4 max-md:grid-cols-1 "}>
            <div className="col-span-1">
                <ProductZoom data={data} detect={detect} />
            </div>
            <div className="col-span-1">
                {prod.hasOffer && prod.minNumberQteOffer && prod.priceOffer ? <OfferCard prod={prod} /> : ""}
                <h1 className="text-xl font-medium">{prod.name}</h1>
                {hidePrice ? null : <div className="flex mt-2 items-center font-semibold" ref={refA}>
                    {!!data.CompareAtPrice && <>
                        <span className="italic text-gray-600 text-sm line-through font-normal">{prod.CompareAtPrice.toFixed(2)} <Currency /></span>
                        <span className="me-2 mb-2"></span>
                    </>}
                    <span className="text-lg text-primary">{prod.price.toFixed(2)} <Currency /></span>
                </div>}
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
                                oldPrice: data.price
                            })
                            setStock(el.sizes.length != 0 ? NULL_STOCK : el.stock)
                            if (!!el.image)
                                setDetect(el.image)

                        }}
                        type="color"
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
                                    oldPrice: data.price
                                })
                                if (prod.checkData.color)
                                    setStock(el.stock)

                            }}
                            type="size"
                            ActiveId={prod.checkData.size?.id}
                            data={prod.checkData.color ? prod.checkData.color.sizes : prod.attribute.options[0].sizes}
                        />
                    </div> : ""
                }
                {
                    stock != NULL_STOCK && stock > 0 ? <div className="flex justify-center bg-green-100 p-3 my-2">
                        {stock <= 0 ? <>
                            <span className='text-red-800'>{t("no_dispo")}</span>
                        </> : <>
                            {t("qte_instock")} <div className="me-2"></div> <strong >{stock}</strong>
                        </>}
                    </div> : ""
                }
                <div className="my-2">
                    <OffersView productId={prod.id} />
                </div>
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
                    <h2 className="font-medium italic flex items-center gap-2">
                        {t("qte")}
                        <div className="flex items-center">
                            (
                            {
                                isDispo ? <>
                                    <p className="min-w-[80px] ">{t("dispo")}</p>

                                </> : <>
                                    <p className="min-w-[80px] text-red-600">{t("no_dispo")}</p>
                                </>
                            }
                            )
                        </div>
                    </h2>
                    <div className="flex items-center mt-2 gap-2" ref={refF}>

                        {
                            ApiConfig.isJoomla ? <>

                                <Link to={"https://m.me/133121346554730"} className="grow" target="_blank">
                                    <Button

                                        onClick={() => {
                                        }}
                                        className={"w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center " + (isDispo ? "animate-vibre" : "")}>
                                        <BsMessenger className="text-2xl" />
                                        <span className="me-2"></span>
                                        {t("contact_us_buy")}
                                    </Button>
                                </Link>
                            </> : <>
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
                                {
                                    isUpdate ?

                                        <Button
                                            onClick={() => {
                                                if (ApiConfig.isJoomla) {
                                                    setOpenContact(true)
                                                    return
                                                }
                                                addToCart()
                                            }}
                                            className={"text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"}>
                                            <FiShoppingCart className="text-xl" />
                                            <div className="me-2"></div>
                                            {t("edit_cart")}
                                        </Button> :
                                        <Button
                                            onClick={() => {
                                                if (ApiConfig.isJoomla) {
                                                    setOpenContact(true)
                                                    return
                                                }
                                                addToCart()
                                            }}
                                            className={"text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"}>
                                            <FiShoppingCart className="text-xl" />
                                            <div className="me-2"></div>
                                            {t("add_to_cart")}
                                        </Button>
                                }
                            </>

                        }


                    </div>
                </div>
                {/* {!onClose && <div className="my-2">
                    <Button
                        onClick={() => addToCart(true)}
                        className={"customPrimary grow text-white h-11 w-full animate-vibre"}>
                        {t("buy")}
                    </Button>
                </div>} */}
                <div className="mt-2">
                    <h2 className="font-medium italic">{t("desc")}</h2>
                    <div className="overflow-auto font-normal mt-2">
                        <div dangerouslySetInnerHTML={{ __html: data.description }} ></div>
                    </div>

                </div>
            </div>
        </div>
        <div>
            <Reviews id={data.id} />
        </div>
        <div ref={checkoutRef}></div>
        {isCheck ? <Checkout /> : ""}
        {!isSmall && <div className="relative z-0">
            <RelatedProducts title={t("related_prod")} />
        </div>}
        {
            openOfferModal && <OfferModal {...{
                open: openOfferModal,
                setOpen: setOpenOfferModal,
                prod
            }} />
        }

        <div className={"fixed z-10 bottom-0 left-0 flex justify-center right-0 p-4  " + (fixedB ? "" : "hidden")}>
            <ButtonR
                variant="solid"
                color="primary"
                onClick={() => {
                    if (refA && refA.current)
                        window.scrollTo(refA.current.offsetTop, refA.current.offsetTop)
                }}
                className={" w-full max-w-sm animate-vibre border border-white"}>
                <FiShoppingCart className="text-xl" />
                <div className="me-2"></div>
                {t("add_to_cart")}
            </ButtonR>

        </div>

    </Container>
}