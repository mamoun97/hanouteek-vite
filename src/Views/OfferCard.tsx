
import { useTranslation } from 'react-i18next'

export default function OfferCard({prod}:{prod:ProductCart|Product}) {
    const {t}=useTranslation()
    return (
        <div>
            <div className="flex gap-2  items-center justify-center  mb-2  p-2 relative">

                <div className="flex   delay-500 items-center   left-1 top-1 rtl:right-1 rtl:left-[initial] rotate-12 rtl:-rotate-12 justify-center w-16 h-16 leading-5  rounded-full text-white font-semibold flex-col"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 absolute  " viewBox="0 0 138.1 138.1">
                        <g id="transport-discount-black">
                            <path id="Path_7" data-name="Path 7" className="fill-primary" d="M126.4,111.7l-9.4-.3,1.3,9.3-9.1-1.9-.3,9.4-8.7-3.5-1.9,9.2-8-4.9-3.5,8.7-7-6.2-4.9,7.9-5.8-7.3L62.8,139l-4.4-8.2L51,136.6l-2.9-8.9-8.3,4.4-1.3-9.2-8.9,2.9.2-9.4-9.2,1.4,1.9-9.2-9.4-.3,3.5-8.7L7.4,97.7l4.9-8L3.6,86.2l6.2-7L1.9,74.3l7.3-5.8L2.3,62.3l8.2-4.5L4.7,50.5l8.9-3L9.2,39.3l9.2-1.4L15.5,29l9.4.3L23.5,20l9.2,1.9.3-9.4L41.7,16l1.9-9.2,8,4.9L55.1,3,62,9.3l5-8,5.8,7.3L79,1.7l4.5,8.2,7.3-5.8,3,8.9L102,8.6l1.4,9.2,8.9-2.9-.3,9.4,9.3-1.4-1.9,9.2,9.4.3-3.5,8.7,9.2,1.9-4.9,8,8.6,3.5-6.2,7,8,4.9-7.3,5.8,6.9,6.3-8.2,4.4,5.8,7.4-8.9,2.9,4.4,8.3-9.2,1.3Z" />

                        </g>
                    </svg>
                    <span className="text-white relative text-lg font-bold">{t("offre")}</span>
                    {/* <span className="text-white relative font-bold">
                    - {
                        Math.ceil(100 - (prod.priceOffer??0) * 100 / (prod.price??1))
                    } %
                    </span> */}

                </div>
                <span className="font-semibold max-w-xs  ms-1 text-[15px]  max-sm:text-sm">
                    {(t("offreMSG") + "").replace("%PRICE%", prod.priceOffer + "").replace("%QTE%", prod.minNumberQteOffer + "")}
                </span>
            </div>
        </div>
    )
}
