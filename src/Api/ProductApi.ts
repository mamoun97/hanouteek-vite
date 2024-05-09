import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";
import { loadData } from "../Store/localStorage";


const getAll = async (limit:number,offset:number,db?:string):Promise<ProductsResponse> => {
    const {data}=await req.http.get("/tenant/product/all?page="+offset+"&limit="+limit+(db??ApiConfig.db));
    return data
}
const getAllByFilter = async (filter:string,db?:string):Promise<ProductsResponse> => {
    const {data}=await req.http.get("/tenant/product/all"+filter+(db??ApiConfig.db));
    return data
}
const getAllByName = async (name:string,db?:string):Promise<ProductsResponse> => {
    const {data}=await req.http.get("/tenant/product?limit=10&page=1&name="+name+(db??ApiConfig.db));
    return data
}

const getAllByNameAssociate = async (name:string,db?:string):Promise<ProductsResponse> => {
     const user:UserAuth|null = loadData("user") 
    const {data}=await req.httpAuth(user?.token??"").get("/tenant/product/associate?limit=10&page=1&name="+name+(db??ApiConfig.db));
    return data
}
const getProductBySlug =async (slug:string,db?:string):Promise<Product>  => {
    const {data}=await req.http.get("/tenant/product/find-one-by-slug/"+slug+(db??ApiConfig.dbq));
    return data
}
const getWilayas =async (db?:string):Promise<WilayaResponse> => {
    const {data}=await req.http.get("/tenant/city-delivery?limit=58&page=1&"+(db??ApiConfig.db));
    return data
}
const getCityDelivery =async (id:number,db?:string):Promise<CommuneResponse>  => {
    
    const {data}=await req.http.get("/tenant/city-delivery/"+id+""+(db??ApiConfig.dbq));
    return data;
}
const getYalidineCenter =async (name:string,db?:string):Promise<YalidineCenter[]>  => {
    
    const {data}=await req.http.get("/yalidine-centers?wilaya_name="+name+(db??ApiConfig.db));
    return data;
}
const getPriceDelivery =async (idcomm:number,db?:string):Promise<PriceDeliveryResponce>=> {
    const {data}=await req.http.get("/tenant/city-delivery/pricing/"+idcomm+(db??ApiConfig.dbq));
    return data
}
const getPriceDeliveryAdmin =async (idcomm:number,db?:string):Promise<PriceDeliveryResponce>=> {
    const {data}=await req.http.get("/tenant/city-delivery/pricing-admin/"+idcomm+(db??ApiConfig.dbq));
    return data
}
const sendEvent = (dt:PixelOpject,db?:string) => {
    return req.http.post("/tenant/facebook-pixel/events"+(db??ApiConfig.dbq),dt);
}
const getProductByIdCategory = async(id:number,db?:string):Promise<CategoriesResponseProducts> => {
    const {data}=await req.http.get("/tenant/product/category/"+id+""+(db??ApiConfig.dbq));
    return data;
}
const getAllCategories =  async(limit:number,offset:number,db?:string):Promise<CategoriesResponse>  => {
    const {data}=await req.http.get("/tenant/category?page="+offset+"&limit="+limit+(db??ApiConfig.db));
    return data
}
const createOrder = async(dt:Order,db?:string):Promise<any> => {
    const {data}=await req.http.post("/tenant/order"+(db??ApiConfig.dbq),dt);
    return data
}

const Abandoned = async(dt:AbandonedForm,db?:string):Promise<any> => {
    const {data}=await  req.http.post("/tenant/order-abandoned"+(db??ApiConfig.dbq),dt);
    return data
}
const getAllReviews = async(filter:string,db?:string):Promise<ReviewResponse> => {
    const {data}= await req.http.get("/tenant/reviews"+filter+(db??ApiConfig.db));
    return data
}
const createReview=(r:Review,db?:string)=>{
    return req.http.post("/tenant/reviews"+(db??ApiConfig.dbq),r);
}

const ProductApi={
    getAll,getProductBySlug,getWilayas,getCityDelivery,getPriceDelivery,sendEvent,
    getProductByIdCategory,getAllCategories,createOrder,Abandoned,getAllByName,
    getYalidineCenter,getAllByNameAssociate,
    getAllByFilter,getAllReviews,
    getPriceDeliveryAdmin,createReview
}
export default ProductApi