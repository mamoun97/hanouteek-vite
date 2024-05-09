import { Link, useLocation, useParams } from "react-router-dom";
import { useGetAllCategoriesService, useGetAllProductsByFilterService } from "../Api/Services";
import Container from "../Views/Container";
// import Radio from "../Views/Flowbit/Radio";
import { useEffect, useState } from "react";
import ProductCard from "../Views/ProductCard";
import Loading from "../Constants/Loading";
import CartEmpty from "../Views/CartEmpty";
import { useTranslation } from "react-i18next";
import { Input, NumberInput } from "rizzui";
import SwiperF from "../Views/Swiper";
// import ApiConfig from "../Api/ApiConfig";
// import ProductView from "../Views/Resturant/ProductView";
const breakPointsProduct = {
    0: {
        slidesPerView: 3.5,
        spaceBetween: 0
    },
    740: {
        slidesPerView: 5.5,
        spaceBetween: 0
    },
    830: {
        slidesPerView: 6.5,
        spaceBetween: 0
    },

    900: {
        slidesPerView: 7.5,
        spaceBetween: 0
    },
    1200: {
        slidesPerView: 8.5,
        spaceBetween: 0
    },
    8000: {
        slidesPerView: 8,
        spaceBetween: 0
    }
}
type Param = {
    id?: number | null,
    idSub?: number | null
}
type OptionsFilter = {
    limit: number,
    page: number,
    categoryId: number | null,
    minPrice: number | null,
    maxPrice: number | null
}
const getFilter = (options: OptionsFilter) => {
    let f = "";
    f += `?limit=${options.limit}`
    f += `&page=${options.page}`
    f += `${options.categoryId ? "&categoryId=" + options.categoryId : ""}`
    f += `${options.minPrice ? "&minPrice=" + options.minPrice : ""}`
    f += `${options.maxPrice ? "&maxPrice=" + options.maxPrice : ""}`
    return f;
}
export default function CategoriesResturant() {
    const location = useLocation()
    const p = useParams()
    const { t } = useTranslation();
    const [param, setParam] = useState<Param>({ id: null, idSub: null })

    const [options, setOptions] = useState<OptionsFilter>({
        limit: 15,
        page: 1,
        categoryId: null,
        minPrice: null,
        maxPrice: null
    })
    const [filter, setFilter] = useState(getFilter(options))
    const { data: categs, isLoading: loadingCategs } = useGetAllCategoriesService(50, 1)
    const { data: prods, isLoading: loadingProds, error } = useGetAllProductsByFilterService(filter)

    useEffect(() => {
        setOptions({
            ...options,
            categoryId: p.idSub ? parseInt(p.idSub) : (p.id ? parseInt(p.id) : null),
            page: 1
        })
        setParam({
            id: p.id ? parseInt(p.id) : null,
            idSub: p.idSub ? parseInt(p.idSub) : null
        })
    }, [location.pathname])
    useEffect(() => {
        setFilter(getFilter(options))
    }, [options])
    return (
        <Container className="mt-5">
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-1">
                <div className="col-span-4">

                    {
                        loadingCategs && Loading.categoriesMenu
                    }


                    {categs && <div className="bg-white rounded-md p-3 py-4 tracking-[1px]">
                        <h1>{t("categs")}</h1>
                        <div className="border border-gray-100 my-3"></div>
                        <SwiperF

                            breakpoints={breakPointsProduct}
                            items={
                                categs?.data?[...categs.data].map((el, k) => {

                                    let checked1 = param.id == el.id

                                    return <div className="mt-2">
                                        <Link key={k} to={"/categories/" + el.id} className="group flex flex-col items-center p-1 cursor-pointer" >
                                            <img src={el.image} alt="" className={"w-16 h-16 min-w-[64px] rounded-lg border-2 " + (checked1 ? "border-primary" : "")} />
                                            <div className="mt-2"></div>
                                            <span className="text-sm font-semibold group-hover:underline text-center">{el.name}</span>

                                        </Link>

                                    </div>
                                }) :[]
                            }
                        />

                        <div className="flex items-center gap-3 mt-4">
                            <NumberInput
                                formatType="numeric"
                                value={options.minPrice}
                                onChange={(e) => {
                                    setOptions({
                                        ...options,
                                        minPrice: parseInt(e.target.value.replace(/,/g, ""))
                                    })
                                }}
                                displayType="input"
                                placeholder={t("minPrice")}
                                customInput={Input as React.ComponentType<unknown>}
                                thousandSeparator=","
                                suffix="DZD"

                            />
                            <NumberInput
                                formatType="numeric"
                                value={options.maxPrice}
                                onChange={(e) => {
                                    setOptions({
                                        ...options,
                                        maxPrice: parseInt(e.target.value.replace(/,/g, ""))
                                    })
                                }}
                                placeholder={t("maxPrice")}
                                displayType="input"
                                customInput={Input as React.ComponentType<unknown>}
                                thousandSeparator=","
                                suffix={"DZD"}

                            />
                        </div>
                    </div>}
                </div>
                <div className="col-span-4 max-md:col-span-1">
                    {loadingProds && Loading.categoriesProducts}
                    <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
                        {

                            prods?.data.map((el, k) => {
                                return <div className="col-span-1">
                                    <ProductCard data={el} key={k} showFull={true} />
                                </div>
                            })
                        }
                        {
                            (prods?.data.length === 0 || error) && <div className="col-span-3 flex justify-center mt-20 max-md:col-span-2">
                                <CartEmpty text={t("no_prods")} />

                            </div>
                        }
                    </div>
                    <div>

                        <div className="lg:w-1/2 xl:w-1/3 mx-auto">
                            <Pagination currentPage={options.page} totalPages={Math.ceil((prods?.totalCount ?? 0) / options.limit)} onPageChange={(e) => {
                                setOptions({
                                    ...options,
                                    page: e
                                })
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const generatePageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center my-4">
            <nav>
                <ul className="pagination flex">
                    {generatePageNumbers().map((page) => (
                        <li
                            key={page}
                            className={`mx-1 bg-white text-center min-w-[40px] p-2 ${currentPage === page ? 'text-white !bg-primary font-bold' : 'text-gray-700'
                                } cursor-pointer`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};
