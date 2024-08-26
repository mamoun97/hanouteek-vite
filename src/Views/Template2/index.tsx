
import { Button } from 'rizzui'
import Container from '../Container'
import { useGetAllCategoriesService, useGetAllProductsService } from '../../Api/Services'
import ProductCard from '../ProductCard'


const prods = [
    {
        name: "Thermo Ball Etip Gloves",
        price: "2000 DZD",
        image: "https://preview.colorlib.com/theme/timezone/assets/img/gallery/new_product1.png"
    },
    {
        name: "Thermo Ball Etip Gloves",
        price: "2000 DZD",
        image: "https://preview.colorlib.com/theme/timezone/assets/img/gallery/new_product2.png"
    },
    {
        name: "Thermo Ball Etip Gloves",
        price: "2000 DZD",
        image: "https://preview.colorlib.com/theme/timezone/assets/img/gallery/new_product3.png"
    },
]
const p = [
    "https://preview.colorlib.com/theme/timezone/assets/img/gallery/popular1.png.webp",
    "https://preview.colorlib.com/theme/timezone/assets/img/gallery/popular2.png.webp",
    "https://preview.colorlib.com/theme/timezone/assets/img/gallery/popular3.png.webp",
    "https://preview.colorlib.com/theme/timezone/assets/img/gallery/popular4.png.webp",
    "https://preview.colorlib.com/theme/timezone/assets/img/gallery/popular5.png.webp",
    "https://preview.colorlib.com/theme/timezone/assets/img/gallery/popular6.png.webp",
]
export default function Template2() {
    const { data } = useGetAllProductsService(4, 0)
    const { data: cats } = useGetAllCategoriesService(5, 0)

    return (
        <div className='' >
            <div className='min-h-screen bg-contain bg-[#f0f0f2]  bg-no-repeat ' style={{
                backgroundPosition: "80% center",
                backgroundImage: "url('https://preview.colorlib.com/theme/timezone/assets/img/hero/watch.png')"
            }}>
                <Container className='flex flex-col gap-4 justify-center items-start min-h-screen'>

                    <h1 className='text-[54px] relative text-white mix-blend-exclusion pointer-events-none leading-[54px] tracking-wider max-w-md font-bold'>Select Your New Perfect Style</h1>
                    <p className='text-lg max-w-sm mb-8'>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat is aute irure.</p>
                    <Button className='min-w-[200px] rounded-none' size='lg'>
                        Shop Now
                    </Button>
                </Container>
            </div>

            <Container className='my-20'>
                <h1 className='text-2xl font-bold text-center'>New Arrivals</h1>
                <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-4 my-6'>
                    {
                        prods.map((el, k) => {
                            return <div key={k} className='' >
                                <div className=" p-0 text-center " >
                                    <img src={el.image} className='w-full' alt="" />
                                    <h1 className='text-xl  font-medium mt-4 text-center w-full'>{el.name}</h1>
                                    <p className='text-lg text-center text-red-600 w-full mt-4'>{el.price}</p>

                                </div>
                            </div>
                        })
                    }
                </div>

            </Container>
            <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4 grid-rows-2 max-sm:grid-rows-1 h-screen my-20">
                <div className="bg-cover bg-center bg-no-repeat row-span-2 max-sm:col-span-1 col-span-2" style={{
                    backgroundImage: "url('https://preview.colorlib.com/theme/timezone/assets/img/gallery/gallery1.png')"
                }}></div>
                <div className="bg-cover bg-center bg-no-repeat row-span-2" style={{
                    backgroundImage: "url('https://preview.colorlib.com/theme/timezone/assets/img/gallery/gallery2.png')"
                }}></div>
                <div className="bg-cover bg-center bg-no-repeat" style={{
                    backgroundImage: "url('https://preview.colorlib.com/theme/timezone/assets/img/gallery/gallery3.png')"
                }}></div>
                <div className="bg-cover bg-center bg-no-repeat" style={{
                    backgroundImage: "url('https://preview.colorlib.com/theme/timezone/assets/img/gallery/gallery4.png')"
                }}></div>
            </div>
            <Container>
                <div className="flex flex-col justify-center items-center mt-8">
                    <h1 className='text-2xl font-bold text-center'>Popular Items</h1>
                    <p className='text-center max-w-md'>
                        Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
                </div>
                <div className='grid grid-cols-3 max-sm:grid-cols-1 gap-4 my-6'>
                    {
                        p.map((el, k) => {
                            return <div key={k} className='' >
                                <div className=" p-0 text-center " >
                                    <img src={el} className='w-full' alt="" />
                                    <h1 className='text-xl  font-medium mt-4 text-center w-full'>Thermo Ball Etip Gloves</h1>
                                    <p className='text-lg text-center text-red-600 w-full mt-4'>2500 DZD</p>

                                </div>
                            </div>
                        })
                    }
                </div>

            </Container>

            <div className="mt-6">
                .
            </div>
        </div>
    )
}
