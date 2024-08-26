
const getFilter = (options: OptionsFilter) => {
    let f = "";
    f += `?limit=${options.limit}`
    f += `&page=${options.page}`
    f += `${options.categoryId ? "&categoryId=" + options.categoryId : ""}`
    f += `${options.minPrice ? "&minPrice=" + options.minPrice : ""}`
    f += `${options.maxPrice ? "&maxPrice=" + options.maxPrice : ""}`
    return f;
}
export default  getFilter