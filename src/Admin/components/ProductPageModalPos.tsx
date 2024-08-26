
// import { useGetProductBySlugService } from "../../Api/Services";
import { Loader, Modal } from "rizzui";
import { ProductOptions } from "./FormOrder/ProductOptions";
import Currency from "../../Constants/Currency";
import useGlobal from "../../hoock/useGlobal";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { useEffect, useState } from "react";
import ProductApi from "../../Api/ProductApi";
import alertError from "../../hoock/alertError";

type ProductModalProps = {
    slug: string,
    qte: number,
    addToCart: (e: OrderFullItem) => void,
    onClose: (e: boolean) => void
}
type CartProps = {

    prod: ProductModalProps,
    open: boolean
}
function ProductPageRequest({ prod }: { prod: ProductModalProps }) {
    const global = useGlobal("?")
    const user = useSelector<RootState>((state) => state.user) as UserAuth
    const [product, setProduct] = useState<Product>()
    const [loading, setLoading] = useState(false)
    const getData = () => {
        setLoading(true)
        ProductApi.getProductBySlug(prod.slug, global).then(res => {
            setProduct({
                ...res,
                ...user.role=="vendor"?{
                    price:res.drop_price??res.price
                }:{}
            })
            setLoading(false)
        }).catch(err => {
            alertError(err)
            setLoading(false)
        })
    }
    useEffect(() => {
        getData()
    }, [])

    if (loading)
        return <div className="mt-5 flex items-center justify-center ">
            <Loader className="w-16 h-16" size="lg" color="warning" />
        </div>;

    return <div key={prod.slug} className="">
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-lg font-bold text-center">
                {product?.name ?? "FFFF"}
            </h1>
            <p className=" text-center">
                {user.role == "vendor" ? product?.drop_price ?? product?.price : product?.price} <Currency />
            </p>
        </div>
        {product && <ProductOptions
            key={product.slugName}
            setValue={(e: any) => {
                prod.addToCart(e)
                prod.onClose(false)
            }}
            data={{
                ...product,
                qte: 1,
                checkData: {
                    color: null,
                    size: null
                }
            }} />}
    </div>
}

export default function ProductPageModalPos({ prod, open }: CartProps) {

    return (
        <>
            <Modal isOpen={open} onClose={() => prod.onClose(false)} containerClassName="dark:bg-[#222]" >
                <div className="max-w-5xl  px-3 py-5 ">
                    <ProductPageRequest prod={prod} />
                </div>
            </Modal>



        </>
    )
}
