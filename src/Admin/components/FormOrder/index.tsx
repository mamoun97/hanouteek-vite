import { useMemo, useState } from "react";


import Form from "./Form";
import { Button, Input, Password, Select } from "rizzui";
import { associatStates } from "../../Const/states";
import { useFormik } from "formik";
import CartItem2 from "./CartItem2";
import OrderApi from "../../../Api/OrderApi";
import alertError from "../../../hoock/alertError";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { GlobalS } from "../../../Store/globalSlice";
import { MdInfo } from "react-icons/md";
import { IoIosCheckmarkCircle } from "react-icons/io";
import useLang from "../../../hoock/useLang";
import Currency from "../../../Constants/Currency";

export default function FormOrder({ data, isAdd = false }: { data: OrderFull, isAdd?: boolean }) {
  const { tr, t: t1, lang } = useLang()
  const t = tr.order
  const global = useSelector<RootState>((state) => state.global) as GlobalS
  const [dataOrder, setDataOrder] = useState<OrderFull>(data)
  const navigate = useNavigate()

  const user = useSelector<RootState>((state) => state.user) as UserAuth
  const [loading, setLoading] = useState(false)
  const [delivery, setDelivery] = useState<PriceDeliveryResponce | null>(null)
  // const cart = useMemo<OrderFullItem[]>(
  //   ()=>data.item,[data.item]
  // )
  // const setCart=()=>{}



  const getFunctionName = (t: string) => {
    switch (t) {
      case "order_creator": return "createOrder";
      case "vendor": return "createOrderDrop";
      default: return "createOrderAssociate"
    }
  }
  const formik = useFormik({
    initialValues: data,
    onSubmit: (_: OrderFull) => {
      setLoading(true)
      if (isAdd) {
        OrderApi[getFunctionName(user.role)]({
          ...dataOrder,
          // item: cart,
          contact_phone: "+213" + parseInt(dataOrder.contact_phone),
          min_price_drop_shipper: getDropPrice.ventmin,
          price_delivery: getPriceDelivery(),
          price_total: user.role == "vendor" ? ((dataOrder.price_drop ?? 0)+getPriceDelivery()) : dataOrder.price_total,
        }, global?.platform ? "?" + global.platform : undefined).then(_ => {
          toast.success(t.add_succ)
          if (user.role == "associate" || user.role == "vendor")
            navigate("/orders")
          setLoading(false)
        }).catch(err => {
          setLoading(false)
          alertError(err)
        })
      } else
        OrderApi.updateOrder({ ...dataOrder }, global?.platform ? "?" + global.platform : undefined).then(_ => {
          toast.success(t.edit_succ)
          navigate("/orders")
          setLoading(false)
        }).catch(err => {
          setLoading(false)
          alertError(err)
        })
    }
  });
  const getTotal = () => {
    let s = 0;
    for (let i = 0; i != dataOrder.item.length; i++) {
      s += dataOrder.item[i].price_total
    }
    return s
  }
  const getPriceDelivery = () => {
    let price = 0;
    if (delivery)
      price = dataOrder.is_stopdesk ? delivery.priceDeliveryOffice ?? 0 : delivery.priceDeliveryHome

    return price
  }
  const getTotalDrop = () => {
    const cart = dataOrder.item
    let s = 0;
    for (let i = 0; i != cart.length; i++) {
      s += (cart[i].min_selling_drop_price ?? cart[i].price_total) * cart[i].qte
    }
    return s
  }
  const getDropPrice = useMemo(() => {
    let s = getTotalDrop()
    return (dataOrder.price_drop && s) ? {
      show: true,
      ventmin: s,
      ventdrop: dataOrder.price_drop - s
    } : {
      show: false,
      ventmin: 0,
      ventdrop: 0
    }
  }, [dataOrder.price_drop, getTotalDrop()])

  return (
    <form onSubmit={formik.handleSubmit} >
      <div className="grid grid-cols-5  gap-2 mt-3 relative">
        <div className="col-span-3  max-md:col-span-5 p-0">

          <Form {...{ cart: dataOrder.item, setCart: (e: OrderFullItem[]) => setDataOrder({ ...dataOrder, item: e }), dataOrder, setDataOrder, delivery, setDelivery }} />

        </div>
        <div className="col-span-2  max-md:col-span-5 relative">
          <div className=" rounded-md p-5 sticky top-[60px] bg-card dark:text-[#E3E3E3]">
            <h1 className="text-center  text-xl font-bold my-4">{t.cart}</h1>
            <div className="flex flex-col gap-2">

              {
                dataOrder.item.map((el, k) => {
                  return <CartItem2 data={el} index={k} {...{ cart: dataOrder.item, setCart: (e: OrderFullItem[]) => setDataOrder({ ...dataOrder, item: e }) }} />
                })
              }

            </div>
            {
              user.role != "vendor" && <>
                <div className="flex mt-3 items-center">
                  <h1 className="text-sm font-medium">{t.sub_total}</h1>
                  <div className="grow"></div>
                  <span className="font-semibold">{getTotal().toFixed(2)} <Currency /></span>
                </div>
                <div className="flex items-center">
                  <h1 className="text-sm font-medium">Prix ​​de livraison</h1>
                  <div className="grow"></div>
                  <span className="font-semibold">{getPriceDelivery().toFixed(2)} <Currency /></span>
                </div>
                <div className="flex mt-3 items-center">
                  <h1 className="text-sm font-bold uppercase">Total</h1>
                  <div className="grow"></div>
                  <span className="font-semibold text-2xl">{
                    (getTotal() + getPriceDelivery()).toFixed(2)
                  } <small className="font-medium ps-1"><Currency /></small></span>
                </div>
                <div className="border-b border-dashed border-gray-300 my-3"></div>
              </>
            }


            {!isAdd && <Select
              label="Select state"
              value={{ label: dataOrder.state, value: dataOrder.state }}
              onChange={(e: typeof associatStates[0]) => {
                setDataOrder({
                  ...dataOrder,
                  state: e.value
                })
              }}
              options={associatStates}
            />}
            {
              user.role == "vendor" ? <>
                <div className="border border-dashed dark:border-muted my-4"></div>
                <div className="flex mt-3 items-center">
                  <h1 className="text-sm font-medium">{t.total}</h1>
                  <div className="grow"></div>
                  <span className="font-semibold">{getTotal().toFixed(2)} <Currency /></span>
                </div>
                {!!getPriceDelivery() && <>
                  <div className="flex  items-center gap-2 mt-2">
                    <h1 className="text-sm font-medium whitespace-nowrap ">{t.ur_price_vent}</h1>

                    <Input
                      label=""
                      size="sm"
                      value={dataOrder.price_drop }
                      onChange={(e) => {
                        if (!isNaN(Number(e.target.value)))
                          setDataOrder({
                            ...dataOrder,
                            price_drop: Number(e.target.value)
                          })
                      }}
                      suffixClassName={"ms-2 "}
                      dir={lang == "ar" ? 'ltr' : "rtl"}
                      className="grow"
                      {...getDropPrice.show ? { suffix: <Currency /> } : {}}
                      inputClassName="text-right text-sm font-bold"
                      placeholder={""}
                    />
                  </div>
                  {!getDropPrice.show&&<div className="mb-4 text-xs opacity-50 font-semibold rtl:text-left ltr:text-right">
                    {t.min_price.replace("%DATA%", getTotalDrop() + "")}
                  </div>}

                  {/* error message */}

                  {getDropPrice.show && getDropPrice.ventdrop < 0 && <div className="flex my-2 items-center p-4 mb-4 text-sm text-red-800  rounded-lg bg-[#EEE] dark:bg-[#181818] dark:text-red-400 dark:border-red-800" role="alert">
                    <MdInfo className="flex-shrink-0 inline w-5 h-5 me-3" />

                    <div>
                      {t.error_benif}  <strong>{getDropPrice.ventmin}</strong>  <Currency />
                    </div>
                  </div>}

                  {/* success message */}

                  {
                    getDropPrice.show && getDropPrice.ventdrop >= 0 &&
                    <div className=" my-2">
                      <div className="flex items-center p-4 mb-4 text-sm text-green-800  rounded-lg bg-[#EEE] dark:bg-[#181818] dark:text-green-400 dark:border-green-800" role="alert">
                        <IoIosCheckmarkCircle className="flex-shrink-0 inline w-5 h-5 me-3" />
                        <div>
                          {t.success_benif}
                          ( <strong className="text-green-400">{(dataOrder.price_drop ?? 0) - getTotal()} <Currency /></strong> )
                        </div>
                      </div>


                    </div>
                  }
                  <div className="flex items-center">
                    <h1 className="text-sm font-medium">{t.del_price}</h1>
                    <div className="grow"></div>
                    <span className="font-semibold">{getPriceDelivery().toFixed(2)} <Currency /></span>
                  </div>

                  {getDropPrice.show && getDropPrice.ventdrop >= 0 && <>
                    <div className="border border-dashed dark:border-muted my-4"></div>
                    <div className="flex mt-3 items-center">
                      <h1 className="text-sm font-bold ">{t.total_client_comm}</h1>
                      <div className="grow"></div>
                      <span className="font-semibold text-2xl max-sm:text-lg whitespace-nowrap">{
                        ((dataOrder.price_drop ?? 0) + getPriceDelivery()).toFixed(2)
                      } <small className="font-medium ps-1"><Currency /></small></span>
                    </div>
                  </>}


                  {getDropPrice.show && getDropPrice.ventdrop >= 0 && <Button className="mt-4 w-full" type="submit" isLoading={loading}>Ajouter</Button>}
                </>}


              </> : <>
                <Password
                  className="mt-2"
                  label="Password"
                />
                <Input
                  suffix={
                    <Button className="rounded-l-none" type="button">Appliquer</Button>
                  }
                  prefix={
                    <span className="text-gray-500 font-semibold text-[12px]">Code promo</span>
                  }
                  inputClassName="pe-0"
                  className="mt-4"
                  label=""
                />
                {
                  isAdd ?
                    <Button className="mt-4 w-full" type="submit" isLoading={loading}>Ajouter</Button>
                    :
                    <Button className="mt-4 w-full" type="submit" isLoading={loading}>Sauvegarder</Button>
                }
              </>
            }




          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </form >
  )
}
