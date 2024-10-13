
import DataF from '../Constants/DataF'
import { Link, useParams } from 'react-router-dom'
import Container from '../Views/Container'
import { useGetAllCategoriesService, useGetAllProductsByFilterService } from '../Api/Services'
import ProductCard from '../Views/ProductCard'
import Loading from '../Constants/Loading'
import CartEmpty from '../Views/CartEmpty'
import useLang from '../hoock/useLang'
import JoomlaApi from '../Api/JoomlaApi'
import imgSrc from '../utils/imgSrc'
import { ActionIcon, Badge, Drawer } from 'rizzui'
import { useEffect, useState } from 'react'
import JoomlaCategFilter from '../Views/JoomlaCategFilter'
import getFilter from '../utils/getFilter'
import { MdOutlineDateRange } from 'react-icons/md'
type Param = {
    id: string
}
export default function Supplier() {
    const { t } = useLang();
    const { id } = useParams<Param>()
    // const supplier = DataF[Number(id)]
    const { data } = JoomlaApi.getSupplierByIdService(Number(id))
    // const { data: categs, isLoading: loadingCategs } = useGetAllCategoriesService(6, 1)
    // if (!data) return ""
    const [drawerState, setDrawerState] = useState(false);
    const [options, setOptions] = useState<OptionsFilter>({
        limit: 15,
        page: 1,
        categoryId: null,
        minPrice: null,
        maxPrice: null,
        willaya: null,
        name: null,
        subseller: Number(id)
    })
    const [filter, setFilter] = useState(getFilter(options))
    const { data: prods, isLoading: loadingProds, error } = useGetAllProductsByFilterService(filter)
    const getFilterNumber = () => {
        let s = 0;
        ['maxPrice', 'minPrice'].
            forEach((key) => { if (options[key as keyof OptionsFilter]) s++; });
        return s
    }
    useEffect(() => {
        setFilter(getFilter(options))

    }, [options])
    return (
        <div >
            <div className=' bg-image relative ' style={{
                backgroundImage: "url('" + imgSrc(data?.banner, true) + "')"
            }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Container className='relative h-[calc(65vh)]'>
                    {
                        data?.avatar && <img
                            className='absolute bottom-0 translate-y-1/2 bg-card border-4 border-white left-4 w-32 h-32 rounded-full'
                            src={imgSrc(data?.avatar, true)} />

                    }
                </Container>
            </div>

            <div className="mt-24"></div>
            <Container className='grid grid-cols-3'>
                <div className='col-span-2'>
                    <p className='text-sm font-semibold'>Date d'adhésion</p>
                    <p className='flex items-center gap-2'> <MdOutlineDateRange /> 01/10/2024</p>
                    <h1 className='text-lg font-semibold mt-2'>Categories</h1>
                    <div className="grid grid-cols-7 mt-2" >
                        {

                            data?.categories.map((el, k) => {
                                return <>
                                    <CategoryCard
                                        link={"/categories/" + el.id}
                                        key={k}
                                        active={false}
                                        data={el}
                                    />
                                </>
                            })
                        }
                    </div>
                </div>
                <div className=''>
                    <h1 className='text-lg font-semibold'>Description</h1>
                    <p className='mt-4'>
                        {data?.description}
                    </p>


                </div>
            </Container>
            {/* {supplier.description && <div className='flex justify-center'>

                <p className='mb-6 text-lg tracking-widest text-center max-w-4xl'>
                    {supplier.description}
                </p>
            </div>} */}
            <Container className='flex justify-end'>
                <div className="relative inline-flex">
                    <ActionIcon size="lg" variant="outline" onClick={() => setDrawerState(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            className="w-5 h-5 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                        </svg>
                    </ActionIcon>
                    {!!getFilterNumber() && <Badge
                        size="sm"
                        enableOutlineRing
                        className="absolute right-0 top-0 -translate-y-1/3 translate-x-1/2"
                    >
                        {getFilterNumber()}
                    </Badge>}
                </div>
            </Container>
            <Container className='mt-24'>
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
                    hideName={true}
                    hideWilaya={true}
                    options={options}
                    setOpen={() => setDrawerState(false)}
                    setOptions={setOptions}
                />
            </Drawer>
        </div>
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
