import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";


const getAll = async (filter:string, db?: string): Promise<OfferResponse> => {
    const { data } = await req.http.get("/tenant/offer"+filter + (db ?? ApiConfig.db));
    return data
}
const existing = async (dt: ExistingOfferPropsRequest, db?: string): Promise<ExistingOfferProps[]> => {
    const { data } = await req.http.post("/tenant/offer/existing" + (db ?? ApiConfig.dbq), dt);
    return data
}
const getById = async (id:string| number, db?: string): Promise<Offer> => {
    const { data } = await req.http.get("/tenant/offer/"+id + (db ?? ApiConfig.dbq));
    return data
}

const OfferApi = {
    getAll,
    existing,
    getById
}
export default OfferApi