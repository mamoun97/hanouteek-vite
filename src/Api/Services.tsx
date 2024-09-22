
import useSWR from "swr";
import { ThemeSetting } from "../Types/ThemeSetting";
import ThemeApi from "./ThemeApi";
import ApiConfig from "./ApiConfig";
import CategorieApi from "./CategorieApi";
import ProductApi from "./ProductApi";
import OrderApi from "./OrderApi";
import AssociateApi from "./Associate";
import OfferApi from "./Offer";
const urls = {
    theme: ApiConfig.rootUrl + "/api/v1/tenant/store/findOne"
}


const options = {

    dedupingInterval: 50000,
    refreshWhenHidden:false,
        revalidateOnFocus:false,

}

// Get Theme Setting
export const useThemeService = (db?:string) => {
    const data = useSWR<ThemeSetting>(urls.theme+db, ()=>ThemeApi.read(db), {
        ...options,
        dedupingInterval: 500000,
        refreshWhenOffline:false,
        refreshWhenHidden:false,
        revalidateOnFocus:false,

    })
    return data
}

// Get All Categories
export const useGetAllCategoriesService = (limit: number, offset: number,op:any={},db?:string) => {
    const data = useSWR<CategoriesResponse>(`/tenant/category?page=${offset}&limit=${limit+ApiConfig.db}`+db, () => CategorieApi.getAllCategories(limit, offset,db), {...options,...op})
    return data
}

// Get All Categories by Filter
export const useGetAllCategoriesFilterService = (filter:string,op:any={},db?:string) => {
    const data = useSWR<CategoriesResponse>(`/tenant/category?${filter}${ApiConfig.db}`+db, () => CategorieApi.getAllCategoriesFilter(filter,db), {...options,...op})
    return data
}

// Get All Products by limit & offset
export const useGetAllProductsService = (limit: number, offset: number,op:any={},db?:string) => {
    const data = useSWR<ProductsResponse>("/tenant/product/all?page="+offset+"&limit="+limit+db, () => ProductApi.getAll(limit, offset,db), {...options,...op});
    return data
}
// Get All Products by name
export const useGetAllProductsByNameService = (name:string,db?:string) => {
    const data = useSWR<ProductsResponse>("prods?name="+name+db, () => ProductApi.getAllByName(name,db), options);
    return data
}
// Get price total
export const useGetPriceTotalService = (filter:string,db?:string) => {
    const data = useSWR("/tenant/order/associate/price-total"+filter+(db??ApiConfig.db), () => OrderApi.priceTotal(filter,db), options);
    return data
}
export const useGetPriceService = (filter:string,db?:string) => {
    const data = useSWR("/tenant/order/associate/price"+filter+(db??ApiConfig.db), () => OrderApi.price(filter,db), options);
    return data
}

export const useGetAllProductsByNameServiceAssociate = (name:string,db?:string) => {
    const data = useSWR<ProductsResponse>("prods?name="+name+db, () => ProductApi.getAllByNameAssociate(name,db), options);
    return data
}
export const useGetAllProductsByFilterService = (filter:string,db?:string) => {
    const data = useSWR<ProductsResponse>("/tenant/product/all/filter="+filter+db, () => ProductApi.getAllByFilter(filter,db), options);
    return data
}
export const useGetAllProductsByFilterJoomlaService = (filter:string,db?:string) => {
    const data = useSWR<ProductsResponse>("/tenant/product/all/filter="+filter+db, () => ProductApi.getAllByFilter(filter,db), options);
    return data
}

// Get Product By Slug name
export const useGetProductBySlugService = (slug: string,db?:string,) => {
    const data = useSWR("/tenant/product/find-one-by-slug/" + slug+db, () => ProductApi.getProductBySlug(slug,db), options)
    return data
}
// Get Wilayas
export const useGetWilayasService = (options:any={},db?:string) => {
    const data = useSWR("/tenant/city-delivery?limit=58&page=1"+db, () => ProductApi.getWilayas(db), {
        dedupingInterval: 500000,
        ...options
    })
    return data
}

// Get Communes
export const useGetCommunesService = (id: number,db?:string) => {
    const data = useSWR(`/tenant/city-delivery/${id}`+db, () => ProductApi.getCityDelivery(id,db), options)
    return data
}
export const useGetYalidineCenterService = (name: string,db?:string) => {
    const data = useSWR<YalidineCenter[]>("/yalidine-centers?wilaya_name="+name+db, () => ProductApi.getYalidineCenter(name,db), options)
    return data
}

// Get Communes
export const useGetProductByIdCategoryService = (id:number|null,db?:string) => {
    if(id==null)
        return useGetAllProductsService(20,1,db);
    const data = useSWR("/tenant/product/category/"+id+""+db, () => ProductApi.getProductByIdCategory(id,db), options)
    return data
}


// Get All Products by limit & offset
export const useGetAllOrdersService = (params:string,db?:string) => {
    const data = useSWR<OrdersResponse>("orders/"+params+db, () => OrderApi.getAll(params,db), options);
    return data
}



//orderAbandoned service 
export const useGetOrderAbandonedService = (params:string,db?:string) => {
    const data = useSWR("orderAbandoned/"+params+db, () => OrderApi.orderAbandoned(params,db), options);
    return data
}

// Get All order statistics
export const useGetAllOrdersStatisticsService = (filter:string,db?:string) => {
    const data = useSWR("/tenant/statistics/days" + filter + (db ?? ApiConfig.db), () => OrderApi.statistics(filter,db), options);
    return data
}


export const useGetAllOffers=(filter:string)=>{
  
    const data = useSWR("/tenant/offer"+filter, () => OfferApi.getAll(filter), {...options,...{}});
    return data
}
export const useGetOfferById=(id:string| number)=>{
  
    const data = useSWR("/tenant/offer/"+id, () => OfferApi.getById(id), {...options,...{}});
    return data
}


export const useGetOrderByIdService = (id:number,db?:string) => {
    const data = useSWR<OrderFull>("orders/"+id+db, () => OrderApi.getById(id,db), options);
    return data
}



// Get All statistics associate
export const useGetStatisticsService = (dt:{startDate:string,endDate:string},db?:string) => {
    const data = useSWR(
        `/tenant/statistics/all?startDate=${dt.startDate}&endDate=${dt.endDate}`+(db??ApiConfig.db)
        , () => AssociateApi.statistics(dt,db), options);
    return data
}

// Get All  associate users
export const useGetAllAssociateService=(filter:string,db?:string)=>{
  
    const data = useSWR("/tenant/associate/all"+filter+(db??ApiConfig.db), () => AssociateApi.getAll(filter), {...options,...{}});
    return data
}


///////////////// JJJJoooommmmllllllaaaaaa
