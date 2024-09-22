
import { useGetAllCategoriesService, useGetAllProductsByFilterService } from '../../Api/Services'
import ApiConfig from '../../Api/ApiConfig'
import images from '../../assets'
import { IoMenuSharp } from 'react-icons/io5'
import { Avatar, Button, Input } from 'rizzui'
import { useTranslation } from 'react-i18next'
import ProductCard from '../ProductCard'
import { useState } from 'react'
import getFilter from '../../utils/getFilter'
import { IoIosArrowDown } from 'react-icons/io'
import Container from '../Container'
import HomeJoomlaOld from './HomeOld'
import imgSrc from '../../utils/imgSrc'
import { Link } from 'react-router-dom'
import Reductions from './Reductions'
import BuyDirect from './BuyDirect'
import SwiperF from '../Swiper'

const breakPointsProduct = {
    0: {
        slidesPerView: 2,
        spaceBetween: 10
    },
    740: {
        slidesPerView: 2,
        spaceBetween: 10
    },
    830: {
        slidesPerView: 3,
        spaceBetween: 10
    },

    900: {
        slidesPerView: 4,
        spaceBetween: 10
    },
    1200: {
        slidesPerView: 5,
        spaceBetween: 10
    },
    1600: {
        slidesPerView: 6,
        spaceBetween: 10
    },
    8000: {
        slidesPerView: 6,
        spaceBetween: 10
    }
}

const breakPointsCateg = {
    0: {
        slidesPerView: 2.5,
        spaceBetween: 10
    },
    390: {
        slidesPerView: 3.75
    },
    580: {
        slidesPerView: 4.5,
        spaceBetween: 10
    },
    740: {
        slidesPerView: 5,
        spaceBetween: 10
    },
    830: {
        slidesPerView: 5,
        spaceBetween: 10
    },

    900: {
        slidesPerView: 6,
        spaceBetween: 10
    },
    1200: {
        slidesPerView: 6,
        spaceBetween: 10
    },
    1600: {
        slidesPerView: 6,
        spaceBetween: 10
    },
    8000: {
        slidesPerView: 6,
        spaceBetween: 10
    }
}

