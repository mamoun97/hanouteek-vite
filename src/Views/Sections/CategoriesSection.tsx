import { useGetAllCategoriesService } from "../../Api/Services";
import { HomePageSection } from "../../Types/ThemeSetting";
import CategoryCard, { CategoryCardMore } from "../CategoryCard";
import SwiperF from "../Swiper";
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

export default function CategoriesSection({ data }: { data: HomePageSection }) {
  const { data: cats, isLoading } = useGetAllCategoriesService(5, 0)
  if (isLoading) { }
  return (
    <div className="my-6">
      <h1 className="text-center font-bold text-2xl uppercase">{data.title}</h1>
      <p className="text-center uppercase">{data.subTitle}</p>
      <div className="grid grid-cols-4 gap-4 mt-4 max-sm:grid-cols-2">
        
        
      </div>
      {
        data&&!!(cats?.data.length )&& <SwiperF
         
          breakpoints={breakPointsProduct}
          items={[
            ...cats?cats.data.map((el, k) => {
              return <CategoryCard data={el} key={k} />
            }):[],
            <CategoryCardMore />
          ]
          }
        />
      }
    </div>
  )
}
