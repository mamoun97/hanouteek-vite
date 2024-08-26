
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

    return (
        <div>
            <div className='bg-cover bg-no-repeat bg-center' style={{
                backgroundImage: "url('https://scontent.fqsf1-2.fna.fbcdn.net/v/t1.15752-9/449719407_363234759930358_3623500867486704653_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEvlmCCn7_AfyYVZKStdXgHA-sVJqXuOKQD6xUmpe44pPrhQrsUnzTXrJUOkdZ16MsqtN8EOrbsO9fCG0DIl2jc&_nc_ohc=EsP5sFqX40AQ7kNvgEBAtZA&_nc_ht=scontent.fqsf1-2.fna&cb_e2o_trans=t&oh=03_Q7cD1QEQZ-AwIvSCeTm-lI-aKCslrIpWPO3L5Fu4J7JAT8OWVw&oe=66C47FF3')"
            }}>
                <div className='bg-[#0004] gap-4 flex items-center justify-center flex-col h-[calc(100vh-96px)] '>

                    <h1 className='text-5xl font-bold text-white text-center max-w-[80%] max-sm:text-3xl'>Le meilleur du commerce en gros, livré à votre porte</h1>
                    <p className='text-lg text-white text-center max-w-[80%]'>Votre partenaire de confiance pour des achats en gros à prix imbattables.</p>
                    <div className="px-4">
                        <Input

                            suffix={
                                <Link to="/categories" >
                                <Button size='lg' onClick={() => {
                                    
                                }} className="ltr:rounded-l-none rtl:rounded-r-none" type="button">
                                    Search
                                </Button></Link>
                            }

                            placeholder={"Search your products from here"}
                            inputClassName="pe-0 bg-white !border-none !shadow-none ring-none "
                            size='lg'

                            className="mt-4 w-full max-w-lg !border-none !shadow-none"

                            onChange={(e) => {

                            }}
                            label=""
                        />
                    </div>

                </div>
            </div>

            {/* <Container> */}
            <div className='bg-[#] p-4  m-auto'>

                <div className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
                    {
                        [
                            images.cash_del,
                            images.exp_del,
                            images.gift
                        ].map((el, k) => {
                            return <img src={el} key={k} className='object-cover h' alt="" />
                        })
                    }
                </div>
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
                    <div className="col-span-3 grid grid-cols-4 gap-4 bg-gray-100 p-2 max-sm:grid-cols-2">
                        {

                            prods?.data.map((el, k) => {
                                return <div className="col-span-1">
                                    <ProductCard data={el} key={k} showFull={true} />
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            {/* </Container> */}
        </div>

    )
}
