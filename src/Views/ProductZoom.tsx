import { useState, useEffect } from 'react'
import styled from "styled-components"
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

import SwiperF from './Swiper';
import LazyLoad from "./LazyLoad.jsx"
import imgs from '../assets/index.js';
import Swiper from 'swiper';
import { useTranslation } from 'react-i18next';
import imgSrc from '../utils/imgSrc.js';
import ApiConfig from '../Api/ApiConfig.js';

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
type TypeType = "default" | "type1"
function ProductZoom({ data, detect = null, type = "default" }: {
    data: Product,
    type?: TypeType,
    detect?: string | null
}) {
    if (type == "default") return <ProductZoomDefault {...{ data, detect }} />
    if (type == "type1") return <ProductZoomType1 {...{ data, detect }} />
}

function ProductZoomDefault({ data, detect = null }: {
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
    const promo = !!data.CompareAtPrice ? Math.ceil(100 - data.price * 100 / data.CompareAtPrice) : 0

    return <DivC key={data.id}>
        <SwiperF
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
                (images.length ? [...images] : [imgs.img_notfound]).map((el, index) => {

                    return <div key={index}>
                        <div style={{ position: "relative", paddingTop: "100%", width: "100%", height: 0 }} className="d-flex align-items-center justify-content-center responsive-img">
                            <div className='pa'>
                                <LazyLoad
                                    key={index}
                                    alt={el != imgs.img_notfound ? imgSrc(el, true) : imgs.img_notfound}
                                    src={el != imgs.img_notfound ? imgSrc(el, true) : imgs.img_notfound}
                                    height={"100%"}
                                    onClick={() => {

                                    }}
                                />
                            </div>
                            {
                                !!promo ? <div dir="ltr" className={` absolute top-1 text-sm font-semibold left-1 flex justify-center items-center  text-white rounded-full h-14 w-14 max-sm:h-12 max-sm:w-12 max-sm:px-1 max-sm:text-[12px] ${data.category.id==ApiConfig.categPrv ? "bg-rose" : "bg-primary"}`}
                                >
                                    {
                                        -promo
                                    } %
                                </div> : null
                            }

                        </div>
                    </div>
                })
            }
        />
    </DivC>
}
function ProductZoomType1({ data, detect = null }: {
    data: Product,
    detect?: string | null
}) {
    const { i18n } = useTranslation()
    const images = [
        ...data.images,
        ...data.attribute.options.filter(el => !!el.image)?.map((el) => el.image)
    ]
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [swiper, setSwiper] = useState<Swiper | null>(null);
    const [swiper2, setSwiper2] = useState<Swiper | null>(null);
    useEffect(() => {

        if (!!detect) {
            setActiveIndex(images.indexOf(detect))
            swiper?.slideTo(images.indexOf(detect), 500)
            swiper2?.slideTo(images.indexOf(detect), 500)
        }
    }, [detect])
    const [count, setCount] = useState(0)
    useEffect(() => {
        setCount(count + 1)
    }, [i18n.language])
    const handleThumbnailClick = (index: number) => {
        setActiveIndex(index)
        swiper2?.slideTo(index, 500);
        swiper?.slideTo(index, 500);
    };
    return <DivC key={data.id}>
        <SwiperF
            swiperProps={{
                onSwiper: (swiper: any) => setSwiper(swiper),
                onSlideChange: (s) => {
                    handleThumbnailClick(s.activeIndex)
                }


            }}
            withPagination={false}

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
                (images.length ? [...images] : [imgs.img_notfound]).map((el, index) => {

                    return <div key={index}>
                        <div style={{ position: "relative", paddingTop: "100%", width: "100%", height: 0 }} className="d-flex align-items-center justify-content-center responsive-img rounded-xl overflow-hidden">
                            <div className='pa rounded-t-2xl overflow-hidden'>
                                <LazyLoad
                                    key={index}
                                    alt={el != imgs.img_notfound ? imgSrc(el, true) : imgs.img_notfound}
                                    src={el != imgs.img_notfound ? imgSrc(el, true) : imgs.img_notfound}
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
        <div className='overflow-hidden rounded-b-[20px]'>
            <SwiperF
                swiperProps={{
                    onSwiper: (swiper: any) => setSwiper2(swiper),
                    onSlideChange: (s) => {
                        handleThumbnailClick(s.activeIndex)
                    }

                }}

                withPagination={false}

                breakpoints={
                    {
                        0: {
                            slidesPerView: 4,
                            spaceBetween: 0
                        },
                        740: {
                            slidesPerView: 5,
                            spaceBetween: 0
                        },
                        830: {
                            slidesPerView: 6,
                            spaceBetween: 0
                        },

                        900: {
                            slidesPerView: 6,
                            spaceBetween: 0
                        },
                        1200: {
                            slidesPerView: 6,
                            spaceBetween: 0
                        },
                        8000: {
                            slidesPerView: 6,
                            spaceBetween: 0
                        }
                    }
                }
                items={
                    (images.length ? [...images] : [imgs.img_notfound]).map((el, index) => {

                        return <div key={index}>
                            <div style={{ position: "relative", paddingTop: "100%", width: "100%", height: 0 }} className="d-flex align-items-center justify-content-center responsive-img">
                                <div className={'pa  border-2 border-white opacity-80 overflow-hidden ' + (activeIndex == index ? "!border-0 !opacity-100" : "")} onClick={() => {
                                    handleThumbnailClick(index)
                                }}>
                                    <LazyLoad
                                        key={index}
                                        alt={el != imgs.img_notfound ? imgSrc(el, true) : imgs.img_notfound}
                                        src={el != imgs.img_notfound ? imgSrc(el, true) : imgs.img_notfound}
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
        </div>
    </DivC>
}

export default ProductZoom
















