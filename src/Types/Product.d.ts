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
        stock: number,
        discount: number,
        ProductColor: string,
        ProductSize: string,
        hasOffer: boolean,
        priceOffer: number | null,
        minNumberQteOffer: number | null,
        sub_description: string,
        category: {
            name: string
        },
        Reviews: Array<any>,
        related: any,
        attribute: Attribute,
        addons: Addon[]
        deliveryCostToTheHome: number | null,
        deliveryCostToTheOffice: number | null,
        specificPriceDelivery: boolean,
        originalPrice?: number
    }

    type ProductsResponse = {
        page: number,
        limit: number,
        totalCount: number,
        hasMore: number,
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
    interface ReviewResponse {
        page: number,
        limit: number,
        totalCount: number,
        data: ReviewFull[],
        hasMore: boolean
    }
}

