
// import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import ProductSelect from "../components/ProductSelect";
import ProductApi from "../../Api/ProductApi";
import ProductPos from "../components/ProductPos";
import { ActionIcon, Button, Input, Tab } from "rizzui";
import { AiOutlinePlus } from "react-icons/ai";
import { useGetAllCategoriesService } from "../../Api/Services";
import CartItem2 from "../components/FormOrder/CartItem2";
import { initialDataOrder } from "../Const/initialData";
import OrderApi from "../../Api/OrderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import toast, { Toaster } from "react-hot-toast";
import alertError from "../../hoock/alertError";
import ProductPageModalPos from "../components/ProductPageModalPos";
import { MdOutlineCloudOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import useGlobal from "../../hoock/useGlobal";
import TabC from "../components/TabC";

type ProductsTotal = {
    data: Product[],
    total: number
}

export default function AddOrderPos() {
    const [openModal, setOpenModal] = useState(false)

    const user = useSelector<RootState>((state) => state.user) as UserAuth
    const [selectProduct, setSelectProduct] = useState<Product | null>(null)
    const [selectCateg, setSelectCateg] = useState<Category | null>(null)
    const [selectSubCateg, setSelectSubCateg] = useState<Category | null>(null)
    const globalAnd = useGlobal("&")
    const globalQue = useGlobal("?")
    const [dataOrder, setDataOrder] = useState<OrderFull>({
        ...initialDataOrder,
        to_commune_name: "oran",
        to_wilaya_name: "oran",
        firstname: "Boutique",
        fullName: "Boutique",
        familyname: "Boutique",
        contact_phone: "0" + parseInt(user.phoneNumber),
        soldFromTheStore: true,

    })
    const { data: categs, isLoading: loadingCategs } = useGetAllCategoriesService(50, 1, {}, globalAnd)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<ProductsTotal>({
        data: [],
        total: 0
    })
    const [cart, setCart] = useState<OrderFullItem[]>(
        []
    )
    const limit = 16
    const getData = () => {
        setLoading(true)
        ProductApi.getAllByFilter(`?limit=${limit}&page=${page}${selectCateg ? "&categoryId=" + selectCateg.id : ""}`, globalAnd).then(res => {
            setProducts({
                data: [...products.data, ...res.data],
                total: res.totalCount
            })

            setLoading(false)
        }).catch(_ => {
            setLoading(false)
        })
    }

    useEffect(() => {
        getData()
    }, [page, selectCateg])


    const getTotal = () => {
        let s = 0;
        for (let i = 0; i != cart.length; i++) {
            s += cart[i].price_total
        }
        return s
    }
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        createOrder()
    }
    const createOrder = () => {
        // console.log({
        //     ...dataOrder,
        //     item: cart,
        //     contact_phone: "+213" + parseInt(dataOrder.contact_phone),
        // })
        // return
        OrderApi.createOrderAssociate({
            ...dataOrder,
            item: cart,
            contact_phone: "+213" + parseInt(dataOrder.contact_phone),
        }, globalQue).then(_ => {
            toast.success("Ajoute avec succès")
            setOpenModal(false)
            setSelectProduct(null)
            setCart([])
            setLoading(false)
        }).catch(err => {
            setLoading(false)
            alertError(err)
        })
    }
    useEffect(() => {
        setOpenModal(true)
    }, [selectProduct])

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex gap-2 items-center">
                <Link to={"/dashboard"}>
                    <ActionIcon variant="flat" size="lg" className="text-lg">
                        <IoArrowBackOutline />
                    </ActionIcon>
                </Link>
                <h1 className="text-2xl font-semibold">Ajouter une commande</h1>
            </div>
            <div className="grid grid-cols-6 max-[910px]:grid-cols-2 gap-2">
                <div className="col-span-4 max-[1080px]:col-span-3 mt-2">

                    <ProductSelect setValue={setSelectProduct} isSearch={true} />
                    <div className="flex flex-col gap-1 py-1">
                        {
                            categs?.data && <TabC data={[
                                {
                                    name: "All",
                                    active: selectCateg == null,
                                    onClick: (_: any) => {
                                        setProducts({
                                            data: [],
                                            total: 0
                                        })
                                        setPage(1)
                                        setSelectCateg(null)
                                        setSelectSubCateg(null)
                                    }
                                },
                                ...categs.data.map(el => {
                                    return {
                                        name: el.name,
                                        active: selectCateg?.id == el.id || selectSubCateg?.id == el.id,
                                        onClick: (_: any) => {
                                            setProducts({
                                                data: [],
                                                total: 0
                                            })
                                            setPage(1)

                                            setSelectCateg(el)
                                            setSelectSubCateg(el)
                                        }
                                    }
                                })
                            ]} />
                        }

                        {
                            !!(selectSubCateg?.subcategories.length) && <TabC size="md" data={[

                                ...selectSubCateg.subcategories.map(el => {
                                    return {
                                        name: el.name,
                                        active: selectCateg?.id == el.id,
                                        onClick: (_: any) => {
                                            setProducts({
                                                data: [],
                                                total: 0
                                            })
                                            setPage(1)
                                            setSelectCateg(el)
                                        }
                                    }
                                })
                            ]} />
                        }
                    </div>



                    <div className="grid relative z-0 grid-cols-5 max-[1300px]:grid-cols-4 gap-6 max-sm:gap-2 mt-3 max-[1080px]:grid-cols-2 max-[960px]:grid-cols-2 max-sm:grid-cols-2 max-xs:grid-cols-1">
                        {!loading && products.data.length == 0 && <div className={`p-2     rounded-md flex flex-col justify-center items-center col-span-full `}
                        >
                            <MdOutlineCloudOff className="w-28 h-28 text-primary" />
                            <p className="text-lg font-medium  text-center line-clamp-2">
                                Il n'y a pas de produits
                            </p>

                        </div>}
                        {
                            products.data.map((el, k) => {
                                return <ProductPos data={el} key={k} showAddToCart={true} addToCart={(e: OrderFullItem) => {

                                    setCart([...cart, e])
                                }} />
                            })
                        }

                    </div>
                    <div className="mt-4">
                        {
                            (!loading && Math.ceil(products.total / limit) > page) && <div className="flex justify-center ">
                                <ActionIcon rounded="full" variant="outline" onClick={() => {
                                    if (!loading) {
                                        setPage(page + 1)
                                    }
                                }} className=" !h-12 !w-12" size="lg" color="primary">
                                    <AiOutlinePlus className="w-5 h-5" />
                                </ActionIcon>
                            </div>
                        }
                        {loading && <div className="flex justify-center">
                            <svg aria-hidden="true" role="status" className="inline w-16 h-16 me-3 text-primary animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </div>}
                    </div>
                </div>
                <div className="col-span-2 max-[1080px]:col-span-3 max-sm:col-span-2 ">
                    <div className="bg-gray-50 mt-[33px] rounded-md p-5 sticky top-3 border border-gray-200 dark:bg-[#222] dark:border-[#444]">
                        <h1 className="text-center  text-xl font-bold my-4">Cart</h1>
                        <div className="flex flex-col gap-2">
                            {
                                cart.map((el, k) => {
                                    return <CartItem2 data={{
                                        ...el

                                    }} index={k} {...{ cart, setCart }} />
                                })
                            }
                        </div>
                        <div className="flex mt-3 items-center">
                            <h1 className="text-sm font-medium">SubTotal</h1>
                            <div className="grow"></div>
                            <span className="font-semibold">{getTotal().toFixed(2)} DZD</span>
                        </div>

                        <div className="flex mt-3 items-center">
                            <h1 className="text-sm font-bold uppercase">Total</h1>
                            <div className="grow"></div>
                            <span className="font-semibold text-2xl">{
                                (getTotal()).toFixed(2)
                            } <small className="font-medium">DZD</small></span>
                        </div>
                        <div className="border-b border-dashed border-gray-300 my-3"></div>
                        <Input
                            label="Phone"
                            inputMode="tel"
                            name="phone"
                            autoComplete="off"
                            className=""
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

                        <Button className="mt-4 w-full" type="submit" isLoading={loading}>Ajouter</Button>


                    </div>
                </div>
            </div>
            <Toaster position="top-center" />

            {selectProduct && <ProductPageModalPos
                open={openModal}
                prod={{
                    qte: 1,
                    onClose: setOpenModal,
                    slug: selectProduct?.slugName ?? "",
                    addToCart: (e: OrderFullItem) => {

                        setCart([...cart, e])
                    }
                }} />}
        </form>
    )
}
