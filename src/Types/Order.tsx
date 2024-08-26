type ItemProductOrder = {
    name: string,
    price_total: number,
    price_item: number,
    color: string,
    size: string,
    qte: number,
    cancelled: boolean,
    product: { id: number }
}
interface OrderForm {
    to_commune_name: string,
    to_wilaya_name: string,
    fullName: string,
    contact_phone: string,
    is_stopdesk: boolean,
    stopdesk_id: number,
    address?: string,
    nots: string,
}
interface Order extends OrderForm {
    price_items?: number,
    price_total: number,
    price_promo: number,
    price_delivery: number,
    address: string,
    firstname: string,
    familyname: string,
    email: string,
    weight: string,
    couponCode: string,
    width: number,
    height: number,
    length: number,
    do_insurance: false,
    freeshipping: false,
    has_exchange: boolean,
    CompareAtPrice: number,
    address_lat: number,
    address_lng: number,
    time_delivery: number,
    item: Array<ItemProductOrder>
}
interface PriceDeliveryResponce {
    center_id?: number,
    name?: string,
    address?: number,
    gps?: string,
    commune_id?: number,
    commune_name?: string,
    wilaya_id?: number,
    wilaya_name?: string,
    created_at?: string,
    updated_at?: string,
    priceDeliveryHome: number,
    priceDeliveryOffice?: number
}

interface AbandonedForm {
    firstname: string,
    lastName: string,
    fullName: string,
    to_commune_name: string,
    to_wilaya_name: string,
    address: string,
    familyname: string,
    email: string,
    contact_phone: string,
    items: string
}
type OrderFullItem = {
    id?: number,
    name: string,
    price_total: number,
    price_item: number,
    size: string,
    color: string,
    index?: string,
    qte: number,
    cancelled: false,
    CompareAtPrice?: number,
    created_at?: string,
    updated_at?: string,
    product?: ProductOrderAssociat,

}
type OrderFull = {
    id: number,
    price_items: number,
    price_total: number,
    price_promo: number,
    price_delivery: number,
    price_drop?:number,
    to_commune_name: string,
    tracking: string | null,
    platform: string | null,
    label: string | null,
    to_wilaya_name: string,
    firstname: string,
    familyname: string,
    price_exchange?: number,
    address?: string,
    fullName?: string,
    email?: string,
    weight?: string,
    width?: number,
    height?: number,
    length?: number,
    do_insurance?: boolean,
    freeshipping?: boolean,
    soldFromTheStore?: boolean,
    is_stopdesk?: boolean,
    ProductStock?: boolean,
    product_to_collect?: string | null,
    min_price_drop_shipper?:number,
    address_lat?: number,
    address_lng?: number,
    time_delivery?: number,
    date_finished?: string | null,
    currency?: string,
    CompareAtPrice?: number,
    contact_phone: string,
    stopdesk_id: number | null,
    duplicate: number,
    has_exchange: boolean,
    state: OrderState,
    subStatus?: OrderSubState,
    remark?: string,
    nots: string,
    date_delivery: null,
    created_at: string,
    updated_at: string,
    coupon: null,
    associate?: {
        firstName: string,
        lastName: string,
        phoneNumber: string,
        avatar: string
    },
    item: OrderFullItem[],
    states: StatesOrder[],

}
type OrderSubState = ("En attente de traitement" |
    "Accpte" |
    "annul" |
    "Inoignable");
type OrderState = (
    "pending" |
    "unresponsive" |
    "not Answered - 1st Attempt" |
    "not Answered - 2nd Attempt" |
    "not Answered - 3rd Attempt" |
    "confirmed" |
    "order preparation" |
    "prepared" |
    "processing" |
    "outForDelivery" |
    "En localisation" |
    "Vers Wilaya" |
    "Reçu à Wilaya" |
    "Centre" |
    "payed" |
    "ready" |
    "expédié" |
    "Transfert" |
    "En préparation" |
    "En attente du client" |
    "Sorti en livraison" |
    "En attente" |
    "En alerte" |
    "Tentative échouée" |
    "Livré" |
    "Echèc livraison" |
    "Retour vers centre" |
    "Retourné au centre" |
    "Retour transfert" |
    "Retour groupé" |
    "Retour à retirer" |
    "Retour vers vendeur" |
    "Retourné au vendeur" |
    "Echange échoué" |
    "delivered" |
    "returns" |
    "canceled");
