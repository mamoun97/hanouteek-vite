
import Container from '../Container'
import { useGetAllCategoriesService } from '../../Api/Services'
import ApiConfig from '../../Api/ApiConfig'
import { Avatar } from 'rizzui'
import SwiperF from '../Swiper'
import { useTranslation } from 'react-i18next'
import { IoMenuSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import images from '../../assets'
const breakPointsProduct = {
    0: {
        slidesPerView: 1,
        spaceBetween: 0
    },
    8000: {
        slidesPerView: 1,
        spaceBetween: 0
    }
}
const dt=[
    images.joomla,
    images.joomla,
    images.joomla,
    images.joomla,
    images.joomla,
]
const dt2=[
    images.joomla_prod1,
    images.joomla_prod2,
    images.joomla_prod3,
    images.joomla_prod4,
]


export default function JoomlaHeader() {
    const { t } = useTranslation()
    
    const { data: cats } = useGetAllCategoriesService(20, 0, ApiConfig.swrStop)
    return (
        <div className='  p-4 py-8 bg-[#]'>
            <Container className='grid grid-cols-4 max-md:grid-cols-3 gap-2 min-h-[430px]'>
                <div className=" col-span-1 p-0 bg-white border   flex flex-col  max-[560px]:col-span-full rounded-md overflow-hidden">
                    <h1 className='p-3 px-3.5 flex items-center gap-2 text-base font-medium'>
                        <IoMenuSharp className='text-lg' />
                        {t("categs")}
                    </h1>
                    <div className="border  opacity-40 mb-2"></div>
                    <div className="gap-0.5 flex flex-col px-2">
                        {
                            cats?.data.map((el, k) => {
                                return <Link to={"/categories/" + el.id}>
                                    <div className='flex gap-2 items-center py-1.5 px-2  cursor-pointer box-border rounded-lg hover:bg-slate-100' key={k}>
                                        <Avatar
                                            customSize={32}
                                            name=""
                                            src={el.image}
                                        />
                                        <span className='text-base font-medium capitalize'>
                                            {el.name.toLocaleLowerCase()}
                                        </span>
                                    </div>
                                </Link>

                            })
                        }
                    </div>

                </div>
                <div className='col-span-2 max-[560px]:col-span-full max-[560px]:h-72 rounded-md overflow-hidden'>
                    <SwiperF
                        autoPlay={true}
                        className='w-full h-full'
                        breakpoints={breakPointsProduct}
                        swiperProps={{
                            autoplay: {
                                delay: 2500,
                                disableOnInteraction: false,
                            }
                        }}

                        items={[
                            ...dt2.map((el, k) => {
                                return <div key={k + "sz"} className="w-full h-full bg-center bg-cover bg-no-repeat"
                                    style={{
                                        backgroundImage: "url('" + el + "')"
                                    }}>

                                </div>
                            })

                        ]
                        }
                    />
                </div>
                <div className='grid grid-rows-2 max-md:grid-cols-2 max-md:grid-rows-1 max-[420px]:grid-cols-1 col-span-1 max-md:col-span-3  gap-2'>
                    <div className="bg-white border p-4 py-2 grid grid-rows-3 gap-2  rounded-md overflow-hidden">
                        {
                            [
                                {
                                    img: "https://dz.jumia.is/cms/0000_21_Destockage_JA/1.png",
                                    text: "Centre D'Assistance"
                                },
                                {
                                    img: "https://dz.jumia.is/cms/0000_21_Destockage_JA/2.png",
                                    text: "Retour Facile"
                                },
                                {
                                    img: "https://dz.jumia.is/cms/0000_21_Destockage_JA/3.png",
                                    text: "Points retrait"
                                }
                            ].map((el, k) => {
                                return <div key={k} className="flex items-center gap-2">
                                    <img src={el.img} className='object-fill h-8 w-8' alt="" />
                                    <span className='text-lg'>{el.text}</span>
                                </div>
                            })
                        }
                        <div className="flex">

                        </div>
                    </div>
                    <div className='bg-cover bg-no-repeat bg-center' style={{
                        backgroundImage:"url('"+dt[4]+"')"
                    }}>
                    {/* <img src={dt[4]} className='object-cover w-full h-full rounded-md' alt="" /> */}
                    </div>
                </div>

            </Container>
        </div>
    )
}
