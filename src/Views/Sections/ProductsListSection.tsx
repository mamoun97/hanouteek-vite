import { HomePageSection } from "../../Types/ThemeSetting";







import {  useGetAllProductsByFilterService, useGetProductByIdCategoryService } from "../../Api/Services";
import  { CategoryCardMore } from "../CategoryCard";
import SwiperF from "../Swiper";
import ProductCard from "../ProductCard";
 const breakPointsProduct={
  0: {
      slidesPerView: 2,
      spaceBetween: 0
  },
  740: {
      slidesPerView: 2,
      spaceBetween: 0
  },
  830: {
      slidesPerView: 3,
      spaceBetween: 0
  },

  900: {
      slidesPerView: 4,
      spaceBetween: 0
  },
  1200: {
      slidesPerView: 4,
      spaceBetween: 0
  },
  8000: {
      slidesPerView: 4,
      spaceBetween: 0
  }
}

export default function ProductsListSection({ data }: { data: HomePageSection }) {

  const { data: prods, isLoading } = useGetAllProductsByFilterService("?limit=10&page=1&categoryId="+data.category?.id??0)

  return (
    <div className="my-4">
      <h1 className="text-center font-bold text-2xl">{data.title}</h1>
      <p className="text-center">{data.subTitle}</p>
      <div className="grid grid-cols-4 gap-4 mt-4 max-sm:grid-cols-2">
        
        
      </div>
      {
        data && <SwiperF
         
          breakpoints={breakPointsProduct}
          items={[
            ...prods?prods.data.map((el, k) => {
              return <div className="m-2"><ProductCard  data={el} key={k} /></div>
            }):[],
            ...data.showLoadMore?[
              <div className="h-full ">
                <CategoryCardMore />
              </div>
            ]:[]
          ]
          }
        />
      }
    </div>
  )
}
