import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";
const getAllCategories = async (limit:number,offset:number,db?:string):Promise<CategoriesResponse> => {
    const {data}=await req.http.get("/tenant/category?page="+offset+"&limit="+limit+(db??ApiConfig.db));
    return data
}
const getAllCategoriesFilter = async (filter:string,db?:string):Promise<CategoriesResponse> => {
    const {data}=await req.http.get("/tenant/category?"+filter+(db??ApiConfig.db));
    return data
}
const CategorieApi={
    getAllCategories,getAllCategoriesFilter
}
export default CategorieApi
