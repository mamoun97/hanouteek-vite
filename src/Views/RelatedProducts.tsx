import SwiperF from './Swiper';
import ProductCard from './ProductCard';
import { useGetAllProductsService } from '../Api/Services';

export const breakPointsProduct={
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
        slidesPerView: 5,
        spaceBetween: 0
    },
    8000: {
        slidesPerView: 5,
        spaceBetween: 0
    }
}








export default function RelatedProducts({title}:{title:string}) {
    const {data}=useGetAllProductsService(20,1)
    
    return <div className='mt-4'>
        <h1 className='text-lg mb-2 font-semibold'>{title}</h1>

        {
            data&&<SwiperF
                breakpoints={breakPointsProduct}
                
                items={
                    data.data.map((el, key) => {
                        return <ProductCard
                        className='mx-1 '
                            key={key}
                            data={el}
                        />
                    })
                }
            />
        }
    </div>;
}