type StatesOrder = {
    id: number,
    state: OrderState,
    comment: string | null,
    created_at: string
}
interface OrdersResponse extends ResponseAtt {

    data: OrderFull[]
}
type OrderOptionRequest = {
    limit: number,
    page: number,
    startDate?: string,
    endDate?: string,
    id?: string,
    product?: Product | null,
    state?: string | null,
    statuses?: string[] | null,
    subStatus?: string | null,
    to_wilaya_name?: string,
    duplicate?: boolean,
    contact_phone?: string
}
type UpdateStatePayload = {
    state: OrderState,
    platform: string,
    comment: string,
    password: string
}|{
    subStatus?: OrderSubState,
    remark?: string,
}
type StateItem = {
    label: string,
    value: OrderState,
    description: string
}




type ProductOrderAssociat = {
    images: string[],
    tags?: [],
    id: number,

    name?: string,
    sku?: null,
    barcode?: null,
    slugName?: string,
    description?: string,
    currency?: string,
    freeshipping?: true,
    state?: true,
    price?: 2400,
    priceTotal?: 0,
    CompareAtPrice?: 3900,
    originalPrice?: 1600,
    pricePromo?: 0,
    stock?: 279,
    sold_out?: 3604,
    discount?: 0,
    weight?: string,
    width?: 0,
    height?: 0,
    length?: 0,
    dimensions?: string,
    ProductColor?: string,
    ProductSize?: string,
    rating?: 5,
    showTitle?: true,
    showInPage?: true,
    underStock?: true,
    deliveryCostToTheOffice?: null,
    deliveryCostToTheHome?: null,
    showImages?: true,
    showPriceDiscount?: true,
    showPriceTotal?: true,
    showCountdown?: true,
    limitAlert?: 0,
    limitAlertOne?: 0,
    limitAlertTwo?: 0,
    sub_description?: string,
    note?: null,
    createdAt?: string,
    updatedAt?: string

}


type TrackingItem = {
    tracking: string,
    order_id: string,
    firstname: string,
    familyname: string,
    contact_phone: string,
    address: string,
    is_stopdesk: number,
    stopdesk_id: number,
    stopdesk_name: string,
    from_wilaya_id: number,
    from_wilaya_name: string,
    to_commune_name: string,
    to_wilaya_id: number,
    to_wilaya_name: string,
    product_list: string,
    price: number,
    do_insurance: number,
    declared_value: number,
    length: number,
    height: number,
    width: number,
    weight: number,
    delivery_fee: number,
    freeshipping: number,
    import_id: number,
    date_creation: string,
    date_expedition: string | null,
    date_last_status: string,
    last_status: OrderState,
    taxe_percentage: number,
    taxe_from: number,
    taxe_retour: number,
    parcel_type: string,
    parcel_sub_type: string | null,
    has_receipt: string | null,
    has_recouvrement: number,
    current_center_id: string | null,
    current_center_name: string | null,
    current_wilaya_id: string | null,
    current_wilaya_name: string | null,
    current_commune_id: string | null,
    current_commune_name: string | null,
    payment_status: string,
    payment_id: string | null,
    has_exchange: number,
    product_to_collect: string | null,
    economic: number,
    label: string,
    pin: string,
    qr_text: string,
    timeline: {
        id: number,
        state: OrderState,
        comment: string,
        created_at: string
    }[]
}
type TrackingResponse = OrderFull[]
type CreateOrderResponse = {
    message: string,
    otp: boolean,
    order: number,
    state: 1 | 2
}
type OtpModalOpen = {
    id: number,
    phone: string
}
type ExchangeInput = {
    id_order_exchange: number,
    iamge_exchange: string,
    note_exchange: string,
}
type OrderAbandoned = {
    id: number,
    to_commune_name: string,
    to_wilaya_name: string,
    address: string,
    fullName: string,
    firstname: string,
    duplicate: number,
    state: boolean,
    familyname: string,
    email: string,
    contact_phone: string,
    items: string,
    created_at: string,
    updated_at: string
}
interface OrderAbandonedResponse extends ResponseAtt {
    data: OrderAbandoned[]
}



