import { Link } from "react-router-dom";
import ApiConfig from "../Api/ApiConfig";
import { useGetAllOffers, useGetOfferById } from "../Api/Services";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function generateArray(n: number): number[] {
   
    const spacing = 14;
    const start = -Math.floor(n / 2) * spacing + ((n % 2 === 0) ? spacing / 2 : 0);
    return Array.from({ length: n }, (_, i) => start + i * spacing);
}
export default function OffersView({
    productId
}: {
    productId: number
}) {
    const { t, i18n } = useTranslation()
    const { data: offers } = useGetAllOffers("?limit=1&page=1&product=" + productId);
    const { data: offer } = useGetOfferById(offers?.data.length?offers.data[0].id : "")
    
    return offer && <div className={"flex gap-3 offer-card  p-4 rounded-lg items-center bg-gradient-to-br from-rose-100 via-purple-200 to-purple-200 max-[570px]:flex-col relative z-0 " + (i18n.language == "ar" ? "offer-rtl" : "")}>
        <div className=" absolute top-0 left-0 w-full h-full opacity-10"></div>
        <span className="offer-span" data-content={t("offre")}></span>
        <div className={`h-24 w-20 relative sm:translate-y-7 mt-6 ms-3s max-sm:my-5 `}>


            {
                offer.offerItems.map((item, i) => {
                    console.log(generateArray(offer.offerItems.length))
                    return <div key={i} className={`h-24 w-20  bg-cover bg-center bg-no-repeat  overflow-hidden rounded-lg
                        ${i18n.language=="ar"?"origin-bottom-left":"origin-bottom-right"}
                        absolute hover:!z-20  border-2 border-white transition-transform duration-200 `} style={
                            {
                                zIndex: 10 - i,
                                transform: " rotate(" + (generateArray(offer.offerItems.length)[i]) + "deg) ",
                                backgroundImage: "url('" + ApiConfig.rootUrl + "/" + item.product.images[0] + "')"
                            }
                        }>

                    </div>

                })
            }

        </div>
        <div className="!h-full   grow flex flex-col items-center gap-3 relative z-10">
            <h1 className="text-center font-bold tracking-widest text-xl">{offer.name} 👊</h1>
            <div className="text-sm ">
                <h1 className="tracking-widest text-center">
                    Achetez d'autres produits à un prix inférieur
                </h1>
                {
                    offer.offerItems.map((el, k) => {
                        return <p key={k} className="tracking-widest text-center   ">
                            - {el.product.name}
                            <span className="tracking-normal text-xs  line-through text-gray-500  mx-1">{el.product.price} DZ</span>
                            <span className="tracking-normal text-xs font-bold">{el.price} DZ</span>
                        </p>
                    })
                }
            </div>
            <Link to={"/offer/"+offer.id} className="relative inline-flex items-center justify-center p-2 px-6 py-2 overflow-hidden font-medium text-primary-600 transition duration-300 ease-out border-2 border-primary rounded-lg shadow-md group">
                <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
                <span className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">Achat</span>
                <span className="relative invisible">Achat</span>
            </Link>
        </div>


    </div>

}
