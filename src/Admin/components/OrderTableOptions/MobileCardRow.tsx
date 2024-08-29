import { ActionIcon, Badge, Button, Popover, Text, Title, Tooltip } from "rizzui";
import Currency from "../../../Constants/Currency";
import StateChange from "../StateChangeButton";
import useLang from "../../../hoock/useLang";
import { IoArrowForward } from "react-icons/io5";
import ButtomDrower from "../BottomDrower";
import { useState } from "react";
import toast from "react-hot-toast";
import CopyText from "../../../Constants/CopyText";
import { MdContentCopy, MdLocalPhone } from "react-icons/md";
import moment from "moment";
import ItemsProductModal from "../ItemsProductModal";
import TimeLine from "../TimeLine";
import ApiConfig from "../../../Api/ApiConfig";
import OrderApi from "../../../Api/OrderApi";
import alertError from "../../../hoock/alertError";

function formatPhoneNumber(phoneNumber: string) {
    const localNumber = phoneNumber.replace(/^(\+\d{3})(\d{9})$/, '0$2');
    return localNumber.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
}


//id state price fi 2 
export default function MobileCardRow({ data, afterChange = () => { } }: { data: OrderFull, afterChange?: any }) {
    const { tr, t: t1, lang } = useLang()
    const t = tr.order
    const [open, setOpen] = useState(false)
    // en preparation
    const cancelOrder = () => {
        OrderApi.updateState(data.id, {
            state: "canceled"
        }).then(_ => {
            afterChange()
            setOpen(false)
        }).catch(err => {
            alertError(err)
        })
    }
    return (
        <div>
            <div className="bg-card p-4 rounded-2xl  flex flex-col gap-1 " >
                <div className="flex flex-col gap-1 cursor-pointer" onClick={() => setOpen(true)}>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-base font-semibold leading-4"># {data.id} </h1>
                            <span className="text-xs font-medium">{moment(data.created_at).format("YYYY-MM-DD")}

                                <span className="ms-2">{moment(Date()).diff(moment(data.created_at), "minute") > 20 ? moment(data.created_at).format("HH:MM") :
                                    moment(data.created_at).fromNow()}</span>
                            </span>
                        </div>
                        <div className="grow"></div>
                        <StateChange data={data} afterChange={() => { }} readOnly={true} />
                        <ActionIcon variant="text">
                            <IoArrowForward className={"w-5 h-5 " + (lang == "ar" ? "rotate-180" : "")} />
                        </ActionIcon>
                    </div>
                    <div className="border-t dark:border-[#555] border-dashed"></div>
                    <div className="flex justify-between">
                        <span className="uppercase text-sm">{t.price_total}</span>
                        <Text className="mb-0.5 !text-sm font-semibold ">
                            {data.price_total} <small className="font-medium"><Currency /></small>
                        </Text>
                    </div>

                    <div className="flex justify-between">
                        <span className="uppercase text-sm">{t.benefit}</span>
                        <Badge
                            variant="flat"
                            color="success"
                            size="md"
                            className="flex items-center gap-1 whitespace-nowrap cursor-pointer"
                        >
                            <span className="font-bold">{data.benefit_drop_shipper}</span> <Currency />
                        </Badge>



                    </div>
                </div>
                <div className="flex justify-center items-center">
                 

                    {data.state == "En préparation" &&<Popover>
                        <Popover.Trigger>
                            <Button  color="danger" size="sm">
                                {t.cancel_order}
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content>
                            {({ setOpen: clos }) => (
                                <div className="w-56">
                                    <Text>{t.cancel_order_msg}</Text>
                                    <div className="flex justify-end gap-3 mb-1">
                                        <Button size="sm" variant="outline" onClick={() => clos(true)}>
                                            {tr.global.no}
                                        </Button>
                                        <Button size="sm" color="danger" onClick={() => {
                                            clos(true)
                                            cancelOrder()
                                        }}>
                                            {tr.global.yes}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Popover.Content>
                    </Popover>}
                </div>


            </div>
            <ButtomDrower open={open} onClose={() => setOpen(false)}  >
                <div className="p-4">
                    <div className="p-4 rounded-2xl  flex flex-col gap-1 " >
                        <div className="flex items-center justify-between">
                            <h1 className="text-base font-semibold "># {data.id}</h1>
                            <div className="grow"></div>
                            <StateChange data={data} afterChange={() => { }} readOnly={true} />

                        </div>
                        <div className="border-t dark:border-[#555] border-dashed"></div>
                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t.price_total}</span>
                            <Tooltip content={t.timeline} color="invert" placement="top">
                                <div>
                                    <TimeLine data={data} />
                                </div>
                            </Tooltip>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t.price_total}</span>
                            <Text className="mb-0.5 !text-sm font-semibold ">
                                {data.price_total} <small className="font-medium"><Currency /></small>
                            </Text>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t.benefit}</span>
                            <Badge
                                variant="flat"
                                color="success"
                                size="md"
                                className="flex items-center gap-1 whitespace-nowrap cursor-pointer"
                            >
                                <span className="font-bold">{data.benefit_drop_shipper}</span> <Currency />
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t.fullname}</span>
                            <span className="font-bold text-sm">{data.fullName ?? (data.firstname + " " + data.familyname)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t1.phone}</span>
                            <Badge
                                variant="flat"
                                color="info"
                                className="cursor-pointer flex whitespace-nowrap items-center"

                            >
                                <a href={"tel:" + data.contact_phone} className="flex items-center">
                                    <MdLocalPhone className="text-lg" />
                                    <div className="me-1"></div>
                                    <span className="whitespace-nowrap" dir="ltr">{formatPhoneNumber(data.contact_phone)}</span>
                                </a>

                                <div className="me-1"></div>
                                <MdContentCopy onClick={() => { CopyText(data.contact_phone); toast.success("Texte copié") }} className="text-lg" />
                            </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t1.wilaya}</span>
                            <span className="font-bold text-sm">{data.to_wilaya_name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t1.commune}</span>
                            <span className="font-bold text-sm">{data.to_commune_name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t1.tracking}</span>
                            {data.tracking ? <span onClick={() => { CopyText(data.tracking ?? ""); toast.success("Texte copié") }}>
                                <Badge
                                    variant="flat"
                                    color="success"
                                    size="md"
                                    className="flex items-center gap-1 whitespace-nowrap cursor-pointer"
                                >
                                    {data.tracking}
                                    <MdContentCopy />
                                </Badge>
                            </span> : <Badge
                                variant="flat"
                                className="whitespace-nowrap"
                                color="danger">
                                {t.not_exist}
                            </Badge>}
                        </div>
                        <div className="flex justify-between items-center">
                            <span className=" text-sm">{t.prods}</span>
                            <span>
                                {data.item.length} {data.item.length == 1 ? tr.order.item : tr.order.items}
                            </span>
                        </div>
                        <div>
                            {
                                data.item.map((el, k) => {
                                    return <div className="flex gap-2 relative my-1" key={k}>

                                        <div className={`bg-cover cursor-pointer bg-no-repeat bg-center w-14 h-14 min-w-[56px] rounded-md mt-2 sticky `}
                                            style={{ backgroundImage: "url('" + ApiConfig.rootUrl + "/" + el.product?.images[0] + "')" }}>
                                            <div className="w-5 h-5 text-[12px] font-medium rounded-full bg-primary text-white absolute bottom-[2px] right-[2px] flex items-center justify-center">
                                                {el.qte}
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full">
                                            <div className="flex w-full ">

                                                <h1 className="text-sm font-semibold  line-clamp-2">{el.name}</h1>
                                                <div className="grow ms-[4px]"></div>
                                                <h1 className="font-semibold whitespace-nowrap text-sm">
                                                    {(el.price_item * el.qte).toFixed(2)} <Currency />
                                                </h1>
                                            </div>
                                            <div className="text-[12px] ">
                                                <div className="flex gap-2">
                                                    <span>{tr.order.unit_price}</span>
                                                    <span className="font-semibold">{el.price_item.toFixed(2)} <Currency /></span>
                                                </div>
                                                {!!el.color ? <div className="flex gap-2">
                                                    <span>{tr.order.color} :</span>
                                                    <span className="font-semibold">{el.color}</span>
                                                </div> : ""}
                                                {!!el.size ? <div className="flex gap-2">
                                                    <span> {tr.order.size} :</span>
                                                    <span className="font-semibold">{el.size}</span>
                                                </div> : ""}
                                            </div>
                                            <div className="border my-2 border-gray-100 dark:border-gray-500"></div>

                                        </div>
                                    </div>
                                })
                            }
                        </div>

                    </div>
                </div>
            </ButtomDrower>
        </div>
    )
}
