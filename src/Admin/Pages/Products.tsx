import { Button} from "rizzui"
import { useGetAllProductsByFilterService } from "../../Api/Services"

import { useEffect, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { Link } from "react-router-dom"
import orderCols from "../Const/order-cols"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { GlobalS } from "../../Store/globalSlice"
import ProductsTable from "../components/ProductsTable"


export default function Products() {
  const global = useSelector<RootState>((state) => state.global) as GlobalS
  const user = useSelector<RootState>((state) => state.user) as UserAuth
  const [option, setOptions] = useState<ProductOptionRequest>({
    limit: 10,
    page: 1,
    sort:"sort=createdAt:desc"

  })

  const [param, setParam] = useState(`?limit=${option.limit}&page=${option.page}`)

  const { data, isLoading, mutate } = useGetAllProductsByFilterService(param, (global?.platform) ? "&" + global?.platform : undefined)
  
  const [showCols, setShowCols] = useState(orderCols)
  useEffect(() => {

    document.body.dir = "ltr"
  }, [])
  useEffect(() => {
    if (option) {
      let p = `?limit=${option.limit}&page=${option.page}`
     
      p += !!option.categoryId ? `&categoryId=${option.categoryId}` : ""
      p += !!option.state ? `&state=${option.state}` : ""
      p += !!option.trash ? `&trash=${option.trash}` : ""
      p += !!option.state ? `&state=${option.state}` : ""
      setParam(p)
      console.log(option)
    }
  }, [option])
  
  return (
    <div dir="ltr">
      <h1 className="text-2xl font-semibold">All Products</h1>
      
      <div className="flex py-2 items-center gap-2">
        
        <div className="grow"></div>
        
        
        <Link to={"/products/create"}>
          <Button>
            <span className="max-sm:hidden">Add New Product</span>
            <span className="me-1"></span>
            <LuPlus className="text-lg" />
          </Button>
        </Link>

      </div>
      <ProductsTable
        afterChange={() => mutate()}
        data={data?.data ? data : {
          data: [],
          totalCount: 0,
          limit: option.limit,
          hasMore: true,
          page: option.page

        }} showCols={showCols} isLoading={isLoading} option={option} setOption={setOptions} />
    </div>
  )
}




