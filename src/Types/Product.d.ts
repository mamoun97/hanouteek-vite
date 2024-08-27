import { ValueType } from "recharts/types/component/DefaultTooltipContent"
declare global {
    type Size = {
        id: number,
        value: string,
        stock: number,
        price: number,
        underStock: boolean,
    }
    type Color = {
        id: number,
        value: string,
        sku: string,
        price: number | null,
        image: string,
        stock: number,
        underStock: boolean,
        sizes: Array<Size>
    }

    type Attribute = {
        id: number,
        name: string,
        optionsName: string,
        options: Array<Color>
    }
    type AddonSub = {
        id: number,
        value: string,
        price: number,
        image: string,
        autoSelected: boolean
    }
    type AddonSubQte = AddonSub & { qte: number }
    type Addon = {
        id: number,
        value: string,
        image: string | null,
        items: AddonSub[]
    }
    interface Product {
        images: Array<string>,
        tags: Array<string>,
        id: number,
        name: string,
        slugName: string,
        description: string,
        currency: string,
        freeshipping: boolean,
        state: boolean,
        price: number,
        CompareAtPrice: number,
        pricePromo: number,
        drop_price?:number,
        is_drop_shipping:boolean,
        min_selling_drop_price?:number,
        stock: number,
        discount: number,
        ProductColor: string,
        ProductSize: string,
        hasOffer: boolean,
        priceOffer: number | null,
        minNumberQteOffer: number | null,
        sub_description: string,
        category: {
            id:number,
            name: string
        },
        Reviews: Array<any>,
        related: any,
        attribute: Attribute,
        addons: Addon[]
        deliveryCostToTheHome: number | null,
        deliveryCostToTheOffice: number | null,
        specificPriceDelivery: boolean,
        originalPrice: number,
        oldPrice?: number
    }
    interface ProductFull extends Product {
        range: null | string,
        stage: null | string,
        position: null | string,
        sold_out: number,
        weight: string,
        width: number,
        height: number,
        length: number,
        underStock: true,
        limitAlert: number,
        limitAlertOne: number,
        limitAlertTwo: number,
        note: null | string,
        supplier: null,
        meta: null,
        deliveryPrices: {
            id:number,
            deliveryCostToTheHome:number,
            deliveryCostToTheOffice:number,
            city:{
                id:number,
                name:string
            }
        }[],
        historic: [],
        box: null,
        RelatedProducts?: number[],
        showTitle: boolean,
        showInPage: boolean,
        showImages: boolean,
        showPriceDiscount: boolean,
        showPriceTotal: boolean,
        showCountdown: boolean,
    }

    interface ProductsResponse extends ResponseAtt {

        data: Array<Product>
    }

    interface ProductCart extends Product {
        qte: number,
        checkData: {
            color: Color | null,
            size: Size | null,
            addon?: AddonSubQte[]
        },

    }


    interface Review {
        firstName: string,
        lastName: string,
        email: string,
        image: string,
        Rating: number,
        description: string,
        product: {
            id: number,
            images?: string[],
            tags?: string[],
            name?: string
        }

    }
    interface ReviewFull extends Review {
        id: number,
        created_at: string,
        updated_at: string,

    }
    interface ReviewResponse extends ResponseAtt {
        data: ReviewFull[],
    }
    type Offer = {
        id: number,
        name: string,
        slug: string | null,
        state: boolean,
        price: number,
        description: string,
        created_at: string,
        updated_at: string,
        offerItems: {
            id: number,
            price: number,
            product: Product
        }[]
    }
    interface OfferResponse extends ResponseAtt {
        data: Offer[],
    }

    type ExistingOfferProps = {
        price_total: number,
        price_item: number,
        qte: number,
        color: string,
        size: string,
        product: {
            id: number
        }
    }
    type ExistingOfferPropsRequest = {
        data: ExistingOfferProps[]
    }
    type ProductOptionRequest = {
        limit: number,
        page: number,
        sort: string,
        categoryId?: number,
        state?: boolean,
        trash?: true,
    }
}







