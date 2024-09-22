import { Link, useLocation, useParams } from "react-router-dom";
import { useGetAllCategoriesService, useGetAllProductsByFilterService } from "../Api/Services";
import Container from "../Views/Container";
// import Radio from "../Views/Flowbit/Radio";
import { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "../Views/ProductCard";
import Loading from "../Constants/Loading";
import CartEmpty from "../Views/CartEmpty";
import { useTranslation } from "react-i18next";
// import { Accordion, Input, NumberInput } from "rizzui";

// import { FiFilter } from "react-icons/fi";
import useMediaQuery from "../hoock/useMediaQuery";
import getFilter from "../utils/getFilter";
// import { IoIosArrowDown } from "react-icons/io";
// import ProductView from "../Views/Resturant/ProductView";

type Param = {
    id?: number | null,
    idSub?: number | null
}

export default function JoomlaCategs() {
    const { width } = useMediaQuery()
    const location = useLocation()
    const p = useParams()
    const { t } = useTranslation();
    const [param, setParam] = useState<Param>({ id: null, idSub: null })
    const refScroll = useRef<HTMLDivElement | null>(null)
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

    // useEffect(() => {
    //     if (refScroll.current)
    //         window.scroll({ top: refScroll.current.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
    // }, [categs, options])


    const getCateg = () => {
        if (categs) {
            if (param.id)
                return categs.data.find(el => el.id == param.id)
            else if (param.idSub)
                return categs.data.find(el => el.subcategories.find(item => item.id == param.idSub))?.subcategories.find(el => el.id == param.idSub)
        }
        return null
    }

    return (
        <div>
            <div className="relative h-56 bg-card mb-28 bg-primary bg-image" style={{
                backgroundImage: "url('" + getCateg()?.image + "')"
            }}>
                <div className="absolute inset-0 bg-black/30">
                    <h1 className="text-4xl text-center  mt-8 font-bold text-white">{getCateg()?.name}</h1>
                </div>
                <div className="bg-card  absolute bottom-0 p-4  left-1/2 translate-y-1/2 -translate-x-1/2 w-5/6 max-sm:w-[96%] min-h-[128px]">

                    <h1 className="text-lg font-semibold">Chercher par catégories</h1>
                    <div className="flex  items-center mt-6  gap-4 no-scrollbar overflow-auto">
                        {
                            categs?.data.map((el, k) => {
                                return <>
                                    <CategoryCard
                                        link={"/categories/" + el.id}
                                        key={k}
                                        active={param.id==el.id}
                                        data={el}
                                    />
                                    {/* {
                                        el.subcategories.map((item, i) => {
                                            return <CategoryCard
                                                link={"/categories/" + el.id + "/" + item.id}
                                                key={i}
                                                data={item}
                                            />

                                        })
                                    } */}
                                </>
                            })
                        }
                    </div>
                </div>

            </div>
            <div className="flex w-5/6 m-auto">
                {
                    getCateg()?.subcategories.map(item => {
                        return <Link to={"/categories/" + getCateg()?.id + "/" + item.id} className={"p-2 py-1 text-sm font-semibold rounded-full border "+(item.id==param.idSub?"border-primary":"")} key={item.id}>
                             {item.name}
                        </Link>

                    })
                }
            </div>
            <Container className="mt-5">
                <div ref={refScroll}></div>
                <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-4 gap-3 max-sm:grid-cols-2">


                    {loadingProds && Loading.categoriesProducts}


                    {

                        prods?.data.map((el, k) => {
                            return <ProductCard data={el} key={k} imageClassName='rounded-lg'/>
                        })
                    }
                    {
                        (prods?.data.length === 0 || error) && <div className="col-span-full flex justify-center mt-20 ">
                            <CartEmpty text={t("no_prods")} />

                        </div>
                    }




                </div>
            </Container>
        </div>
    )
}


function CategoryCard({ data, link,active=false }: { data: Category, link: string,active?:boolean }) {
    return <Link to={link} className="w-24 min-w-[96px]">
        <div className={"rounded-lg  pt-[100%]  bg-image relative overflow-hidden "+(active?"border-2 border-primary":"")} style={{
            backgroundImage: "url('" + data.image + "')"
        }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent">
                <h1 className="absolute bottom-1 left-1 text-white text-sm font-medium capitalize">{data.name.toLocaleLowerCase()}</h1>
            </div>
        </div>

    </Link>
}
