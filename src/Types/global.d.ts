interface ResponseAtt {
    page: number
    limit: number
    totalCount: number
    hasMore: boolean
}

type OptionsFilter = {
    limit: number,
    page: number,
    categoryId: number | null,
    minPrice: number | null,
    maxPrice: number | null,
    willaya?:string|null,
    name?:string|null
    ,
}

type SubFormProps = {
    data: ProductFull,
    setData: (e: ProductFull) => void,
    footer?: any
}

type ProductFormErrors = [
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
    boolean,
]


interface Associate {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    role: string,
    avatar: string,
    active: boolean,
}
interface AssociateFull extends Associate {

    socketId?: null,
    isOnline: boolean,
    created_at: string,
    updated_at: string
}
interface AssociateResponse extends ResponseAtt {

    data: Array<AssociateFull>
}
type AssociateOptionRequest = {
    limit: number,
    page: number,
}

type OrderProsType = "default" | "failed" | "return"



interface JoomlaUser {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password?: string,
    wilaya: string,
    commune: string,
    avatar: string,
}
interface JoomlaUserFull extends JoomlaUser {
    id: number,
    role: string,
    socketId: string | null,
    active: boolean,
    isOnline: boolean,
    created_at: string,
    updated_at: string
}


interface JoomlaClient {
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    password?: string,
    avatar: string,
    address: string,
    zipCode: string
}



interface JoomlaClientFull extends JoomlaClient {
    id: number,
    active: boolean,
    isOnline: boolean,
    created_at: string,
    updated_at: string,
    commune: null,
    willaya: null,
    orders: 1,
    isActive: false,
}


interface AssociateUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    role: string,
    password:string,
    avatar: string
}

interface Supplier{
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    wilaya: string,
    commune: string,
    avatar: string,
    role: strung,
    active: true,
    socketId: string|null,
    isOnline: boolean,
    created_at: string,
    updated_at: string,
    Products: Product[]
}
interface SupplierResponse{
    page: number,
    limit: number,
    totalCount: number,
    data: Supplier[],
    hasMore: boolean
}