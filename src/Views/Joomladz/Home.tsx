
import { useGetAllCategoriesService } from '../../Api/Services'
import ApiConfig from '../../Api/ApiConfig'
import { Avatar, Button } from 'rizzui'
import Container from '../Container'
import SwiperF from '../Swiper'
import ProductsList from './ProductList'
import CountdownTimer from './Timer'
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
const dt = [
    "https://dz.jumia.is/cms/0000000_JA24/0_Destockage/Freedel_Dest_SX.png",
    "https://dz.jumia.is/cms/0000000_JA24/0_Destockage/fs/2/SX_VF26-6.jpg",
    "https://dz.jumia.is/cms/0000000_JA24/0_Destockage/UND/summersx.png",
    "https://dz.jumia.is/cms/0000000001/sxbna.png",
]

export default function HomeJoomla() {
    const { data: cats, isLoading } = useGetAllCategoriesService(20, 0, ApiConfig.swrStop)
    return (
        <div className='bg-[#ff9900]'>
            <div className='  p-4 py-8'>
                <Container className='grid grid-cols-4 max-md:grid-cols-3 gap-2'>
                    <div className="border col-span-1 p-4 bg-white rounded-lg shadow flex flex-col gap-2 max-[560px]:col-span-full">
                        {
                            cats?.data.map((el, k) => {
                                return <div className='flex gap-2 items-center p-2 py-1 cursor-pointer'>
                                    <Avatar
                                        customSize={22}
                                        name=""
                                        src={el.image}
                                    />
                                    <span className='text-sm font-medium capitalize'>
                                        {el.name.toLocaleLowerCase()}
                                    </span>
                                </div>
                            })
                        }
                    </div>
                    <div className='col-span-2 max-[560px]:col-span-full max-[560px]:h-72'>
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
                                ...dt.map((el, k) => {
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
                        <div className="bg-white p-4 py-2 grid grid-rows-3 gap-2 rounded-lg">
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
                        <img src="https://dz.jumia.is/cms/00000000_2023Compaign/JFORCETN.gif " className='object-fill w-full h-full' alt="" />
                    </div>

                </Container>

            </div>
            <Container>
                <div className='shadow bg-white my-3 p-3 rounded-md'>
                    <div className='grid grid-cols-6 max-md:grid-cols-5 max-sm:grid-cols-4 max-[550px]:grid-cols-3 gap-2 '>
                        {
                            cats?.data.map((el, k) => {
                                return <div className='relative rounded-lg overflow-hidden pt-[100%]'>
                                    <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center"
                                        style={{
                                            backgroundImage: "url('" + el.image + "')"
                                        }}></div>

                                </div>
                            })
                        }
                    </div>
                </div>
                <div className='shadow bg-white my-3 p-2 rounded-md'>
                    <div className='grid grid-cols-2 gap-2 max-sm:grid-cols-1'>
                        <img className='h-[280px] rounded-lg object-fill' src="https://dz.jumia.is/cms/0000000_JA24/0_Destockage/fs/brany_fs-db.png" alt="" />
                        <img className='h-[280px] rounded-lg object-fill' src="https://dz.jumia.is/cms/0000000_JA24/0_Destockage/fs/midea_fs-db.png" alt="" />
                    </div>
                </div>
                <div className='shadow bg-white my-3 rounded-md'>

                    <div className="flex justify-between items-center text-xl font-semibold bg-red-600 text-white p-2">
                        <h1 className=''>
                            Ventes Flash : Vite, stock limité
                        </h1>
                        <div>
                            Termine dans: <CountdownTimer />
                        </div>

                        <Button variant='text' className='text-white' size='lg'>Voir plus</Button>
                    </div>
                    <div className="p-3">
                        <ProductsList />
                    </div>

                </div>
                <div className='shadow bg-white my-3 rounded-md'>

                    <div className="flex justify-between items-center text-xl font-semibold p-2">
                        <h1 className=''>
                        Vu récemment
                        </h1>
                       
                    </div>
                    <div className="p-3">
                        <ProductsList />
                    </div>

                </div>

                <div className='shadow bg-white my-3 rounded-md'>

                    <div className="flex justify-between items-center text-xl font-semibold p-3">
                        <h1 className=''>
                        Les plus demandés
                        </h1>
                       
                    </div>
                    <div className="p-3 pt-0">
                        <ProductsList />
                    </div>

                </div>

                <div className='shadow bg-white my-3 rounded-md'>

                    <div className="flex justify-center items-center text-xl font-semibold bg-red-100  p-2">
                    LES INCONTOURNABLES
                        
                    </div>
                    <div className='grid grid-cols-3 gap-2 max-sm:grid-cols-1 p-3'>
                        <img className='h-[210px] w-full rounded-lg object-fill' src="https://dz.jumia.is/cms/00000_Ramadan2023/Freelinks/TB/TVBIGAPPLID.png" alt="" />
                        <img className='h-[210px] w-full rounded-lg object-fill' src="https://dz.jumia.is/cms/00000000_2023Compaign/0FL_TB_HP/Tech/Phonestb.png" alt="" />
                        <img className='h-[210px] w-full rounded-lg object-fill' src="https://dz.jumia.is/cms/00000000_2023Compaign/0FL_TB_HP/Mode/Homme/Baskets378x252.png" alt="" />
                        <img className='h-[210px] w-full rounded-lg object-fill' src="https://dz.jumia.is/cms/00000000_2023Compaign/0FL_TB_HP/Mode/Femme/TB_montres551.png" alt="" />
                        <img className='h-[210px] w-full rounded-lg object-fill' src="https://dz.jumia.is/cms/00000000_2023Compaign/0FL_TB_HP/Appliances/Climatiseurs_Desk-1.png" alt="" />
                        <img className='h-[210px] w-full rounded-lg object-fill' src="https://dz.jumia.is/cms/00000000_2023Compaign/0FL_TB_HP/Beauty/Parfums_Desk-1.png" alt="" />
                    </div>

                </div>
                  <div className="pt-6"></div>  
            </Container>
        </div>
    )
}
