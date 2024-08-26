import { useState } from "react";


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

export default function FormOrder({ data, isAdd = false }: { data: OrderFull, isAdd?: boolean }) {
  const global = useSelector<RootState>((state) => state.global) as GlobalS
  const [dataOrder, setDataOrder] = useState<OrderFull>(data)
  const navigate = useNavigate()

  const user = useSelector<RootState>((state) => state.user) as UserAuth
  const [loading, setLoading] = useState(false)
  const [delivery, setDelivery] = useState<PriceDeliveryResponce | null>(null)
  const [cart, setCart] = useState<OrderFullItem[]>(
    data.item
  )

  const getFunctionName=(t:string)=>{
    switch(t){
      case "order_creator":return "createOrder";
      case "vendor":return "createOrderDrop";
      default:return "createOrderAssociate"
    }
  }
  const formik = useFormik({
    initialValues: data,
    onSubmit: (_: OrderFull) => {
      setLoading(true)
      if (isAdd) {
        OrderApi[getFunctionName(user.role) ]({
          ...dataOrder, 
          item: cart,
          contact_phone: "+213" + parseInt(dataOrder.contact_phone),
          min_price_drop_shipper:getDropPrice().ventmin,
          price_total:dataOrder.price_drop??dataOrder.price_total,
        }, global?.platform ? "?" + global.platform : undefined).then(_ => {
          toast.success("Ajoute avec succès")
          if (user.role == "associate"||user.role=="vendor")
            navigate("/orders")
          setLoading(false)
        }).catch(err => {
          setLoading(false)
          alertError(err)
        })
      } else
        OrderApi.updateOrder({ ...dataOrder, item: cart }, global?.platform ? "?" + global.platform : undefined).then(_ => {
          toast.success("Modifié avec succès")
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
    for (let i = 0; i != cart.length; i++) {
      s += cart[i].price_total
    }
    return s
  }
  const getPriceDelivery = () => {
    let price = 0;
    if (delivery)
      price = dataOrder.is_stopdesk ? delivery.priceDeliveryOffice ?? 0 : delivery.priceDeliveryHome

    return price
  }
  const getDropPrice = () => {
    let s = getTotal() + getPriceDelivery()
    if (dataOrder.price_drop && getTotal())
      return {
        show: true,
        ventmin: s,
        ventdrop: dataOrder.price_drop - s
      }
    return {
      show: false,
      ventmin: 0,
      ventdrop: 0
    }
  }
  return (
    <form onSubmit={formik.handleSubmit} >
      <div className="grid grid-cols-5  gap-2 mt-3">
        <div className="col-span-3  max-md:col-span-5 p-0">

          <Form {...{ cart, setCart, dataOrder, setDataOrder, delivery, setDelivery }} />

        </div>
        <div className="col-span-2  max-md:col-span-5">
          <div className="bg-gray-50 rounded-md p-5 sticky top-[60px] border border-gray-200 dark:bg-[#222] dark:border-[#444]">
            <h1 className="text-center  text-xl font-bold my-4">Cart</h1>
            <div className="flex flex-col gap-2">
              {
                cart.map((el, k) => {
                  return <CartItem2 data={el} index={k} {...{ cart, setCart }} />
                })
              }
            </div>
            <div className="flex mt-3 items-center">
              <h1 className="text-sm font-medium">SubTotal</h1>
              <div className="grow"></div>
              <span className="font-semibold">{getTotal().toFixed(2)} DZD</span>
            </div>
            <div className="flex items-center">
              <h1 className="text-sm font-medium">Delivery Price</h1>
              <div className="grow"></div>
              <span className="font-semibold">{getPriceDelivery().toFixed(2)} DZD</span>
            </div>
            <div className="flex mt-3 items-center">
              <h1 className="text-sm font-bold uppercase">Total</h1>
              <div className="grow"></div>
              <span className="font-semibold text-2xl">{
                (getTotal() + getPriceDelivery()).toFixed(2)
              } <small className="font-medium ps-1">DZD</small></span>
            </div>
            <div className="border-b border-dashed border-gray-300 my-3"></div>

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


                {!!getPriceDelivery()&&<Input
                  label="Prix de vente"
                  value={dataOrder.price_drop}
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value)))
                      setDataOrder({
                        ...dataOrder,
                        price_drop: Number(e.target.value)
                      })
                  }}
                  suffixClassName={"ms-2"}
                  suffix="DZD"
                  dir="rtl"
                  inputClassName="text-right"
                  placeholder="indiquer le prix de vente final"
                />}
                {getDropPrice().show && getDropPrice().ventdrop <= 0 && <div className="text-red text-[13px] mt-0.5 rizzui-input-error-text">
                  Le prix de vente doit être supérieur à  <strong>{getDropPrice().ventmin}</strong>  DZD
                </div>}

                {
                  getDropPrice().show && getDropPrice().ventdrop > 0 &&
                  <Input
                    label="Voici votre bénéfice si la commande atteint le statut livré"
                    value={getDropPrice().ventdrop}
                    suffix="DZD"
                    readOnly
                    dir="rtl"
                    className="mt-2 text-center"
                    inputClassName={"text-green-400 font-bold text-lg"}
                    suffixClassName={"ms-2"}
                  />
                }


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
              </>
            }


            {
              isAdd ?
                <Button className="mt-4 w-full" type="submit" isLoading={loading}>Ajouter</Button>
                :
                <Button className="mt-4 w-full" type="submit" isLoading={loading}>Sauvegarder</Button>
            }

          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </form>
  )
}
