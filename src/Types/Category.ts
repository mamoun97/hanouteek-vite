
type CategoriesResponse = {
    page: number,
    limit: number,
    totalCount: number,
    hasMore: number,
    data: Array<Category>
}
type Category = {
    id: number,
    name: string,
    image: string,
    state: boolean,
    parentCategory: Category | null,
    subcategories: Array<Category>,
    created_at: Date,
    updated_at: Date
}

interface CategoriesResponseProducts {
    page: number,
    limit: number,
    totalCount: number,
    data: Product[],
    hasMore: boolean
}


