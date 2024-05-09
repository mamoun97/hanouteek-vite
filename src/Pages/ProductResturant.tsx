import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../Views/Container";
import ProductZoom from "../Views/ProductZoom";
import RelatedProducts from "../Views/RelatedProducts";
import { useGetProductBySlugService } from "../Api/Services";
import Qte from "../Views/Qte";
import Button from "../Views/Flowbit/Button";
import { AppDispatch, RootState } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { Cart, openCart, addToCart as addToCartS, updateCart, addToFavorite, removeFromFavorite } from "../Store/cartSlice";
import IconButton from "../Views/TailwindComponent/IconButton";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import Loading from "../Constants/Loading";
import { addToCartEvent, viewContentEvent } from "../Api/PixelService";
import { useTranslation } from "react-i18next";
import Currency from "../Constants/Currency";
import Checkout from "./Checkout";
import { FiShoppingCart } from "react-icons/fi";
import OfferCard from "../Views/OfferCard";
import {  Drawer } from "rizzui";
import Attribute from "../Views/Attribute";
import Addon from "../Views/Addon";

const ads:Addon[]=[
    {
        id: 2,
        value: "Hchawech",
        image: null,
        items: [
            {
                id: 1,
                value: "hrissa",
                price: 0,
                image: "string",
                autoSelected: true
            },
            {
                id: 2,
                value: "formage",
                price: 0,
                image: "string",
                autoSelected: true
            },
            {
                id: 3,
                value: "slata",
                price: 0,
                image: "string",
                autoSelected: true
            }
        ]
    },
    {
        id: 2,
        value: "Drinkes",
        image: null,
        items: [
            {
                id: 4,
                value: "coca",
                price: 120,
                image: "string",
                autoSelected: false
            },
            {
                id: 5,
                value: "hamoud",
                price: 120,
                image: "string",
                autoSelected: false
            },
            {
                id: 6,
                value: "chriaa",
                price: 100,
                image: "string",
                autoSelected: false
            }
        ]
    }
]
export default function ProductResturant() {
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const param = useParams()


    const prod: ProductCart | undefined | null = cart.items[parseInt(param.index ?? "0")]
    if (param.index) {
        let d = {
            data: prod,
            isUpdate: true,
            index: parseInt(param.index ?? "0")
        }
        return <ProductPage {...d} />
    } else {
        return <ProductPageRequest />
    }


}
function ProductPageRequest() {
    const param = useParams()
    const { data: product, isLoading } = useGetProductBySlugService(param.slug ?? "")



    const content = product ? <ProductPage data={{
        ...product,
        hasOffer: product.hasOffer,
        minNumberQteOffer: product.minNumberQteOffer,
        priceOffer: product.priceOffer,
        qte: 1,
        checkData: {
            color: null,
            size: null,
            addon: product.addons.flatMap(ad=>ad.items).map(e=>({...e,qte:1}))
            .filter(e=>e.autoSelected)
        }
    }} /> : ""

    if (isLoading || !param.slug)
        return <Container className="mt-5 "> {Loading.productPage}</Container>;

    return <div key={param.slug}>{content}</div>
}

