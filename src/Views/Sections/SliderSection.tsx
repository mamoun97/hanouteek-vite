import { Button } from "rizzui";
import ApiConfig from "../../Api/ApiConfig";
import { HomePageSection } from "../../Types/ThemeSetting";
import SwiperF from "../Swiper";
import { useTranslation } from "react-i18next";


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
const pos = {
  "center": "items-center",
  "left": "items-start",
  "right": "items-end"
}
export default function SliderSection({ data }: { data: HomePageSection }) {

  const { t } = useTranslation()
  return (
    <div className=" ">

      {
        data && <SwiperF

          breakpoints={breakPointsProduct}
          items={[
            ...data.sliders.map((el, k) => {
              return <div className="pt-[40%] min-h-[400px] border   overflow-hidden relative" key={k}
              >
                <div className="absolute top-0 left-0 right-0  bottom-0 bg-center bg-cover bg-no-repeat opacity-700  max-sm:hidden"
                  style={{ backgroundImage: "url('" + ApiConfig.rootUrl + "/" + el.image + "')" }}></div>
                <div className="absolute top-0 left-0 right-0  bottom-0 bg-center bg-cover bg-no-repeat opacity-700 hidden max-sm:block"
                  style={{ backgroundImage: "url('" + ApiConfig.rootUrl + "/" + el.mobileImage + "')" }}></div>
                <div className={`absolute text-center top-0 left-0 right-0 bottom-0 bg-[#0005] text-white p-4 flex flex-col  justify-center
                ${pos[el.position]}`}>
                  <h1 className="text-5xl max-sm:text-3xl tracking-[4px] font-bold capitalize ">{el.headingText}</h1>
                  <p className="my-3 text-lg max-sm:text-sm font-medium tracking-[4px]">
                    {el.subheadingText}
                  </p>
                  <a href={el.link} target="_blank">
                    <Button className="min-w-[120px] text-lg" color="secondary" >{t("visit")}</Button>
                  </a>
                </div>
              </div>
            })

          ]
          }
        />
      }


    </div>
  )
}
