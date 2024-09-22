import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";
import { loadData } from "../Store/localStorage";

interface ProductPayload extends Omit<ProductFull, 'category'> {
    category: number;
}

const getAll = async (limit: number, offset: number, db?: string): Promise<ProductsResponse> => {
    const { data } = await req.http.get("/tenant/product/all?page=" + offset + "&limit=" + limit + (db ?? ApiConfig.db));
    return data
}
const getAllByFilter = async (filter: string, db?: string): Promise<ProductsResponse> => {
    const { data } = await req.http.get("/tenant/product/all" + filter + (db ?? ApiConfig.db));
    return data
}
const getAllByFilterAssociate = async (filter: string, db?: string): Promise<ProductsResponse> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/product/associate" + filter + (db ?? ApiConfig.db));
    return data
}
const getAllByName = async (name: string, db?: string): Promise<ProductsResponse> => {
    const { data } = await req.http.get("/tenant/product?limit=10&page=1&name=" + name + (db ?? ApiConfig.db));
    return data
}

const getAllByNameAssociate = async (name: string, db?: string): Promise<ProductsResponse> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/product/associate?limit=10&page=1&name=" + name + (db ?? ApiConfig.db));
    return data
}
const getProductBySlug = async (slug: string, db?: string): Promise<Product> => {
    const { data } = await req.http.get("/tenant/product/find-one-by-slug/" + slug + (db ?? ApiConfig.dbq));
    return data
}
const getWilayas = async (db?: string): Promise<WilayaResponse> => {
    const { data } = await req.http.get("/tenant/city-delivery?limit=58&page=1&" + (db ?? ApiConfig.db));
    return data
}
const getCityDelivery = async (id: number, db?: string): Promise<CommuneResponse> => {

    const { data } = await req.http.get("/tenant/city-delivery/" + id + "" + (db ?? ApiConfig.dbq));
    return data;
}
const getYalidineCenter = async (name: string, db?: string): Promise<YalidineCenter[]> => {

    const { data } = await req.http.get("/yalidine-centers?wilaya_name=" + name + (db ?? ApiConfig.db));
    return data;
}
const getPriceDelivery = async (idcomm: number, db?: string, prods?: number[]): Promise<PriceDeliveryResponce> => {
    const { data } = await req.http.get("/tenant/city-delivery/pricing/" + idcomm + "?product=" + (prods ?? [].join(",")) + (db ?? ApiConfig.db));
    return data
}
const getPriceDeliveryAdmin = async (idcomm: number, db?: string): Promise<PriceDeliveryResponce> => {
    const { data } = await req.http.get("/tenant/city-delivery/pricing-admin/" + idcomm + (db ?? ApiConfig.dbq));
    return data
}
const sendEvent = (dt: PixelOpject, db?: string) => {
    return req.http.post("/tenant/facebook-pixel/events" + (db ?? ApiConfig.dbq), dt);
}
const getProductByIdCategory = async (id: number, db?: string): Promise<CategoriesResponseProducts> => {
    const { data } = await req.http.get("/tenant/product/category/" + id + "" + (db ?? ApiConfig.dbq));
    return data;
}
const getAllCategories = async (limit: number, offset: number, db?: string): Promise<CategoriesResponse> => {
    const { data } = await req.http.get("/tenant/category?page=" + offset + "&limit=" + limit + (db ?? ApiConfig.db));
    return data
}
const createOrder = async (dt: Order, db?: string): Promise<CreateOrderResponse> => {
    const { data } = await req.http.post("/tenant/order" + (db ?? ApiConfig.dbq), dt);
    return data
}

const Abandoned = async (dt: AbandonedForm, db?: string): Promise<any> => {
    const { data } = await req.http.post("/tenant/order-abandoned" + (db ?? ApiConfig.dbq), dt);
    return data
}
const getAllReviews = async (filter: string, db?: string): Promise<ReviewResponse> => {
    const { data } = await req.http.get("/tenant/reviews" + filter + (db ?? ApiConfig.db));
    return data
}
const createReview = (r: Review, db?: string) => {
    return req.http.post("/tenant/reviews" + (db ?? ApiConfig.dbq), r);
}
const applyPromo = async (promo: string, order: Order, db?: string): Promise<{

    price_items: number | null,
    price_total: number | null,
    price_promo: number,
}> => {

    const { data } = await req.httpAuth("").post("/tenant/coupons/" + promo + (db ?? ApiConfig.dbq), order);
    return data
}
const getById = async (id: number, db?: string): Promise<Product> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "")
        .get("/tenant/product/associate/" + id + (db ?? ApiConfig.dbq));
    return data
}

const updateProduct = async (prod: ProductPayload, db?: string): Promise<{
    message: string,
    product: ProductFull
}> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").put("/tenant/product/update/associate/" + prod.id + (db ?? ApiConfig.dbq), prod);
    return data
}
const addProduct = async (prod: ProductPayload, db?: string): Promise<{
    message: string,
    product: ProductFull
}> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").post("/tenant/product/associate/" + (db ?? ApiConfig.dbq), prod);
    return data
}
const changeState = async (id:number, db?: string): Promise<any> => {
    const { data } = await req.httpAuth("").patch("/tenant/product/product-action/disable/"+id + (db ?? ApiConfig.dbq));
    return data
}


const ProductApi = {
    getAll, getProductBySlug, getWilayas, getCityDelivery, getPriceDelivery, sendEvent,
    getProductByIdCategory, getAllCategories, createOrder, Abandoned, getAllByName,
    getYalidineCenter, getAllByNameAssociate,
    getAllByFilter, getAllReviews, applyPromo, getById,
    getPriceDeliveryAdmin, createReview,changeState,
    updateProduct, addProduct,getAllByFilterAssociate
}
export default ProductApi