import { useEffect } from "react";
import { useGetProductBySlugService } from "../Api/Services"
import Loading from "../Constants/Loading";
import { ProductPage } from "../Pages/Product";
import Container from "./Container";
import IconButton from "./TailwindComponent/IconButton";
import { MdClear } from "react-icons/md";

export default function ProductModal({ data, onClose }: { data: Product, onClose: any }) {
    const { data: product, isLoading } = useGetProductBySlugService(data.slugName ?? "")
    const content = product && !isLoading ? <ProductPage data={{
        ...product,
        qte: 1,
        checkData: {
            color: null,
            size: null
        }
    }}
        onClose={onClose}
        isSmall={true} /> : ""
    useEffect(() => {
        document.body.style.height = "100vh"
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.height = "initial"
            document.body.style.overflow = "initial"
        }
    }, [])
    if (isLoading)
        return <Container className="mt-5 "> {Loading.productPage}</Container>;


    return <div className="fixed top-0 left-0 right-0 bottom-0 z-50  flex  justify-center p-3 max-sm:px-0 max-sm:pb-0">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#0005]" onClick={() => onClose(false)}></div>
        <div className="relative bg-white    max-sm:p-0 max-sm:animate-modalProd max-sm:rounded-t-lg overflow-hidden">
            <div className="overflow-auto max-h-full">
                <div className="flex justify-end ">
                    <IconButton onClick={() => {
                        onClose(false)
                    }} className="text-2xl">
                        <MdClear />
                    </IconButton>
                </div>
                {content}
            </div>

        </div>
    </div>
}
