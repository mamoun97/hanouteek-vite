import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";
import { loadData } from "../Store/localStorage";


const getAll = async (param: string, db?: string): Promise<OrdersResponse> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/order/associate" + param + (db ?? ApiConfig.db));
    return data
}
const orderAbandoned = async (param: string, db?: string): Promise<OrderAbandonedResponse> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/order-abandoned" + param + (db ?? ApiConfig.db));
    return data
}
const orderAbandonedEdit = async (dt: OrderAbandoned, db?: string): Promise<OrderAbandonedResponse> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").put("/tenant/order-abandoned/associate/" + dt.id + (db ?? ApiConfig.dbq), dt);
    return data
}
const orderAbandonedDelete = async (id: number, db?: string): Promise<OrderAbandonedResponse> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").delete("/tenant/order-abandoned/associate/" + id + (db ?? ApiConfig.dbq));
    return data
}
const priceTotal = async (filter: string, db?: string): Promise<number> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/order/associate/price-total" + filter + (db ?? ApiConfig.db));
    return data
}
const statistics = async (filter: string, db?: string): Promise<StatisticOrder[]> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/statistics/days" + filter + (db ?? ApiConfig.db));
    return data
}
const getById = async (id: number, db?: string): Promise<OrderFull> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "")
        .get("/tenant/order/associate/" + id + (db ?? ApiConfig.dbq));
    return data
}
const updateState = async (id: number, payload: UpdateStatePayload, db?: string): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").put("/tenant/order/associate/update-state/" + id + (db ?? ApiConfig.dbq), payload);
    return data
}
const updateOrder = async (order: OrderFull, db?: string): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").put("/tenant/order/associate/" + order.id + (db ?? ApiConfig.dbq), order);
    return data
}
const createOrder = async (order: OrderFull, db?: string): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").post("/tenant/order" + (db ?? ApiConfig.dbq), order);

    return data
}
const createOrderDrop = async (order: OrderFull, db?: string): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").post("/tenant/order/drop-shipper" + (db ?? ApiConfig.dbq), order);

    return data
}
const createOrderAssociate = async (order: OrderFull, db?: string): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").post("/tenant/order/create" + (db ?? ApiConfig.dbq), order);

    return data
}
const createOrderPos = async (order: OrderFull, db?: string): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").post("/tenant/order" + (db ?? ApiConfig.dbq), order);

    return data
}

const tracking = async (dt: { phone: string }, db?: string): Promise<TrackingResponse> => {

    const { data } = await req.httpAuth("").post("/tenant/order/phone-tracking" + (db ?? ApiConfig.dbq), dt);
    return data
}
const confirmOtp = async (otp: string, db?: string): Promise<TrackingResponse> => {

    const { data } = await req.httpAuth("").get("/tenant/order/confirmed-otp?otp=" + otp + (db ?? ApiConfig.db));
    return data
}
const sendOtp = async (id_order: number, db?: string): Promise<{ otp_time: number }> => {

    const { data } = await req.httpAuth("").get("/tenant/order/sendotp/" + id_order + (db ?? ApiConfig.dbq));
    return data
}
const exchange = async (dt: ExchangeInput, db?: string): Promise<any> => {

    const { data } = await req.http.post("/tenant/order/exchange/" + (db ?? ApiConfig.dbq), dt);
    return data
}


const OrderApi = {
    getAll, updateState, getById,
    updateOrder, tracking,
    confirmOtp, createOrder,
    sendOtp, createOrderPos,
    priceTotal, exchange,
    createOrderAssociate,
    orderAbandoned,
    orderAbandonedEdit,
    orderAbandonedDelete,
    createOrderDrop,
    statistics
}
export default OrderApi