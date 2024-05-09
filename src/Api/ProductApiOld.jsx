import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";


const getAll = (limit,offset) => {
    return req.http.get("/tenant/product/all?page="+offset+"&limit="+limit+ApiConfig.db);
}
const getProductById = (id) => {
    return req.http.get("/tenant/product/findOneById/"+id+ApiConfig.dbq);
}
const getProductBySlug = (id) => {
    return req.http.get("/tenant/product/find-one-by-slug/"+id+ApiConfig.dbq);
}

const getAllCategories =  (limit,offset)  => {
    return req.http.get("/tenant/category?page="+offset+"&limit="+limit+ApiConfig.db);
    
}
const getAllCategorieById = (id) => {
    return req.http.get("/tenant/category/findOneById/"+id+ApiConfig.dbq);
}
const getProductByIdCategory = (id) => {
    return req.http.get("/tenant/product/category/"+id+""+ApiConfig.dbq);
}
const createOrder = (dt) => {
    return req.http.post("/tenant/order"+ApiConfig.dbq,dt);
}
const review = (dt) => {
    return req.http.post("/tenant/reviews"+ApiConfig.dbq,dt);
}
const getWilayas = () => {
    return req.http.get("/tenant/city-delivery?limit=58&page=1&"+ApiConfig.db);
}
const getCityDelivery = (id) => {
    return req.http.get("/tenant/city-delivery/"+id+""+ApiConfig.dbq);
}
const yalidinCenter = (name) => {
    return req.http.get("/yalidine-centers?wilaya_name="+name+ApiConfig.db);
}
const priceDel = (idcomm) => {
    return req.http.get("/tenant/city-delivery/pricing/"+idcomm+ApiConfig.dbq);
}


const getAllReviews = (id) => {
    return req.http.get("/tenant/reviews"+ApiConfig.dbq);
}
const sendEvent = (dt) => {
    return req.http.post("/tenant/facebook-pixel/events"+ApiConfig.dbq,dt);
}
const Abandoned = (dt) => {
    return req.http.post("/tenant/order-abandoned"+ApiConfig.dbq,dt);
}




const ProductApi = {
    getAll,getAllCategories,getAllCategorieById,getProductById,yalidinCenter,
    createOrder,getWilayas,review,getAllReviews,getProductByIdCategory,
    getCityDelivery,priceDel,sendEvent,Abandoned,getProductBySlug
};


export default ProductApi;