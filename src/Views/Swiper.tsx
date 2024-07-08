import styled from "styled-components"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import { RootState } from "../Store";
import { ThemeSetting } from "../Types/ThemeSetting";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";




const DivC = styled.div`
.swiper-slide{
    height: auto;
}
.swiper-button-prev,.swiper-button-next{
    
    width:46px;
    height:46px;
    background-color:#0000;
    border-radius:50%;
    
    color:#FFF;  
}
.swiper-button-prev:after,.swiper-button-next:after{
    font-size: 22px!important;
}
.swiper-button-prev:hover,.swiper-button-next:hover{
    background-color:#0006;
}
.swiper-button-prev.swiper-button-disabled,.swiper-button-next.swiper-button-disabled{
    opacity: 0;
}
/*  */
@media screen and (max-width:600px){
    .swiper-button-prev,.swiper-button-next{
        width:34px;
        height:34px;
    } 
    .swiper-button-prev:after,.swiper-button-next:after {
        font-size:18px!important
    }  
}
.swiper-pagination{
    /* top: 100%; */
    bottom: 0;
    background: linear-gradient(0deg,#0006,transparent);
}
.swiper-pagination-bullet {
  width: 12px;
  height: 4px;
  text-align: center;
  line-height: 20px;
  font-size: 12px;
  color: #000;
  opacity: 1;
  border-radius: 2px;
  transition: width .2s;
  margin: 2px!important;
  background: #FFF7;
}

.swiper-pagination-bullet-active {
  color: #fff;
  width: 28px;
  background: #FFF;
}

`


function SwiperF({ breakpoints = {},className="",autoPlay=false, items = [], swiperProps = {},withPagination=false }: {
    swiperProps?: any,
    breakpoints?: any,
    autoPlay?:boolean,
    withPagination?:boolean,
    items?: Array<any>,
    className?:string
}) {
    const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
    const {i18n}=useTranslation()
    return (
        <DivC  theme={theme.theme} className={className}>

            <Swiper
            style={{ width: '100%', height: '100%' }}
                key={i18n.language}
                dir={i18n.language=="ar"?"rtl":"ltr"}
                spaceBetween={30}
                modules={[Navigation, ...withPagination?[Pagination]:[],...autoPlay?[Autoplay]:[]]}
                navigation
                pagination={{ 
                    clickable: true,
                    renderBullet: function (index, className) {
                        if(index){}
                        return '<span class="' + className + '"></span>';
                      },
                 }}
                 onClickCapture={(e)=>{
                    // console.log(e)
                 }}
                 onSwiper={(e)=>{
                    // console.log(e)
                 }}
                breakpoints={breakpoints}
                className="mySwiper"
                {...swiperProps}
                
            >
                {
                    items.map((el: any, index: any) => {


                        return <SwiperSlide key={index}>
                            {el}
                        </SwiperSlide>

                    })
                }
            </Swiper>
        </DivC>
    )
}






export default SwiperF

