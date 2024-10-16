import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../Store";
import Container from "../Views/Container";
import SelectEditor from "../Views/Flowbit/SelectEditor";
import TextEditor from "../Views/Flowbit/TextEditor";
import { Cart, videCart } from "../Store/cartSlice";
import CartItem from "../Views/Cart/CartItem";
import Textarea from "../Views/Flowbit/Textarea";
import Radio from "../Views/Flowbit/Radio";
import { BsPatchCheckFill } from "react-icons/bs"
import Button from "../Views/Flowbit/Button";
import { Button as ButtonR, Input } from "rizzui";
import { useEffect, useRef, useState } from "react";
import { useGetWilayasService } from "../Api/Services";
import { useFormik } from "formik";
import { getSubTotal } from "../Constants/Functions";
import ProductApi from "../Api/ProductApi";
import useSWR from "swr";
import { Link } from "react-router-dom";
import { initiateCheckoutEvent, purchaseEvent } from "../Api/PixelService";
import CartEmpty from "../Views/CartEmpty";
import { useTranslation } from "react-i18next";
import Currency from "../Constants/Currency";
import { Toaster } from "react-hot-toast";
import { Modal } from "rizzui";
import { MdErrorOutline } from "react-icons/md";
import CheckoutResturant from "./CheckoutResturant";
import images from "../assets";
import { ThemeSetting } from "../Types/ThemeSetting";
import OtpModal from "../Views/OtpModal";
import alertError from "../hoock/alertError";
import Gift from "../Views/Gift";
import useLang from "../hoock/useLang";
import ApiConfig from "../Api/ApiConfig";
import useValidation from "../hoock/Validation";


type ModeLivraisan = {
    title: string,
    check: boolean
    cost: number | null,
    isWaslet?: boolean,
    value?: PriceDeliveryResponce
}


export default function Checkout() {
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting

    return theme.theme.templateType == "restaurant" ? <CheckoutResturant /> : <CheckoutDefault />
}
function formatPhoneNumber(phoneNumber: string) {
    const localNumber = phoneNumber.replace(/^(\+\d{3})(\d{9})$/, '0$2');
    return localNumber.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1$2$3$4');
}

