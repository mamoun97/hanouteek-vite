import { ProductPageDefault } from "./ProductPageDefault";
import { ProductPageType1 } from "./ProductPageType1";
import { ProductPageType2 } from "./ProductPageType2";


type PropsType={
    data: ProductCart, 
    isUpdate?: boolean, 
    index?: number, 
    isSmall?: boolean, 
    onClose?: any 
}
export default function ProductPage({ data, isUpdate = false, index = -1, isSmall = false, onClose }:PropsType) {


    return <ProductPageDefault {...{ data, isUpdate, index, isSmall, onClose }}/>
    // return <ProductPageType1 {...{ data, isUpdate, index, isSmall, onClose }}/>
    // return <ProductPageType2 {...{ data, isUpdate, index, isSmall, onClose }}/>
}
