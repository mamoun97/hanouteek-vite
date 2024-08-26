type RoleAssociate = "associate_admin" |
    "associate" |
    "order_creator" |
    "pos" |
    "associate_sav" |
    "associate_stock" |
    "vendor";
interface UserAuth {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    role: RoleAssociate,
    avatar: string,
    active: boolean,
    socketId: string | null,
    isOnline: boolean,
    created_at: string,
    updated_at: string,
    token: string,
    md5?: string
}
interface ClientAuth {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    orders: number,
    avatar: string,
    commune: string,
    willaya: string,

    isOnline: boolean,
    created_at: string,
    updated_at: string,
    token: string,
}
