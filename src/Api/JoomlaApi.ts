import useSWR from "swr";
import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";


interface ProductPayload extends Omit<ProductFull, 'category'> {
    category: number;
}
type ProductCreateResponse = {
    message: string,
    product: ProductFull
}

const getOrders = async (param: string, db?: string): Promise<OrdersResponse> => {
    const { data } = await req.httpAuth("").get("/tenant/sub-seller/order" + param + (db ?? ApiConfig.db));
    return data
}
const getProducts = async (filter: string, db?: string): Promise<ProductsResponse> => {
    const { data } = await req.httpAuth("").get("/tenant/sub-seller/product" + filter + (db ?? ApiConfig.db));
    return data
}



const getById = async (id: number, db?: string): Promise<Product> => {

    const { data } = await req.httpAuth("")
        .get("/tenant/sub-seller/product/" + id + (db ?? ApiConfig.dbq));
    return data
}

const updateProduct = async (prod: ProductPayload, db?: string): Promise<ProductCreateResponse> => {
    const { data } = await req.httpAuth("").put("/tenant/sub-seller/product/" + prod.id + (db ?? ApiConfig.dbq), prod);
    return data
}
const createProduct = async (prod: ProductPayload, db?: string): Promise<ProductCreateResponse> => {
    const { data } = await req.httpAuth("").post("/tenant/sub-seller/product/" + (db ?? ApiConfig.dbq), prod);
    return data
}

const signInClient = async (dt: { phoneNumber: string, password: string }): Promise<ClientAuth> => {

    const { data } = await req.http.post("/tenant/client/login" + ApiConfig.dbq, dt);
    return data
}
const signUpClient = async (dt: JoomlaClient): Promise<JoomlaClientFull> => {
    const { data } = await req.http.post("/tenant/client/" + ApiConfig.dbq, dt);
    return data
}

const signInSaller = async (dt: { email: string, password: string }): Promise<ClientAuth> => {
    const { data } = await req.http.post("/tenant/sub-seller/login" + ApiConfig.dbq, dt);
    return data
}

const signUpSaller = async (dt: JoomlaUser): Promise<JoomlaUserFull> => {
    const { data } = await req.http.post("/tenant/sub-seller/" + ApiConfig.dbq, dt);
    return data
}





/********************** SERVICES **********************/

const getOrdersService = (params: string, db?: string) => {
    const data = useSWR<OrdersResponse>(
        "/tenant/sub-seller/order" + params + (db ?? ApiConfig.db),
        () => getOrders(params, db),
        ApiConfig.swrStop
    );
    return data
}
const getProductsService = (filter: string, db?: string) => {
    const data = useSWR<ProductsResponse>(
        "/tenant/sub-seller/product" + filter + (db ?? ApiConfig.db),
        () => getProducts(filter, db),
        ApiConfig.swrStop
    );
    return data
}


const JoomlaApi = {
    getOrders,
    getOrdersService,
    getProductsService,
    updateProduct,
    createProduct,
    signInClient,
    signUpClient,
    signInSaller,
    signUpSaller,
    getById,
    getProducts,
}

export default JoomlaApi