function CheckoutDefault() {
    const { i18n } = useTranslation()
    const { t } = useLang()

    const [modalState, setModalState] = useState<any>(null);
    const [otp, setOtp] = useState<OtpModalOpen | null>();
    const [orderResponse, setOrderResponse] = useState<CreateOrderResponse | null>(null);
    const cart = useSelector<RootState>(state => state.cart) as Cart
    // const client = useSelector<RootState>(state => state.cart) as ClientAuth
    const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | null>(null)
    const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null)
    const client = useSelector<RootState>((state) => state.user) as UserAuth
    const isJoomla = ApiConfig.isJoomla ? (client?.id ? true : false) : false

    const initialValues = {
        to_commune_name: "",
        to_wilaya_name: "",
        fullName: "",
        contact_phone: isJoomla?formatPhoneNumber(client.phoneNumber):"",
        is_stopdesk: false,
        stopdesk_id: 0,
        nots: "",
    };
    const [isCreated, setIsCreated] = useState<Order | null>(null)
    const { data: wilayas, isLoading: lodingWilaya } = useGetWilayasService();
    const { data: communes, isLoading: communeLoading } = useSWR(
        `/tenant/city-delivery/${selectedWilaya?.id ?? 0}`,
        () => ProductApi.getCityDelivery(selectedWilaya?.id ?? 0),
        {
            keepPreviousData: true,
        }
    )

    const { data: priceDelivery } = useSWR(
        `/tenant/city-delivery/pricing/${selectedCommune?.id ?? 0}?product=${cart.items.map(el => el.id).join(",")}`,
        () => ProductApi.getPriceDelivery(selectedCommune?.id ?? 0, undefined, cart.items.map(el => el.id)),
        {
            keepPreviousData: true,
        }
    )

    const dispatch: AppDispatch = useDispatch();
    const ref = {
        checkout: useRef<HTMLDivElement | null>(null),
        fullName: useRef<HTMLDivElement | null>(null),
        contact_phone: useRef<HTMLDivElement | null>(null),
        to_wilaya_name: useRef<HTMLDivElement | null>(null),
        to_commune_name: useRef<HTMLDivElement | null>(null),
        nots: useRef<HTMLDivElement | null>(null),
        modeDelivery: useRef<HTMLDivElement | null>(null),
    }
    const [modeDelivery, setModeDelivery] = useState<ModeLivraisan[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const getOrder = (): Order => {
        const m = modeDelivery?.find(el => el.check)
        return {
            price_items: getSubTotal(cart),
            price_total: getTotal(cart),
            price_promo: 0,
            price_delivery: m?.cost ?? 0,
            to_commune_name: formik.values.to_commune_name,
            to_wilaya_name: formik.values.to_wilaya_name,
            address: "",
            fullName: formik.values.fullName,
            firstname: formik.values.fullName,
            familyname: formik.values.fullName,
            email: "",
            contact_phone: "+213" + parseInt(formik.values.contact_phone),
            weight: "0",
            couponCode: promoCode,
            width: 0,
            height: 0,
            length: 0,
            do_insurance: false,
            freeshipping: false,
            is_stopdesk: m?.value ? true : false,
            stopdesk_id: m?.value ? m.value?.center_id ?? 0 : 0,
            has_exchange: false,
            CompareAtPrice: 0,
            address_lat: 0,
            address_lng: 0,
            time_delivery: 0,
            nots: formik.values.nots,
            item: cart.items.map(el => {
                return {
                    name: el.name,
                    price_total: el.price,
                    price_item: el.price,
                    color: el.checkData.color?.value ?? "",
                    size: el.checkData.size?.value ?? "",
                    qte: el.qte,
                    cancelled: false,
                    product: {
                        id: el.id,
                        //image name for abondent
                    }
                }
            })
        }
    }
  

    const validationSchema = useValidation({
        fullName: true,
        contact_phone: true,
        to_wilaya_name: true,
        to_commune_name: true,
        nots: true
    })
    const formik = useFormik({
        initialValues,

        onSubmit: (values: OrderForm) => {
            if (values) { }
            if (!isValid()) {
                setErrors({ ...errors, deliveryRequire: t.chose_del_mod })
                return
            }
            setLoading(true)
            // 
            let dt: Order = getOrder()
            // console.log(dt)
            // setLoading(false)
            // return


            ProductApi.createOrder(dt).then((res) => {
                // console.log(res)

                let s = { ...cart }
                if (res.otp) {
                    setOrderResponse({
                        ...res,
                        state: 1
                    })
                }
                purchaseEvent(cart.items, getTotal(s), formik.values)
                setLoading(false)
                setIsCreated(dt)
                dispatch(videCart())
                if (ref.checkout.current)
                    window.scroll({ top: ref.checkout.current.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
            }).catch((err: any) => {
                setModalState(err)
                setLoading(false)
            })

        },
        validationSchema,
    });
    


    const gestionErrors = () => {
        let y: HTMLDivElement | null
        let k = modeDelivery.length ? !!modeDelivery.find(el => el.check) : true
        y = (!!formik.errors.contact_phone && !!ref.contact_phone.current) && ref.contact_phone.current ||
            (!!formik.errors.fullName && !!ref.fullName.current) && ref.fullName.current ||
            (!!formik.errors.to_wilaya_name && !!ref.to_wilaya_name.current) && ref.to_wilaya_name.current ||
            (!!formik.errors.to_commune_name && !!ref.to_commune_name.current) && ref.to_commune_name.current ||
            (!k) && ref.modeDelivery.current || null
        if (y == ref.modeDelivery.current && !k) {
            setErrors({ ...errors, deliveryRequire: t.chose_del_mod })
        }
        if (y) {

            window.scroll({ top: y.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
        }
    }
    useEffect(() => {
        setErrors({ ...errors, deliveryRequire: "" })
    }, [modeDelivery])

    useEffect(() => {
        gestionErrors()
    }, [
        formik.errors.contact_phone,
        formik.errors.to_commune_name,
        formik.errors.to_wilaya_name
    ])
    useEffect(() => {
        initiateCheckoutEvent(cart.items, getSubTotal(cart))
    }, [])
    const [errors, setErrors] = useState({
        deliveryError: "",
        deliveryRequire: "",
    })
    const cartHasDelivery = () => {
        for (let i = 0; i != cart.items.length; i++) {
            if (cart.items[i].specificPriceDelivery) {
                return cart.items[i]
            }
        }
        return null
    }

    const updatePriceDelivery = () => {
        if (priceDelivery) {

            setErrors({ ...errors, deliveryError: "" })
            let ml: ModeLivraisan[] = [];
            let p = cartHasDelivery();
            if (priceDelivery?.priceDeliveryHome == 350) {
                ml.push({
                    title: t.del_waslet,
                    check: true,
                    isWaslet: true,
                    cost: priceDelivery.priceDeliveryHome
                })
            } else if (p) {
                if (p.deliveryCostToTheOffice != null) {
                    let m = p.deliveryCostToTheOffice != 0 ? "" : t.free;
                    ml.push({
                        title: t.delivery + " " + m + " " + (ApiConfig.isJoomla ? t.to_kazi_tour : t.to_yalidine),
                        check: false,
                        cost: p.deliveryCostToTheOffice,
                        value: priceDelivery
                    })


                }
                if (p.deliveryCostToTheHome != null && !ApiConfig.isJoomla)
                    ml.push({
                        title: t.home_delivery,
                        check: false,
                        cost: p.deliveryCostToTheHome
                    })
            } else {
                if (priceDelivery.priceDeliveryOffice != null) {
                    let m = priceDelivery.priceDeliveryOffice != 0 ? "" : t.free;
                    ml.push({
                        title: t.delivery + " " + m + " " + (ApiConfig.isJoomla ? t.to_kazi_tour : t.to_yalidine),
                        check: false,
                        cost: priceDelivery.priceDeliveryOffice,
                        value: priceDelivery
                    })


                }
                if (priceDelivery.priceDeliveryHome != null && !ApiConfig.isJoomla)
                    ml.push({
                        title: t.home_delivery,
                        check: false,
                        cost: priceDelivery.priceDeliveryHome
                    })

                if (ml.length == 0) {
                    setErrors({ ...errors, deliveryError: t.not_delivery })
                    // setYalidinCenters(null)
                }
            }


            setModeDelivery(ml)

        }
    }
    useEffect(() => {
        updatePriceDelivery()
    }, [priceDelivery, cart.items.length])
    const isValid = () => {
        let k = modeDelivery.length ? !!modeDelivery.find(el => el.check) : true
        return formik.isValid && k
    }

    const register = (p: "fullName" | "contact_phone" | "to_wilaya_name" | "to_commune_name" | "nots") => {
        return {
            isError: ((formik.touched[p]) && formik.errors[p]) ? formik.errors[p] : null,
            value: formik.values[p],
            isValid: formik.errors[p] == null && formik.touched[p],
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {

                if (e.target.id == "contact_phone") {
                    if ((!/^[0-9]{0,10}$/.test(e.target.value))) {
                        return
                    }
                    else if (/^0[567][0-9]{8}$/.test(e.target.value)) {

                        Abandoned({ ...formik.values, contact_phone: e.target.value })
                    }
                }
                if (e.target.id == "to_wilaya_name") {
                    let sw = wilayas?.data.find(el => el.name == e.target.value)
                    if (sw) {
                        setSelectedWilaya(sw)
                        setSelectedCommune(null)
                        formik.setValues({
                            ...formik.values,
                            to_commune_name: ""
                        })
                    }
                }
                if (e.target.id == "to_commune_name") {
                    let sc = communes?.communes.find(el => el.name == e.target.value)
                    if (sc)
                        setSelectedCommune(sc)
                }


                formik.handleChange(e)
            },
            onBlur: formik.handleBlur,
        }
    }
    const [TH, setTH] = useState<NodeJS.Timeout | null>(null);
    const [isAbd, setIsAbd] = useState<boolean>(false);
    const Abandoned = (dt: OrderForm) => {
        if (isAbd)
            return
        if (TH)
            clearTimeout(TH)
        setTH(
            setTimeout(() => {
                if (dt.contact_phone.length == 10)
                    ProductApi.Abandoned({
                        "to_commune_name": dt.to_commune_name,
                        "to_wilaya_name": dt.to_wilaya_name,
                        "address": "",
                        "fullName": dt.fullName,
                        "firstname": dt.fullName,
                        "lastName": dt.fullName,
                        "familyname": dt.fullName,
                        "contact_phone": "+213" + parseInt(dt.contact_phone),
                        "email": "",
                        "items": cart.items.map(el => {
                            return ("name : " + el.name + " , " + " , " +
                                "price total : " + el.price + " , " +
                                "price item : " + el.price + " , " +
                                "color : " + el.checkData?.color?.value ?? "noColor" + " , " +
                                "size : " + el.checkData?.size?.value ?? "noSize" + " , " +
                                "qte : " + el.qte + " , " +
                                "product id : " + el.id + "----------------")

                        }).join("\n")

                    }).then(res => {
                        if (res) { }
                        setIsAbd(true)
                    }).catch(err => {
                        if (err) { }

                    })

            }, 4000)
        )
    }
    const getTotal = (c: Cart) => {
        let t = modeDelivery.find(el => el.check)?.cost ?? 0;
        return getSubTotal(c) + t - promoPrice

    }
    const [loadingPromo, setLoadingPromo] = useState(false)
    const [promoCode, setPromoCode] = useState("")
    const [promoPrice, setPromoPrice] = useState(0)
    const [promoModal, setPromoModal] = useState(false)
    const apply = () => {
        setLoadingPromo(true)
        ProductApi.applyPromo(promoCode, getOrder()).then((res) => {
            setPromoModal(true)
            setPromoPrice(res.price_promo)
            setLoadingPromo(false)
        }).catch((err: any) => {
            setPromoPrice(0)
            alertError(err)
            setLoadingPromo(false)
        })
    }


    return (
        <Container className="mt-3 mb-3">
            <div ref={ref.checkout}></div>
            {!isCreated ?
                <>
                    {cart.items.length != 0 ? <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-10 gap-3">
                            <div className="col-span-6 max-md:col-span-5 max-sm:col-span-10 flex justify-center ">
                                <div className="max-w-lg w-full pt-12 relative pb-12">

                                    <div className=" sticky top-[60px] ">
                                        <h1 className="text-center text-xl font-bold mb-6">{t.your_info}</h1>

                                        <div ref={ref.contact_phone}></div>
                                        <TextEditor
                                            id="contact_phone"
                                            label={t.phone}
                                            disabled={isJoomla}
                                            type="tel"
                                            inputClassName=""
                                            placeholder={t.phone}
                                            {...register("contact_phone")}
                                        />

                                        <div ref={ref.fullName}></div>
                                        <TextEditor
                                            id="fullName"
                                            label={t.fullname}
                                            placeholder={t.fullname}
                                            {...register("fullName")}
                                        />

                                        <div ref={ref.to_wilaya_name}></div>
                                        <SelectEditor
                                            id="to_wilaya_name"
                                            label={t.wilaya}
                                            placeholder={t.wilaya}
                                            {...register("to_wilaya_name")}
                                        >
                                            {
                                                lodingWilaya ?
                                                    <option className="!text-gray-700" value={""}>... Loading </option>
                                                    : <option className="!text-gray-700" value={""}>- {t.wilaya} - </option>
                                            }
                                            {
                                                wilayas?.data.map((el, key) => {
                                                    return <option className="!text-gray-700" key={key} value={el.name} id={el.id + ""} >{el.id} - {el.name}</option>
                                                })
                                            }

                                        </SelectEditor>
                                        <div ref={ref.to_commune_name}></div>
                                        <SelectEditor
                                            id="to_commune_name"
                                            label={t.commune}
                                            placeholder={t.commune}
                                            {...register("to_commune_name")}
                                        >
                                            {
                                                communeLoading ?
                                                    <option className="!text-gray-700" value={""}>... Loading </option>
                                                    : <option className="!text-gray-700" value={""}>- {t.commune} - </option>
                                            }
                                            {
                                                communes?.communes?.map((el, key) => {
                                                    return <option className="!text-gray-700" key={key} value={el.name} id={el.id + ""} >{el.name}</option>
                                                })
                                            }
                                        </SelectEditor>
                                        <div ref={ref.nots}></div>
                                        <Textarea
                                            id="nots"
                                            label={t.notes}
                                            {...register("nots")}
                                            placeholder={t.notes + "..."} />

                                    </div>
                                </div>
                            </div>
                            <div className="col-span-4 max-md:col-span-5 max-sm:col-span-10 relative">
                                <div className="bg-gray-50 rounded-md p-5 pt-12 sticky top-[60px] border border-gray-200">
                                    <h1 className="text-center  text-xl font-bold mb-6">{t.your_command}</h1>

                                    <div className="flex flex-col gap-2">
                                        {
                                            cart.items.map((el, k) => {
                                                return <CartItem data={el} index={k} key={k} isCheckout={true} editable={true} />
                                            })
                                        }
                                    </div>
                                    <div className="flex mt-3 items-center">
                                        <h1 className="text-lg font-medium">{t.sub_total}</h1>
                                        <div className="grow"></div>
                                        <span className="font-semibold">{getSubTotal(cart).toFixed(2)} <Currency /></span>
                                    </div>
                                    <div className="border border-dotted border-gray-300 mt-2 mb-3"></div>
                                    <div ref={ref.modeDelivery}></div>
                                    <div className="text-red-600 font-semibold animate-vibre">{errors.deliveryRequire}</div>
                                    {promoPrice ? <>
                                        <div className="flex mt-3 items-center">
                                            <h1 className=" font-medium">Promo price</h1>
                                            <div className="grow"></div>
                                            <span className="font-semibold">-{promoPrice} <Currency /></span>
                                        </div>


                                    </> : ""}
                                    <div className="flex font-medium items-center">
                                        {t.delivery_mode}
                                    </div>
                                    <div>
                                        {
                                            !!errors.deliveryError && <div className="mt-1 text-center font-semibold rounded-md bg-red-100 text-red-700 p-4 ">
                                                {errors.deliveryError}
                                            </div>
                                        }
                                        {
                                            modeDelivery.map((el, k) => {
                                                return <div className="flex items-center cursor-pointer mt-1 group" key={k} onClick={() => {
                                                    setModeDelivery(modeDelivery.map((item, i) => {
                                                        return { ...item, check: i == k }
                                                    }))
                                                }}>
                                                    {
                                                        !!el.isWaslet ? <div className="w-full">
                                                            <div className="flex items-center gap-1 text-sm group-hover:underline">
                                                                <Radio id="modL" type="checkbox" checked={el.check} onChange={() => { }} />
                                                                <span className=" me-1 flex flex-col items-start gap-">
                                                                    {el.title} {i18n.language == "ar" ? "عبر" : "avec"}
                                                                </span>
                                                                <div className="grow"></div>
                                                                <div className="flex items-center whitespace-nowrap gap-2">

                                                                    <img src={images.waslet} style={{ height: "42px" }} alt="" />
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-end">
                                                                <span>{el.cost?.toFixed(2)}<Currency /></span>
                                                            </div>


                                                        </div> : <>
                                                            <Radio id="modL" type="checkbox" checked={el.check} onChange={() => { }} />
                                                            <div className="me-2"></div>
                                                            <span className="text-sm group-hover:underline me-1 flex flex-col items-start gap-">
                                                                {el.title}

                                                            </span>
                                                            <div className="grow me-2"></div>
                                                            <span>{el.cost?.toFixed(2)}<Currency /></span>
                                                        </>
                                                    }

                                                </div>
                                            })
                                        }
                                    </div>
                                    <div className="border border-dotted border-gray-300 mt-3 mb-3"></div>
                                    <div className="flex items-center">
                                        <Radio id="dd" checked={true} onChange={() => { }} />
                                        <div className="me-2"></div>
                                        {t.cahch_ondeliv}
                                    </div>


                                    <Input

                                        suffix={
                                            <ButtonR onClick={() => {
                                                apply()
                                            }} isLoading={loadingPromo} className="ltr:rounded-l-none rtl:rounded-r-none" type="button">{t.apply}</ButtonR>
                                        }
                                        prefix={
                                            <span className="text-gray-500 font-semibold text-[12px]">{t.promo_code}</span>
                                        }
                                        placeholder={t.enter_promo}
                                        inputClassName="pe-0"
                                        className="mt-4"
                                        onChange={(e) => {
                                            setPromoCode(e.target.value)
                                        }}
                                        value={promoCode}
                                        label=""
                                    />
                                    {/* <div className="border border-dotted border-gray-300 mt-3 mb-2"></div> */}
                                    <div className="flex mt-3 items-center">
                                        <h1 className="text-lg font-bold uppercase">{t.total}</h1>
                                        <div className="grow"></div>
                                        <span className="font-semibold text-2xl">{getTotal(cart).toFixed(2)} <small className="font-medium"><Currency /></small></span>
                                    </div>

                                    <Button
                                        type="submit"
                                        isLoading={loading}
                                        onClick={() => gestionErrors()}
                                        className={`customPrimary grow text-white mb-3 max-h-11 h-11 mt-3 uppercase w-full
                                ${isValid() && !loading ? "animate-vibre" : ""}`}>
                                        {t.confirm_order}
                                    </Button>
                                </div>

                            </div>
                        </div>
                    </form> :
                        <CartEmpty />}
                </>


                : <div className="flex flex-col items-center mt-6">
                    <BsPatchCheckFill className="text-primary w-12 h-12" />
                    <h1 className="text-center text-xl font-bold mt-6">{t.order_valid}</h1>
                    <p className="mt-2 max-w-2xl text-center">
                        {t.order_valid_msg}
                    </p>
                    {orderResponse?.state == 1 && <>
                        <div className="flex my-4 w-full max-w-xl items-center gap-2">
                            <div className="border grow"></div>
                            <span className="text-sm font-bold text-gray-400">{t.or}</span>
                            <div className="border grow"></div>
                        </div>
                        <p className="mb-4 max-w-2xl text-center">
                            {t.msg_conf_n}
                        </p>
                        <ButtonR onClick={() => {
                            setOtp({
                                id: orderResponse.order,
                                phone: isCreated.contact_phone
                            })
                        }}>
                            {t.msg_conf_n_btn}
                        </ButtonR>
                    </>}
                    {
                        orderResponse?.state == 2 && <p className="mb-4 max-w-2xl text-center text-green-600">
                            {t.otp_conf}
                        </p>
                    }

                    <div className="bg-[#F1F1F1] rounded-md p-5 w-full max-w-4xl mt-4 flex justify-center">
                        <div className="flex items-center justify-center flex-col">
                            <span>{t.total} :</span>
                            <strong>{isCreated.price_total?.toFixed(2)} <Currency /></strong>
                        </div>
                        <div className="me-3"></div>
                        <div className="flex items-center justify-center flex-col">
                            <span>{t.payment_methode} :</span>
                            <strong>{t.cahch_ondeliv}</strong>
                        </div>

                    </div>
                    <div className="p-3 border border-gray-200 rounded-md w-full max-w-4xl mt-2">
                        <h1 className="text-center font-semibold text-lg">{t.order_details}</h1>
                        <div className="flex items-center ">
                            <div>{t.product}</div>
                            <div className="grow"></div>
                            <div>{t.price}</div>
                        </div>
                        <div className="border border-dashed border-gray-200 mt-2"></div>
                        {
                            isCreated.item.map((el, k) => {
                                return <div className="flex items-center mt-2" key={k}>
                                    <div className="flex flex-col leading-4 text-sm ">
                                        <div className="">{el.name} x <strong>{el.qte}</strong></div>
                                        {!!el.color && <div className=""><small>Color : <strong>{el.color}</strong></small></div>}
                                        {!!el.size && <div className=""><small>Size : <strong>{el.size}</strong></small></div>}
                                    </div>
                                    <div className="grow"></div>
                                    <div className="text-sm font-bold">{el.price_item?.toFixed(2)} <Currency /></div>
                                </div>
                            })
                        }
                        <div className="border border-dashed border-gray-200 mt-2"></div>
                        <div className="flex items-center mt-2">
                            <div >Sous-Total</div>
                            <div className="grow"></div>
                            <div className="font-semibold">{isCreated.price_items?.toFixed(2)} <Currency /></div>
                        </div>
                        <div className="flex items-center ">
                            <div >{t.delivery_mode}</div>
                            <div className="grow"></div>
                            <div className="font-semibold">{(isCreated.price_delivery).toFixed(2)} <Currency /></div>
                        </div>
                        <div className="flex items-center ">
                            <div >{t.payment_methode}</div>
                            <div className="grow"></div>
                            <div className="font-semibold">{t.cahch_ondeliv}</div>
                        </div>
                        <div className="border border-dashed border-gray-200 mt-3"></div>
                        <div className="flex items-center mt-4 text-xl font-semibold">
                            <div >{t.total}</div>
                            <div className="grow"></div>
                            <div className=" text-2xl font-bold">{isCreated.price_total?.toFixed(2)} <Currency /></div>
                        </div>
                    </div>
                    <Link to={"/"}>
                        <Button

                            className={`!bg-primary grow text-white mb-3 max-h-11 h-11 mt-3`}>
                            {t.return_tohome}
                        </Button>
                    </Link>
                </div>}
            {modalState && <Modal isOpen={modalState != null} onClose={() => setModalState(null)}>
                <div className="m-auto px-7 pt-6 pb-8 flex items-center justify-center flex-col gap-4">
                    <MdErrorOutline className="w-24 h-24 text-red-600" />
                    <h1 className="text-lg max-w-sm">
                        {
                            (modalState?.response ? modalState?.response?.data?.message : modalState?.message) || "something went wrong"
                        }
                    </h1>
                    <ButtonR color="danger" variant="solid" onClick={() => setModalState(null)}>
                        Close
                    </ButtonR>
                </div>
            </Modal>}
            <Toaster position="top-center" />


            {promoModal && <Modal isOpen={promoModal} onClose={() => setPromoModal(false)}>
                <div className="m-auto px-7 pt-6 pb-8 flex items-center justify-center flex-col gap-4">
                    <Gift promo={promoPrice} />
                </div>
            </Modal>}






            {!!otp && <OtpModal
                afterCahnge={() => {
                    if (orderResponse)
                        setOrderResponse({
                            ...orderResponse,
                            state: 2
                        })
                }}
                open={otp}
                setOpen={() => {
                    setOtp(null)
                }} />}
        </Container>

    )
}
