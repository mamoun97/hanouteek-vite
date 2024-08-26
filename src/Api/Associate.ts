import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";
import { loadData } from "../Store/localStorage";

type statisticsResponse = {
    state: OrderState,
    count: number
}[]
const statistics = async (dt: { startDate: string, endDate: string }, db?: string): Promise<statisticsResponse> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get(`/tenant/statistics/all?startDate=${dt.startDate}&endDate=${dt.endDate}` + (db ?? ApiConfig.db));
    return data
}

const addAssociate = async (dt: Associate, db?: string): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").post("/tenant/associate/create" + (db ?? ApiConfig.dbq), dt);
    return data
}
const updateAssociate = async (dt: Associate, db?: string): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").put("/tenant/associate/update/" + dt.id + (db ?? ApiConfig.dbq), dt);
    return data
}

const getAll = async (filter: string, db?: string): Promise<AssociateResponse> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/associate/all" + filter + (db ?? ApiConfig.db));
    return data
}





const AssociateApi = {
    statistics,
    addAssociate,
    updateAssociate,getAll
}
export default AssociateApi