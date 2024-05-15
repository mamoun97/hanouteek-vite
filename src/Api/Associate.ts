import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";
import { loadData } from "../Store/localStorage";

type statisticsResponse={
    state: OrderState,
    count:number
}[]
const statistics = async (dt:{startDate:string,endDate:string},db?:string):Promise<statisticsResponse> => {
    const user:UserAuth|null = loadData("user") 
    const {data}=await req.httpAuth(user?.token??"").get(`/tenant/statistics/all?startDate=${dt.startDate}&endDate=${dt.endDate}`+(db??ApiConfig.db));
    return data
}



const AssociateApi={
    statistics
}
export default AssociateApi