export default function HomeJoomla() {
    const [options, setOptions] = useState<OptionsFilter>({
        limit: 12,
        page: 1,
        categoryId: null,
        minPrice: null,
        maxPrice: null
    })
    const [filter, setFilter] = useState(getFilter(options))
    // return <HomeJoomlaOld/>
    const { data: cats } = useGetAllCategoriesService(20, 0, ApiConfig.swrStop)
    const { data: prods, isLoading: loadingProds, error } = useGetAllProductsByFilterService(filter)
    const { data: prods2 } = useGetAllProductsByFilterService("?limit=4&page=1")
    const { t } = useTranslation()
    const srcBg = "https://joomladz.com/files/bg.mp4"
    const srcBgMobil = "https://joomladz.com/files/bg-mobile.mp4"
    return (
        <div>
            <div className='relative '>
                <div className="absolute inset-0 overflow-hidden bg-black/90">
                    <video playsInline autoPlay muted preload="auto" loop className='min-w-full opacity-40 min-h-full absolute h-auto w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden' >
                        <source src={srcBg} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <video playsInline autoPlay muted preload="auto" loop className='min-w-full opacity-40 min-h-full absolute h-auto w-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden max-sm:block' >
                        <source src={srcBgMobil} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>


                <div className=' gap-4 relative  flex items-center  flex-col min-h-[calc(100vh-96px)] '>

                    <h1 className='text-5xl font-bold mt-[10%] [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] text-white text-center max-w-[80%] max-sm:text-3xl'>Le meilleur du commerce de gros, livré à votre porte</h1>
                    <p className='text-lg text-center text-white max-w-[80%]'>Votre expérience de sourcing commence ici.</p>
                    <div className="px-4 max-w-lg w-full">
                        <Input

                            suffix={
                                <Link to="/categories" >
                                    <Button size='lg' onClick={() => {

                                    }} className="ltr:rounded-l-none rtl:rounded-r-none" type="button">
                                        Search
                                    </Button></Link>
                            }

                            placeholder={"Search products "}
                            inputClassName="pe-0 bg-white !border-none !shadow-none ring-none "
                            size='lg'

                            className="mt-4  w-full  !border-none !shadow-none rounded-full overflow-hidden"

                            onChange={(e) => {

                            }}
                            label=""
                        />
                    </div>
                    <div className='p-6 py-10 w-full flex justify-center'>
                        <div className='max-w-2xl w-full'>
                            <SwiperF

                                breakpoints={breakPointsCateg}
                                swiperProps={{
                                    // centeredSlides:true,
                                    // slidesPerView:'auto',

                                    spaceBetween: 0
                                }}

                                items={[
                                    ...cats?.data ? [
                                        <Link to={"/categories"} className='flex gap-2   items-center justify-center flex-col   cursor-pointer box-border rounded-lg hover:bg-slate-100'>
                                            <div className='pt-[100%] shadow-black/40    shadow-2xl rounded-lg w-full relative overflow-hidden '>
                                                <div className="absolute  bg-cover inset-0 bg-image" style={{
                                                    backgroundImage: "url('https://joomladz.com/files/allcat.png')"
                                                }}>

                                                </div>
                                            </div>

                                        </Link>
                                    ] : [],
                                    ...cats?.data.map((el, k) => {
                                        return <Link to={"/categories/" + el.id} className='flex group gap-2    items-center justify-center flex-col   cursor-pointer box-border rounded-lg hover:bg-slate-100' key={k}>
                                            <div className='pt-[100%] shadow-black/40    shadow-2xl rounded-lg w-full relative overflow-hidden  '>
                                                <div className="absolute transition duration-300 group-hover:scale-110  bg-cover inset-0 bg-image" style={{
                                                    backgroundImage: "url('" + el.image + "')"
                                                }}>

                                                </div>
                                                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/30 to-transparent">
                                                    <div className='p-1'>
                                                        <span className='text-sm  font-medium  capitalize text-white'>
                                                            {el.name.toLocaleLowerCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        </Link>

                                    }) ?? []
                                    
                                ]
                                }
                            />
                        </div>

                    </div>

                </div>
            </div>
            {/* <h1 className='text-3xl text-center  font-semibold mt-12'>
                {t("categs")}
            </h1> */}

            {/* <Container> */}
            {/* <div className='bg-[#] p-4  m-auto'>


                <div className='grid grid-cols-4 max-sm:grid-cols-1 mt-4 gap-4'>
                    <div className="col-span-1 w-full">
                        <div className=" w-full   p-0 bg-white border   flex flex-col  max-[560px]:col-span-full rounded-md overflow-hidden">
                            <h1 className='p-3 px-3.5 flex items-center gap-2 text-base font-medium'>
                                <IoMenuSharp className='text-lg' />
                                {t("categs")}
                            </h1>
                            <div className="border  opacity-40 mb-2"></div>
                            <div className="gap-0.5 flex flex-col px-2">
                                {
                                    cats?.data.map((el, k) => {
                                        return <div className='flex gap-2 items-center py-1.5 px-2  cursor-pointer box-border rounded-lg hover:bg-slate-100' key={k}>
                                            <Avatar
                                                customSize={32}
                                                name=""
                                                src={el.image}
                                            />
                                            <span className='text-base font-normal capitalize'>
                                                {el.name.toLocaleLowerCase()}
                                            </span>
                                            <div className="grow"></div>
                                            <IoIosArrowDown className='text-sm text-gray-400' />
                                        </div>

                                    })
                                }
                            </div>

                        </div>
                        <div className=" w-full mt-4  p-0 bg-white border   flex flex-col  max-[560px]:col-span-full rounded-md overflow-hidden">
                            <h1 className='p-3 px-3.5 flex items-center gap-2 text-base font-medium'>
                                <IoMenuSharp className='text-lg' />
                                Special Offers!
                            </h1>
                            <div className="border  opacity-40 mb-2"></div>
                            <div className="gap-0.5 flex flex-col px-2">
                                {
                                    prods2?.data.map((el, k) => {
                                        return <Link to={"/product/" + el.slugName} className='flex gap-2 items-center py-1.5 px-2  cursor-pointer box-border rounded-lg hover:bg-slate-100' key={k}>
                                            <img className='h-20 w-16 object-cover' src={imgSrc(el.images[0], true)} alt="" />
                                            <div>
                                                <h1 className='line-clamp-2 text-sm'>
                                                    {el.name}
                                                </h1>
                                                <span className='font-semibold text-base'>
                                                    {el.price} DZD
                                                </span>
                                            </div>
                                        </Link>
                                    })
                                }
                            </div>
                            {
                                prods2?.data && prods2?.data.length != 0 && <div className='rounded-lg m-2 mt-4 relative pt-[140%]  bg-cover bg-no-repeat bg-center' style={{
                                    backgroundImage: "url('" + imgSrc(prods2.data[0].images[0], true) + "')"
                                }}>
                                    <div className="absolute bottom-4 gap-2 right-0 left-0 flex items-center justify-center">
                                        {
                                            [
                                                {
                                                    number: "335",
                                                    label: "Days"
                                                },
                                                {
                                                    number: "6",
                                                    label: "Hours"
                                                },
                                                {
                                                    number: "53",
                                                    label: "Mins"
                                                },
                                                {
                                                    number: "41",
                                                    label: "Secs"
                                                },
                                            ].map((el, k) => {
                                                return <div className='h-12 w-12 bg-white flex items-center justify-center flex-col'>
                                                    <h1 className='text-base font-bold'>{el.number}</h1>
                                                    <span className='text-sm font-medium'>{el.label}</span>
                                                </div>
                                            })
                                        }
                                    </div>

                                </div>
                            }
                        </div>

                    </div>

                </div>
            </div> */}
            <div className='p-2 pb-10 pt-6 '>
                <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-1 ">
                    {
                        [
                            "https://joomladz.com/files/del1.png",
                            "https://joomladz.com/files/del2.png",
                            "https://joomladz.com/files/del3.png"
                        ].map((el, k) => {
                            return <div className={'relative '}>
                                <img src={el} key={k} className='object-cover relative rounded-md  h' alt="" />
                                {/* <div className="absolute top-0 right-0 bottom-0 w-7 bg-white/80"></div> */}
                                {/* <div className="absolute top-0 left-0 bottom-0 w-7 bg-red-500/80"></div> */}
                                {/* {k!=0&&<svg height={"100%"} className='w-7 h-full absolute top-0 left-0 bottom-0 ' viewBox='0 0 2 10'>
                                    <polygon
                                        points="0,-3 2,5 0,13"
                                        style={{ fill: 'white', stroke: 'black', strokeWidth: 0 }}
                                    />
                                </svg>}
                                {k!=2&&<svg height={"100%"} className='w-7 h-full absolute top-0 right-0 bottom-0 ' viewBox='0 0 2 10'>
                                    <polygon
                                        points="0,-3 2,5 0,13 2,13 2,-3"
                                        style={{ fill: 'white', stroke: 'black', strokeWidth: 0 }}
                                    />
                                </svg>} */}
                            </div>
                        })
                    }
                </div>
            </div>
            <h1 className='text-3xl   font-semibold mt-12 px-6'>
                Special Offers!
            </h1>
            <div className="   p-6 py-10 ">

                <SwiperF

                    breakpoints={breakPointsProduct}
                    items={[
                        ...prods?.data.map((el, k) => {
                            return <div className="">
                                <ProductCard data={el} key={k} imageClassName='rounded-lg' />
                            </div>
                        }) ?? []
                    ]
                    }
                />
            </div>


            {/* </Container> */}
            <BuyDirect />

            <Reductions />
        </div>

    )
}
