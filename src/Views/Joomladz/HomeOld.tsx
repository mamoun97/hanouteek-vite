
import { useGetAllCategoriesService } from '../../Api/Services'
import ApiConfig from '../../Api/ApiConfig'
import { Button } from 'rizzui'
import Container from '../Container'

import ProductsList from './ProductList'
import CountdownTimer from './Timer'
import JoomlaHeader from './JoomlaHeader'
import imgSrc from '../../utils/imgSrc'
import images from '../../assets'
const imgs=[
    images.joomla,
    images.joomla,
    images.joomla,
    images.joomla,
    images.joomla,
]
export default function HomeJoomlaOld() {
    const { data: cats } = useGetAllCategoriesService(20, 0, ApiConfig.swrStop)
    return (
        <div className='bg-[#FDFDFD]'>
            <JoomlaHeader />
            <Container>
                {cats?.data&&cats.data.length!=0&&<div className='shadow bg-white my-3 p-3 rounded-md'>
                    <div className='grid grid-cols-6 max-md:grid-cols-5 max-sm:grid-cols-4 max-[550px]:grid-cols-3 gap-2 '>
                        {
                            cats.data.map((el, k) => {
                                return <div className='relative rounded-lg overflow-hidden pt-[100%]' key={k}>
                                    <div className="absolute top-0 border left-0 w-full h-full bg-cover bg-no-repeat bg-center"
                                        style={{
                                            backgroundImage: "url('" + imgSrc(el.image) + "')"
                                        }}></div>

                                </div>
                            })
                        }
                    </div>
                </div>}
                <div className='shadow bg-white my-3 p-2 rounded-md'>
                    <div className='grid grid-cols-2 gap-2 max-sm:grid-cols-1'>
                        <img className='h-[280px] rounded-lg object-fill' src={imgs[4]} alt="" />
                        <img className='h-[280px] rounded-lg object-fill' src={imgs[4]} alt="" />
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
                        <img className='h-[240px] w-full rounded-lg object-cover' src={imgs[4]} alt="" />
                        <img className='h-[240px] w-full rounded-lg object-cover' src={imgs[4]} alt="" />
                        <img className='h-[240px] w-full rounded-lg object-cover' src={imgs[4]} alt="" />
                        <img className='h-[240px] w-full rounded-lg object-cover' src={imgs[4]} alt="" />
                        <img className='h-[240px] w-full rounded-lg object-cover' src={imgs[4]} alt="" />
                        <img className='h-[240px] w-full rounded-lg object-cover' src={imgs[4]} alt="" />
                    </div>

                </div>
                <div className="pt-6"></div>
            </Container>
        </div>
    )
}
