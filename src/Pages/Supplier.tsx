
import DataF from '../Constants/DataF'
import { useParams } from 'react-router-dom'
import Container from '../Views/Container'
import { useGetAllProductsByFilterService } from '../Api/Services'
import ProductCard from '../Views/ProductCard'
import Loading from '../Constants/Loading'
import CartEmpty from '../Views/CartEmpty'
import useLang from '../hoock/useLang'
type Param = {
    id: string
}
export default function Supplier() {
    const { t } = useLang();
    const { id } = useParams<Param>()
    const supplier = DataF[Number(id)]
    const { data: prods, isLoading: loadingProds, error } = useGetAllProductsByFilterService("?limit=15&page=1")
    if (!supplier) return "404"
    return (
        <div >
            <div className=' bg-image ' style={{
                backgroundImage: "url('https://scontent.fqsf1-1.fna.fbcdn.net/v/t1.15752-9/461652258_918512403669239_6833643819655426019_n.png?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGE31lRSdEYgg2mt00jQYkWBCxLautnKYsELEtq62cpixusgP4mmImdyLwM1cdn5tLKqVCoaT5cS8YQcbNIYUr_&_nc_ohc=fBVYpAaZv1UQ7kNvgGX4yfW&_nc_ht=scontent.fqsf1-1.fna&oh=03_Q7cD1QFsZy-kB0Xp4-17MBeIEzQf1YB1Y4oJl6OcLxGSZbD-6g&oe=672331D9')"
            }}>
                <Container className='relative h-[calc(65vh)]'>
                    {
                        supplier.mediaUrls?.logoImage && <img
                            className='absolute bottom-0 translate-y-1/2 bg-card left-4 w-20 h-20 rounded-full'
                            src={"https://scontent.fqsf1-1.fna.fbcdn.net/v/t1.15752-9/461091070_883395350402492_7766158947118720732_n.jpg?stp=dst-jpg_s2048x2048&_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEzI64AFimpYVhKQq4wpwDffUnhHFG0IAB9SeEcUbQgAB0RvdInPbELJ9Ki9r1N7WnSQMWDPTH8hQL1L8-adzjQ&_nc_ohc=KJHld99q9j8Q7kNvgFdgxzo&_nc_ht=scontent.fqsf1-1.fna&oh=03_Q7cD1QHs2SiBWIxfnwMpk0p22ZwWWwzcxy_dlaJBfPlQdUZmOw&oe=672344D0"} />

                    }
                </Container>
            </div>
            <div className="mt-24"></div>
            {supplier.description&&<div className='flex justify-center'>

                <p className='mb-6 text-lg tracking-widest text-center max-w-4xl'>
                    {supplier.description}
                </p>
            </div>}
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
        </div>
    )
}
