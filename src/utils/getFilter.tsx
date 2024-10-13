
const getFilter = (options: OptionsFilter) => {
    let f = "";
    f += `?limit=${options.limit}`
    f += `&page=${options.page}`
    f += `${options.categoryId ? "&categoryId=" + options.categoryId : ""}`
    f += `${options.minPrice ? "&minPrice=" + options.minPrice : ""}`
    f += `${options.maxPrice ? "&maxPrice=" + options.maxPrice : ""}`
    f += `${options?.willaya ? "&willaya=" + options.willaya : ""}`
    f += `${options?.name ? "&name=" + options.name : ""}`
    f += `${options?.subseller ? "&subseller=" + options.subseller : ""}`
    return f;
}
export default  getFilter