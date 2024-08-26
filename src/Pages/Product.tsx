import { useParams } from "react-router-dom";
import Container from "../Views/Container";
import { useGetProductBySlugService } from "../Api/Services";

import {  RootState } from "../Store";
import {  useSelector } from "react-redux";
import { Cart } from "../Store/cartSlice";
import Loading from "../Constants/Loading";
import { ThemeSetting } from "../Types/ThemeSetting";
import ProductResturant from "./ProductResturant";
import ProductPage from "../Views/ProductPage";

export default function Product() {
    const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
    if (theme.theme.templateType == "restaurant")
        return <ProductResturant />;
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
            size: null
        }
    }} /> : ""

    if (isLoading || !param.slug)
        return <Container className="mt-5 "> {Loading.productPage}</Container>;

    return <div key={param.slug}>{content}</div>
}
