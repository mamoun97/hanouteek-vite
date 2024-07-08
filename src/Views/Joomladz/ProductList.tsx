


import { useGetAllProductsByFilterService } from "../../Api/Services";
import SwiperF from "../Swiper";
import ProductCard from "../ProductCard";
const breakPointsProduct = {
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
        slidesPerView: 5,
        spaceBetween: 0
    },
    1200: {
        slidesPerView: 6,
        spaceBetween: 0
    },
    8000: {
        slidesPerView: 7,
        spaceBetween: 0
    }
}

export default function ProductsList() {

    const { data: prods } = useGetAllProductsByFilterService("?limit=10&page=1")

    return (
        <div className="my-4">

            <div className="grid grid-cols-4 gap-4 mt-4 max-sm:grid-cols-2">


            </div>
            <SwiperF

                breakpoints={breakPointsProduct}
                items={[
                    ...prods ? prods.data.map((el, k) => {
                        return <div className="m-2"><ProductCard data={el} key={k} hidePrice/></div>
                    }) : []
                ]
                }
            />

        </div>
    )
}
