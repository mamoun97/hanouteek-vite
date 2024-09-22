


import { Link, useLocation, useParams } from "react-router-dom";
import { useGetAllCategoriesService, useGetAllProductsByFilterService } from "../Api/Services";
import Container from "../Views/Container";
import Radio from "../Views/Flowbit/Radio";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../Views/ProductCard";
import Loading from "../Constants/Loading";
import CartEmpty from "../Views/CartEmpty";
import { useTranslation } from "react-i18next";
import { Accordion, Input, NumberInput } from "rizzui";

import { FiFilter } from "react-icons/fi";
import useMediaQuery from "../hoock/useMediaQuery";
import getFilter from "../utils/getFilter";
import { IoIosArrowDown } from "react-icons/io";
import { Pagination } from './Categories';
import ApiConfig from "../Api/ApiConfig";
// import ProductView from "../Views/Resturant/ProductView";

type Param = {
    id?: number | null,
    idSub?: number | null
}

export default function PrivateCategory() {
    const { width } = useMediaQuery()
    const location = useLocation()
    const p = useParams()
    const { t } = useTranslation();
    const [param, setParam] = useState<Param>({ id: null, idSub: null })
    const refScroll = useRef<HTMLDivElement | null>(null)
    const [options, setOptions] = useState<OptionsFilter>({
        limit: 15,
        page: 1,
        categoryId: ApiConfig.categPrv,
        minPrice: null,
        maxPrice: null
    })
    const [filter, setFilter] = useState(getFilter(options))
    // const { data: categs, isLoading: loadingCategs } = useGetAllCategoriesService(50, 1)
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
        <div className="bg-rose-ligt py-8">
            <Container className="mt-5">


                <div className="col-span-3 max-md:col-span-1">
                    <div ref={refScroll}></div>
                    {loadingProds && Loading.categoriesProducts}

                    <div className="grid grid-cols-4 max-md:col-span-3 gap-3 max-md:grid-cols-2 ">
                        {

                            prods?.data.map((el, k) => {
                                return <div className="col-span-1">
                                    <ProductCard isPrivate={true} data={el} key={k} imageClassName='rounded-lg' />
                                </div>
                            })
                        }
                        {
                            (prods?.data.length === 0 || error) && <div className="col-span-full ">
                                <CartEmpty text={""}  iconClassName="text-white">
                                    <div className="flex justify-center !text-white items-center flex-col">
                                        <h1 className="text-xl font-bold">{t("no_vent_prv")}</h1>
                                        <p>{t("next_vent_prv")}</p>
                                    </div>
                                </CartEmpty>
                            </div>
                        }
                    </div>
                    {/* <div className="hidden max-sm:block">
                   {prods?.data && <SwiperF
                       breakpoints={breakPointsProduct}

                       items={
                           prods?.data.map((el, key) => {
                               return <ProductCard
                                   className='mx-1 '
                                   key={key}
                                   data={el}
                               />
                           })
                       }
                   />}
               </div> */}
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

            </Container>
        </div>
    )
}

