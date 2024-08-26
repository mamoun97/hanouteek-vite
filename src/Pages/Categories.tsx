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
// import ProductView from "../Views/Resturant/ProductView";

type Param = {
    id?: number | null,
    idSub?: number | null
}

export default function Ctegories() {
    const { width } = useMediaQuery()
    const location = useLocation()
    const p = useParams()
    const { t } = useTranslation();
    const [param, setParam] = useState<Param>({ id: null, idSub: null })
    const refScroll=useRef<HTMLDivElement | null>(null)
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

    useEffect(() => {
        if(refScroll.current)
            window.scroll({ top: refScroll.current.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
    },[categs,options])

    const filterView = useMemo(() => {
        return categs?.data ? <div className="bg-white rounded-md p-3 py-4 tracking-[1px]" key={"k" + param}>
            <h1>{t("categs")}</h1>
            <div className="border border-gray-100 my-3"></div>

            <Link to={"/categories"} className="flex items-center p-1 cursor-pointer" >
                <Radio id="cc" checked={param.id == null} name={"categ" + param.id ?? "1"} />
                <div className="me-2"></div>
                <span className="text-sm font-semibold">{t("all")}</span>
            </Link>
            {
                categs?.data.map((el, k) => {

                    let checked1 = param.id == el.id

                    return <div className="mt-2" key={param.id + "-" + el.id + "-" + k} >
                        <Link to={"/categories/" + el.id} className="group flex items-center p-1 cursor-pointer" >
                            <Radio id="cc" checked={checked1} name={"categ" + param.id ?? "1"} />

                            <div className="me-2"></div>
                            <span className="text-sm font-semibold group-hover:underline">{el.name}</span>

                        </Link>
                        <div className="ps-2">
                            {
                                el.subcategories.map((item, index) => {
                                    let checked2 = param.idSub == item.id
                                    return <Link key={index} to={"/categories/" + el.id + "/" + item.id} className="group flex items-center p-1 cursor-pointer" >
                                        <Radio type="checkbox" id="ee" checked={checked2} />
                                        <div className="me-2"></div>
                                        <span className={"text-sm font-normal group-hover:underline"}>{item.name}</span>
                                    </Link>
                                })
                            }
                        </div>
                    </div>
                })
            }
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
        </div> : ""
    }, [prods, param.id, categs])

    return (
        <Container className="mt-5">
            <div className="grid grid-cols-4 gap-3 max-md:grid-cols-1">
                <div className="col-span-1">
                    {
                        loadingCategs && Loading.categoriesMenu
                    }
                    {/* {width>640?<div className="max-sm:hidden">
                        {filterView }
                    </div>
                    :<div className="hidden max-sm:block">
                        <Collapse title={
                            <div className="flex gap-2 items-center font-semibold">
                                <FiFilter />
                                Filter
                            </div>
                        } defaultOpen={false} className="bg-white"  >
                            {filterView}
                        </Collapse>
                    </div>
                    } */}
                    <Accordion
                        key={"item.title"}
                        defaultOpen={width>640}
                        className=" border   rounded-md"
                    >
                        <Accordion.Header className="bg-gray-100">
                            {
                                ({ open }: { open: boolean }) => (
                                    <div className="flex py-4 gap-2 p-2 items-center font-semibold">
                                        <FiFilter />
                                        Filter
                                        <div className="grow"></div>
                                        <IoIosArrowDown className={"transition-transform " + (open ? "rotate-[-180deg]" : "")} />
                                    </div>
                                )
                            }
                        </Accordion.Header>
                        <Accordion.Body className="p-2">
                            {filterView}
                        </Accordion.Body>
                    </Accordion>


                </div>

                <div className="col-span-3 max-md:col-span-1">
                    <div ref={refScroll}></div>
                    {loadingProds && Loading.categoriesProducts}
                    
                    <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2 ">
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
