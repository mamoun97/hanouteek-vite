import { Link, useLocation, useParams } from "react-router-dom";
import { useGetAllCategoriesService, useGetAllProductsByFilterService } from "../Api/Services";
import Container from "../Views/Container";
import { useEffect, useRef, useState } from "react";
import ProductCard from "../Views/ProductCard";
import Loading from "../Constants/Loading";
import CartEmpty from "../Views/CartEmpty";
import useMediaQuery from "../hoock/useMediaQuery";
import getFilter from "../utils/getFilter";
import { ActionIcon, Badge, Drawer, Input } from "rizzui";
import useLang from "../hoock/useLang";
import JoomlaCategFilter from "../Views/JoomlaCategFilter";
// import DataF from "../Constants/DataF";
import JoomlaApi from "../Api/JoomlaApi";
import imgSrc from "../utils/imgSrc";
type Param = {
    id?: number | null,
    idSub?: number | null
}
// const d: readonly number=/
export default function JoomlaCategs() {
    // const { width } = useMediaQuery()
    const location = useLocation()
    const p = useParams()
    const { t } = useLang();
    const [param, setParam] = useState<Param>({ id: null, idSub: null })
    const refScroll = useRef<HTMLDivElement | null>(null)
    const [drawerState, setDrawerState] = useState(false);
    const [options, setOptions] = useState<OptionsFilter>({
        limit: 15,
        page: 1,
        categoryId: null,
        minPrice: null,
        maxPrice: null,
        willaya: null,
        name: null,
    })
    const [filter, setFilter] = useState(getFilter(options))
    const [filterSupplier, setFilterSupplier] = useState(getFilter(options))
    const { data: categs, isLoading: loadingCategs } = useGetAllCategoriesService(50, 1)
    const { data: prods, isLoading: loadingProds, error } = useGetAllProductsByFilterService(filter)
    const { data: suppliers, isLoading: loadingSuppliers, error: errorF } = JoomlaApi.getSuppliersService(filterSupplier)
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
        setFilterSupplier(getFilter({
            ...options,
            maxPrice: null,
            minPrice: null
        }))
    }, [options])

    const getFilterNumber=()=>{
        let s=0;
        ['maxPrice', 'minPrice', 'name', 'willaya'].
        forEach((key) => { if (options[key as keyof OptionsFilter]) s++; });
        return s
    }


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
            <div className="relative h-56 bg-card  bg-primary bg-image" style={{
                backgroundImage: "url('" + getCateg()?.image + "')"
            }}>

                <div className="absolute inset-0 bg-black/30">
                </div>
            </div>

            <div className="flex relative flex-col justify-center items-center  -mt-36">

                <h1 className="text-4xl text-center  my-4 font-bold text-white">{getCateg()?.name}</h1>

                <div className="bg-cardx bg-white rounded-lg   p-4   w-5/6 max-sm:w-[96%] min-h-[128px]">
                    <Container>
                        <div className="flex justify-between">
                            <h1 className="text-2xl mt-6 mb-4 font-semibold">Catégories</h1>

                            <div className="relative inline-flex">
                                <ActionIcon size="lg" variant="outline" onClick={() => setDrawerState(true)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                        className="w-5 h-5 cursor-pointer">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                                    </svg>
                                </ActionIcon>
                                {!!getFilterNumber()&&<Badge
                                    size="sm"
                                    enableOutlineRing
                                    className="absolute right-0 top-0 -translate-y-1/3 translate-x-1/2"
                                >
                                    {getFilterNumber()}
                                </Badge>}
                            </div>
                        </div>

                        <div className="flex  items-center mt-6  gap-4 no-scrollbar overflow-auto">

                            <CategoryCard
                                link={"/categories/"}
                                active={!param.id}
                                data={{
                                    id: 0,
                                    created_at: new Date(),
                                    image: "https://joomladz.com/files/allcat.png",
                                    name: "",
                                    state: true,
                                    parentCategory: null,
                                    subcategories: [],
                                    updated_at: new Date()
                                }}
                            />
                            {

                                categs?.data.map((el, k) => {
                                    return <>
                                        <CategoryCard
                                            link={"/categories/" + el.id}
                                            key={k}
                                            active={param.id == el.id}
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
                        <div className="flex w-full m-auto mt-2">
                            {
                                getCateg()?.subcategories.map(item => {
                                    return <Link to={"/categories/" + getCateg()?.id + "/" + item.id} className={"p-2 py-1 text-sm font-semibold rounded-full border " + (item.id == param.idSub ? "border-primary" : "")} key={item.id}>
                                        {item.name}
                                    </Link>

                                })
                            }
                        </div>
                        {/* <div className="flex justify-center gap-2 items-center my-4">

                            <Input type="search"
                                suffix={
                                    
                                }
                                rounded="pill"
                                className="rounded-full w-full max-w-md" />
                        </div> */}
                    </Container>


                </div>
            </div>


            <Container className="mt-5">
                <div ref={refScroll}></div>
                <div className="text-3xl mt-6 mb-4 font-semibold">Fournisseurs</div>
                <div className="grid grid-cols-4 gap-2 my-4">

                    {
                        suppliers?.data.map((el, k) => {
                            return <div key={k}>
                                <div className="relative cursor-pointer  h-24 border overflow-hidden rounded-lg bg-cover bg-center" style={{
                                    backgroundImage: "url('" + imgSrc(el.banner, true) + "')"
                                }}>
                                    <Link to={"/supplier/" + el.id}>
                                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/40 to-transparent p-2">
                                            <p className="text-sm uppercase font-semibold line-clamp-2 text-white  ">
                                                {el.lastName}
                                            </p>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                        })
                    }
                    
                    {
                        (prods?.data.length === 0 || errorF) && <div className="col-span-full flex justify-center mt-20 ">
                            <CartEmpty text={"Aucun Fournisseur"} />

                        </div>
                    }
                </div>
                <div className="text-3xl mt-9 mb-4 font-semibold">Products</div>
                <div className="grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-4 gap-3 max-sm:grid-cols-2">


                    {loadingProds && [1, 2, 3, 4, 5].map((el, k) => {
                        if (el) { }
                        return <div className="col-span-1" key={k}>
                            {Loading.productLoading}
                        </div>
                    })}


                    {

                        prods?.data.map((el, k) => {
                            return <ProductCard data={el} key={k} imageClassName='rounded-lg' />
                        })
                    }
                    {
                        (prods?.data.length === 0 || error) && <div className="col-span-full flex justify-center mt-20 ">
                            <CartEmpty text={t.no_prods} />

                        </div>
                    }




                </div>


            </Container>

            <Drawer
                isOpen={drawerState}
                onClose={() => setDrawerState(false)}>
                <JoomlaCategFilter
                    options={options}
                    setOpen={() => setDrawerState(false)}
                    setOptions={setOptions}
                />
            </Drawer>
        </div >
    )
}


function CategoryCard({ data, link, active = false }: { data: Category, link: string, active?: boolean }) {
    return <Link to={link} className={"w-24 min-w-[96px] transition !duration-300 " + (active ? "w-[106px] min-w-[106px]" : "")}>
        <div className={"rounded-lg  pt-[100%]  bg-image relative overflow-hidden " + (active ? "border-2 border-primary " : "")} style={{
            backgroundImage: "url('" + data.image + "')"
        }}>
            <div className={`absolute inset-0 bg-gradient-to-t  to-transparent ${active ? "from-black/50 " : "from-black/80"}`}>
                <h1 className={"absolute bottom-1 left-1 text-white text-sm font-medium capitalize " + (active ? "!font-bold" : "")}>{data.name.toLocaleLowerCase()}</h1>
            </div>
        </div>

    </Link>
}
