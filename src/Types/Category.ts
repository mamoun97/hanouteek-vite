
interface CategoriesResponse extends ResponseAtt {
    
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

interface CategoriesResponseProducts extends ResponseAtt{
   
    data: Product[]
}


