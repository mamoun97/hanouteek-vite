type Wilaya = {
    deliveryCostToTheHome: number,
    deliveryCostToTheOffice: number,
    id: number,
    name: string,
    showDeliveryCostToTheHome: boolean,
    showDeliveryCostToTheOffice: boolean
}
interface WilayaResponse {
    data: Array<Wilaya>,
    hasMore: boolean,
    limit: number,
    page: number,
    totalCount: number
}
type Commune = {
    deliveryCostToTheHome: number | null,
    deliveryCostToTheOffice: number | null,
    id: number,
    name: string,
    showDeliveryCostToTheHome: boolean,
    showDeliveryCostToTheOffice: boolean
}
interface CommuneResponse {
    communes: Array<Commune>,
    deliveryCostToTheHome: number,
    deliveryCostToTheOffice: number,
    id: number,
    name: string,
    showDeliveryCostToTheHome: boolean,
    showDeliveryCostToTheOffice: boolean
}
type YalidineCenter = {
    name: string,
    center_id: number,
    commune_name: string,
    wilaya_id: number,
    wilaya_name: string,
    commune_id: number,
    address: string,
    gps: string
}