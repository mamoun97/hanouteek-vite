import { useState, useEffect } from 'react'
import styled from "styled-components"
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

import SwiperF from './Swiper';
import LazyLoad from "./LazyLoad.jsx"
import ApiConfig from '../Api/ApiConfig';
import Swiper from 'swiper';
import { useTranslation } from 'react-i18next';

const DivC = styled.div`

margin-bottom: 20px;
position: sticky;
 top: 58px;
 display: flex;
 flex-direction: column;

.images{
    padding:10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.image{
    width: 50px;
    height:50px;
    background-color: #FFF;
    display:flex;
    align-items:center;
    justify-content:center;
    /* float: left; */
    margin: 5px;
    border:1px solid #F0F0F0;
    cursor: pointer;
}
.images .image:hover{
}
.image img{
    max-width: 100%;
    max-height: 100%;
    width:auto;
    height:auto;
}
figure.iiz{
     width:100%
}
.iiz{
   height: 100%;
}
.iiz__img{
    /* width:100% */
}
.iiz__zoom-img--visible {
    min-width:130%;
    min-height:130%;
    transform:translate(0%);
}
.pa{
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
}
.pa span,.pa span img{
    min-height:100% ;
    min-width:100% ;
}
.pa img{
    width:100%;
    height:100%;
    object-fit: cover;
}
.responsive-img{
  overflow: hidden;
  border-radius: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.responsive-img img{
  position: relative;
  width:100%;
  height:auto;
  max-width: 100%;
  max-height: 100%;
}
`

function ProductZoom({ data, detect=null }: {
    data: Product,
    detect?: string | null
}) {

    const { i18n } = useTranslation()
    const images = [
        ...data.images,
        ...data.attribute.options.filter(el => !!el.image)?.map((el) => el.image)
    ]

    const [swiper, setSwiper] = useState<Swiper | null>(null);
    useEffect(() => {

        if (!!detect)
            swiper?.slideTo(images.indexOf(detect), 500)
    }, [detect])
    const [count, setCount] = useState(0)
    useEffect(() => {
        setCount(count + 1)
    }, [i18n.language])
    const z = <SwiperF
        swiperProps={{
            onSwiper: (swiper: any) => setSwiper(swiper)
        }}
        withPagination={true}
        breakpoints={
            {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 0
                },
                8000: {
                    slidesPerView: 1,
                    spaceBetween: 0
                }
            }
        }
        items={
            images.map((el, index) => {
                let src = ApiConfig.rootUrl + "/" + el
                return <div key={index}>
                    <div style={{ position: "relative", paddingTop: "100%", width: "100%", height: 0 }} className="d-flex align-items-center justify-content-center responsive-img">
                        <div className='pa'>
                            <LazyLoad
                                key={index}
                                alt={data.name}
                                src={src}
                                height={"100%"}
                                onClick={() => {

                                }}
                            />
                        </div>

                    </div>
                </div>
            })
        }
    />






    return <DivC> {
        count % 2 == 0 ? <div className='relative'>
            {z}

        </div> : z}
        {/* <div className="absolute top-0 left-0 right-0 z-30">
            {
                data.hasOffer && <OfferCard prod={data} />
            }
        </div> */}
    </DivC>
}

export default ProductZoom
