export function ProductPage({ data, isUpdate = false, index = -1, isSmall = false, onClose }:
    { data: ProductCart, isUpdate?: boolean, index?: number, isSmall?: boolean, onClose?: any }) {
    const cart = useSelector<RootState>(state => state.cart) as Cart
    const { t } = useTranslation()
    const dispatch: AppDispatch = useDispatch();
    const [isCheck, setIsCheck] = useState(false);
    const checkoutRef = useRef<HTMLDivElement | null>(null);
    const [prod, setProd] = useState<ProductCart>(data);

    const [openAddon, setOpenAddon] = useState(false)
    const [detect, setDetect] = useState<string | null>(null)
    const initSizes = prod.attribute.options.length ? (prod.attribute.options[0].sizes.length ? true : false) : false;
    const addToCart = (chekout = false) => {
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
                    size: null,
                    addon: []
                },
                
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
    }, [prod.checkData.size, prod.qte])
    return <Container className={"mt-5 "}>
        <div className={"grid grid-cols-2 gap-4 max-md:grid-cols-1"}>
            <div className="col-span-1">

                <ProductZoom data={data} detect={detect} />
            </div>
            <div className="col-span-1">
                {prod.hasOffer && prod.minNumberQteOffer && prod.priceOffer ? <OfferCard prod={prod} /> : ""}
                <h1 className="text-xl font-medium">{prod.name}</h1>
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
                                originalPrice: data.price
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
                                    originalPrice: data.price
                                })


                            }}
                            type="size"
                            ActiveId={prod.checkData.size?.id}
                            data={prod.checkData.color ? prod.checkData.color.sizes : prod.attribute.options[0].sizes}
                        />
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
                        {
                            isUpdate ?

                                <Button
                                    onClick={() => addToCart()}
                                    className={"text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"}>
                                    <FiShoppingCart className="text-xl" />
                                    <div className="me-2"></div>
                                    {t("edit_cart")}
                                </Button> :
                                <Button
                                    onClick={() => {
                                        if(prod.addons.length==0){
                                            addToCart()
                                            return
                                        }

                                        if (!isValid()) {
                                            alert(t("please_select_att"))
                                            return
                                        }
                                        setOpenAddon(true)
                                        // addToCart()
                                    }}
                                    className={"text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"}>
                                    <FiShoppingCart className="text-xl" />
                                    <div className="me-2"></div>
                                    {t("add_to_cart")}
                                </Button>
                        }

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
        <div>
        </div>
        <div ref={checkoutRef}></div>
        {isCheck ? <Checkout /> : ""}
        {!isSmall && <div>
            <RelatedProducts title={t("related_prod")} />
        </div>}
        <AddonsView {...{
            open: openAddon,
            prod,
            setOpen: setOpenAddon,
            setProd,
            addToCart
        }} />

    </Container>
}
type AddonsViewType = {
    prod: ProductCart,
    open: boolean,
    addToCart: (e?: any) => void
    setOpen: (e: any) => void,
    setProd: (e: ProductCart) => void,
}
function AddonsView({
    prod, open, setOpen, setProd, addToCart
}: AddonsViewType) {

    const { t, i18n } = useTranslation()
    return <div className="">
        <Drawer
            isOpen={open}
            placement={i18n.language == "ar" ? "left" : "right"}
            className=""
            containerClassName="overflow-auto"
            onClose={() =>
                setOpen(false)
            }
        >

            <div className="rounded-lg  text ">
                <div className="max-h-[260px]   min-h-[200px] transition-all duration-1000 group overflow-hidden relative">
                    <div className="group-hover:-translate-y-[70px] transition-all duration-1000">
                        <ProductZoom data={prod} />
                    </div>
                    <h1 className="absolute bottom-0 capitalize tracking-wider left-0 right-0 p-3 pt-5 text-center text-xl font-bold bg-gradient-to-t from-black/70 to-black/5 text-white">
                        {prod.name.toUpperCase()}
                    </h1>
                </div>
                <div className="m-auto px-7  pb-8">

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
                                                price: prod.price
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
                                                price: prod.price
                                            }
                                        } : {}
                                    })

                                }}
                                value={prod.qte}
                                large={true} />
                        </div>
                    </div>
                    <div className="mt-2">
                        <h2 className="font-medium italic">{t("addons")}</h2>
                        {

                            prod.addons.map((el, k) => {
                                return <div className="mt-2" key={k}>
                                    <h2 className="font-medium text-sm">{el.value}</h2>
                                    <div className="grid grid-cols-4 gap-2 mt-2">
                                        {
                                            el.items.map((item, index) => {
                                                let it=prod.checkData.addon?.find(e=>e.id==item.id)
                                                let indexOfItem=prod.checkData.addon?.findIndex(e=>e.id==item.id)??-1
                                                return <Addon
                                                    data={ {...item,qte:it?.qte??1}}
                                                    isActive={!!it} 
                                                    onClick={()=>{
                                                       
                                                        setProd({
                                                            ...prod,
                                                            checkData:{
                                                                ...prod.checkData,
                                                                addon:it?prod.checkData?.addon?.filter(e=>e.id!=item.id):[
                                                                    ...prod.checkData.addon??[],
                                                                    {...item,qte:1}
                                                                ]
                                                            }
                                                        })
                                                    }}
                                                    onDec={()=>{
                                                        let p={...prod}
                                                        if(indexOfItem>=0&&p.checkData.addon&&p.checkData.addon[indexOfItem].qte>1){
                                                            p.checkData.addon[indexOfItem].qte-=1

                                                            setProd(p)
                                                        }
                                                        
                                                    }}
                                                    onInc={()=>{
                                                        let p={...prod}
                                                        if(indexOfItem>=0&&p.checkData.addon){
                                                            p.checkData.addon[indexOfItem].qte+=1
                                                            setProd(p)
                                                        }
                                                    }}
                                                    key={index}
                                                />
                                            })
                                        }
                                    </div>
                                </div>
                            })
                        }
                       
                    </div>
                    <div className="mt-2">
                        <Button
                            onClick={() => {
                                setOpen(false)
                                addToCart()
                            }}
                            className={"text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"}>
                            <FiShoppingCart className="text-xl" />
                            <div className="me-2"></div>
                            {t("add_to_cart")}
                        </Button>
                    </div>
                </div>
            </div>

        </Drawer>
    </div>
}