import { ActionIcon, Checkbox, Input, Loader, Select, Textarea } from "rizzui";
import ProductSelect from "../../components/ProductSelect";
import { ProductOptions } from "../../components/FormOrder/ProductOptions";
import { useEffect, useState } from "react";
import { useGetWilayasService, useGetYalidineCenterService } from "../../../Api/Services";
import useSWR from "swr";
import ProductApi from "../../../Api/ProductApi";
import TableSimple from "../TableSimple";
import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import { RootState } from "../../../Store";
import { useSelector } from "react-redux";
import { GlobalS } from "../../../Store/globalSlice";
import useLang from "../../../hoock/useLang";
import Currency from "../../../Constants/Currency";

type FormProps = {
    cart: OrderFullItem[],
    setCart: any,
    dataOrder: OrderFull,
    setDataOrder: (x: OrderFull) => void,
    delivery: PriceDeliveryResponce | null,
    setDelivery: (e: PriceDeliveryResponce) => void
}

export default function Form({
    dataOrder,
    setDataOrder,
    cart,
    setCart,
    delivery,
    setDelivery
}: FormProps) {
    const { t, tr } = useLang()
    const global = useSelector<RootState>((state) => state.global) as GlobalS
    const user = useSelector<RootState>((state) => state.user) as UserAuth
    const [selectProduct, setSelectProduct] = useState<Product | null>(null)
    const [selectedWilaya, setSelectedWilaya] = useState<Wilaya | null>(null)
    const [selectedCommune, setSelectedCommune] = useState<Commune | null>(null)
    // const [delivery, setDelivery] = useState<PriceDeliveryResponce | null>(null)
    const { data: wilayas, isLoading: lodingWilaya, mutate: refrechWilaya } = useGetWilayasService({
        onSuccess: (res: WilayaResponse) => {
            if (res.data) {
                let find = res.data.find(el => el.name.toLocaleLowerCase() == dataOrder.to_wilaya_name.toLocaleLowerCase())
                setSelectedWilaya(find ?? null)
            }
        },
    }, global?.platform ? "&" + global.platform : undefined);
    const { data: yalidine } = useGetYalidineCenterService(selectedWilaya?.name ?? "", global?.platform ? "&" + global.platform : undefined);
    const { data: communes, isLoading: communeLoading, mutate: refrechCommunes } = useSWR(
        `/tenant/city-delivery/${selectedWilaya?.id ?? 0}`,
        () => ProductApi.getCityDelivery(selectedWilaya?.id ?? 0, global?.platform ? "?" + global.platform : undefined),
        {
            dedupingInterval: 500000,
            keepPreviousData: true,
            onSuccess: (res: CommuneResponse) => {
                if (res.communes) {
                    let find = res.communes.find(el => el.name.toLocaleLowerCase() == dataOrder.to_commune_name.toLocaleLowerCase())

                    setSelectedCommune(find ?? null)

                }
            },
        }
    )

    const getPriceDeliveryAdmin = (id: number) => {
        ProductApi.getPriceDeliveryAdmin(id, global?.platform ? "?" + global.platform : undefined).then(res => {
            setDelivery(res)
        }).catch(_ => {

        })
    }
    useEffect(() => {
        refrechWilaya()
        refrechCommunes()
    }, [])
    useEffect(() => {
        if (selectedCommune)
            getPriceDeliveryAdmin(selectedCommune.id)
    }, [selectedCommune])

    return (
        <div className="flex gap-2 flex-col">
            {user.role != "vendor" && <Card title="Select Product">
                <ProductSelect setValue={setSelectProduct} />
                {
                    selectProduct && <div key={selectProduct.slugName}>
                        <ProductOptions
                            setValue={(e: any) => {
                                setCart([...cart, e])
                                setSelectProduct(null)
                            }}
                            data={{
                                ...selectProduct,
                                qte: 1,
                                checkData: {
                                    color: null,
                                    size: null
                                }
                            }} />
                    </div>
                }
            </Card>}


            <Card title={tr.order.buyer_info}>
                <div className="grid-cols-6 grid gap-2">
                    <Input
                        label={tr.order.first_name}
                        placeholder={tr.order.first_name}
                        name="prenom"
                        className="col-span-3 max-sm:col-span-6"
                        value={dataOrder.firstname ?? ""}

                        onChange={(e) => {
                            setDataOrder({
                                ...dataOrder,
                                firstname: e.target.value
                            })
                        }}
                    />
                    <Input
                        label={tr.order.last_name}
                        placeholder={tr.order.last_name}
                        name="nom"
                        className="col-span-3 max-sm:col-span-6"
                        value={dataOrder.familyname ?? ""}
                        onChange={(e) => {
                            setDataOrder({
                                ...dataOrder,
                                familyname: e.target.value
                            })
                        }}
                    />
                    <Input
                        label={t.email}
                        autoComplete="off"
                        placeholder={t.email}
                        inputMode="email"
                        className="col-span-2 max-sm:col-span-6"
                        value={dataOrder.email ?? ""}
                        onChange={(e) => {
                            setDataOrder({
                                ...dataOrder,
                                email: e.target.value
                            })
                        }}
                    />
                    <Input
                        label={t.address}
                        placeholder={t.address}
                        name="addressss"
                        className="col-span-2 max-sm:col-span-6"
                        value={dataOrder.address ?? ""}
                        onChange={(e) => {
                            setDataOrder({
                                ...dataOrder,
                                address: e.target.value
                            })
                        }}
                    />
                    <Input
                        label={t.phone}
                        placeholder={t.phone}
                        inputMode="tel"
                        name="phone"
                        autoComplete="off"
                        className="col-span-2 max-sm:col-span-6"
                        value={dataOrder.contact_phone}
                        onChange={(e) => {
                            if ((!/^[0-9]{0,10}$/.test(e.target.value))) {
                                return
                            }
                            else
                                setDataOrder({
                                    ...dataOrder,
                                    contact_phone: e.target.value
                                })
                        }}
                    />
                    <Select
                        label={t.wilaya}
                        placeholder={"- "+t.wilaya+" -"}
                        className="col-span-3 max-sm:col-span-6"
                        options={wilayas?.data?.map(el => { return { item: el, label: el.id + " - " + el.name, value: el.name } }) ?? []}
                        value={selectedWilaya ? {
                            item: selectedWilaya,
                            label: selectedWilaya.id + " - " + selectedWilaya.name,
                            value: selectedWilaya.name
                        } : null}
                        onChange={(e: any) => {
                            setSelectedWilaya(e.item)
                            setSelectedCommune(null)
                            setDataOrder({
                                ...dataOrder,
                                to_wilaya_name: e.value
                            })
                        }}

                        {...lodingWilaya ? { suffix: <Loader /> } : {}}

                    />
                    <Select
                        label={t.commune}
                        placeholder={"- "+t.commune+" -"}
                        className="col-span-3 max-sm:col-span-6"
                        options={communes?.communes?.map(el => { return { item: el, label: el.name, value: el.name } }) ?? []}
                        value={selectedCommune ? {
                            item: selectedCommune,
                            label: selectedCommune.name,
                            value: selectedCommune.name
                        } : null}
                        onChange={(e: any) => {
                            setSelectedCommune(e.item)
                            setDataOrder({
                                ...dataOrder,
                                to_commune_name: e.value
                            })
                        }}
                        {...communeLoading ? { suffix: <Loader /> } : {}}
                    />
                </div>
            </Card>
            {selectedCommune && <Card title={t.delivery_mode}>
                <div className="mt-4 col-span-full">

                    {
                        delivery && <div>
                            <div className="flex items-center  p-3 mb-1 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer"
                                onClick={() => setDataOrder({ ...dataOrder, is_stopdesk: false })}>
                                <Checkbox label="" checked={!dataOrder.is_stopdesk} />
                                <div className="me-2"></div>
                                {t.home_delivery}
                                <div className="grow"></div>
                                <div className="flex items-center font-semibold text-sm   whitespace-nowrap">

                                    {delivery.priceDeliveryHome}
                                    <div className="me-2"></div>
                                    <small><Currency /></small>
                                </div>
                            </div>
                            {delivery.priceDeliveryOffice && <div className="flex items-center p-3 hover:bg-gray-100 dark:hover:bg-[#333] cursor-pointer"
                                onClick={() => setDataOrder({ ...dataOrder, is_stopdesk: true })}>
                                <Checkbox label="" checked={dataOrder.is_stopdesk} />
                                <div className="me-2"></div>
                                {tr.order.office_del}
                                <div className="grow"></div>
                                <div className="flex items-center font-semibold text-sm   whitespace-nowrap">

                                    {delivery.priceDeliveryOffice}
                                    <div className="me-2"></div>
                                    <small><Currency /></small>
                                </div>
                            </div>}
                        </div>
                    }
                </div></Card>}
            {dataOrder.is_stopdesk && ((!!yalidine && !!!selectedCommune) || (!!yalidine && !!selectedCommune && !!delivery?.priceDeliveryOffice)) &&
                <Card title={tr.order.office_dispo}> <div className="col-span-full mt-4">
                    <TableSimple
                        thead={<>
                            <tr>
                                <th scope="col" className="px-3 py-3">

                                </th>

                                <th scope="col" className="px-3 py-3">
                                    {t.commune}
                                </th>
                                <th scope="col" className="px-3 py-3">

                                    {t.address}
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    {tr.order.location}
                                </th>
                                <th scope="col" className="px-3 py-3">
                                    {tr.order.price}
                                </th>
                            </tr>
                        </>}
                        tbody={<>
                            {
                                yalidine.map((el, k) => {
                                    return <tr key={k} className="bg-transparent border-b  dark:border-muted">
                                        <th className="px-3 py-0">
                                            <Checkbox label="" checked={el.center_id == dataOrder.stopdesk_id} onChange={() => setDataOrder({
                                                ...dataOrder,
                                                stopdesk_id: el.center_id
                                            })} />
                                        </th>
                                        <th scope="row" className="px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {el.commune_name}
                                        </th>
                                        <td className="px-3 py-4">
                                            <span className="text-sm font-semibold">{el.name}</span>
                                            <br />
                                            <small> {el.address}</small>
                                        </td>
                                        <td className="px-3 py-4 flex justify-center">
                                            <Link to={"https://www.google.com/maps?q=" + el.gps} target="_blank">
                                                <ActionIcon variant="outline">
                                                    <GrLocation className="w-5 h-5" />
                                                </ActionIcon>
                                            </Link>
                                        </td>
                                        <td className="px-3 py-4 font-semibold text-sm   whitespace-nowrap">
                                            {/* {selectedWilaya?.deliveryCostToTheOffice}  */}
                                            {delivery?.priceDeliveryOffice}
                                            <small>DZD</small>
                                        </td>
                                    </tr>
                                })
                            }
                            {
                                yalidine.length == 0 && <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                                    <th className="px-3 py-8 " colSpan={5}>
                                        <div className="flex justify-center items-center flex-col">
                                            <span className="text-lg">No stopdesk dispo</span>
                                        </div>

                                    </th>
                                </tr>
                            }
                        </>}
                    />

                </div>
                </Card>}

            {user.role != "vendor" && <Card title="Shipping">
                <div className="flex flex-col gap-2">
                    <Checkbox
                        label="Vendu depuis le magasin"
                        checked={dataOrder.soldFromTheStore ?? false}
                        onChange={() => {
                            setDataOrder({
                                ...dataOrder,
                                soldFromTheStore: !(dataOrder.soldFromTheStore ?? false)
                            })
                        }}
                    />
                    <Checkbox
                        label="Insurance"
                        checked={dataOrder.do_insurance ?? false}
                        onChange={() => {
                            setDataOrder({
                                ...dataOrder,
                                do_insurance: !(dataOrder.do_insurance ?? false)
                            })
                        }}
                    />
                    <Checkbox
                        label="Free shipping"
                        checked={dataOrder.freeshipping ?? false}
                        onChange={() => {
                            setDataOrder({
                                ...dataOrder,
                                freeshipping: !(dataOrder.freeshipping ?? false)
                            })
                        }}
                    />
                    <Checkbox
                        label="Exchange"
                        checked={dataOrder.has_exchange ?? false}
                        onChange={(_) => {
                            setDataOrder({
                                ...dataOrder,
                                has_exchange: !(dataOrder.has_exchange ?? false)
                            })
                        }}
                    />
                </div>
            </Card>}
            <Card title={tr.order.note}>
                <Textarea
                    label={tr.order.note}
                    value={dataOrder.nots}
                    onChange={(e) => {
                        setDataOrder({
                            ...dataOrder,
                            nots: e.target.value
                        })
                    }}
                />
            </Card>
        </div>
    )
}
function Card({ title, children }: { title: string, children: any }) {
    return <div className="p-6 max-sm:p-3   py-6 rounded-lg  bg-card">
        <h1 className="mb-4 font-semibold text-lg">{title}</h1>
        {children}
    </div>
}