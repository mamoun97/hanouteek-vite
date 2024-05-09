
import { Link } from "react-router-dom"
import { useGetAllCategoriesService } from "../../Api/Services"
import Loading from "../../Constants/Loading"
import { useTranslation } from "react-i18next"
import ApiConfig from "../../Api/ApiConfig"
import images from "../../assets"


export default function Categories() {
    const isHanouteek=window.location.host.includes("hanouteek.com");
    const { data: cats, isLoading } = useGetAllCategoriesService(isHanouteek?3:4, 0, ApiConfig.swrStop)
    const { t } = useTranslation()
    return (
        <div className="grid grid-cols-2 gap-2 max-sm:grid-cols-1 my-6">
            {
                isLoading && Loading.cateroriesHanouteek
            }
            {
                cats?.data.map((el, k) => {

                    return <> 
                        {
                            (k == 0&&isHanouteek)
                            && <div key={k + "Quincaillerie"} className={`z-0 col-span-1 relative overflow-hidden cursor-pointer pt-[70%] group`}>

                                <div className={`group-hover:scale-110 bg-cover bg-no-repeat bg-center absolute top-0 left-0 right-0 bottom-0 
                                transition  duration-300 dd`} style={{ backgroundImage: "url('" + images.quincaillerie + "')" }}></div>

                                <Link to={"https://quincaillerie.hanouteek.com"} className="absolute top-0 left-0 right-0 bottom-0 group-hover:bg-[#0006] bg-[#0003] p-12" target="_blank">
                                    <h1 className="text-xl font-bold text-white drop-shadow-md">
                                        Quincaillerie
                                    </h1>
                                    <span className="py-2 px-3 bg-black text-white text-base mt-3 inline-block">
                                        {t("see_prods")}
                                    </span>
                                </Link>
                            </div>
                        }
                        <div key={k} className={`z-0 col-span-1 relative overflow-hidden cursor-pointer pt-[70%] group`}>

                            <div className={`group-hover:scale-110 bg-cover bg-no-repeat bg-center absolute top-0 left-0 right-0 bottom-0 
                     transition  duration-300 dd`} style={{ backgroundImage: "url('" + el.image + "')" }}></div>

                            <Link to={"/categories/" + el.id} className="absolute top-0 left-0 right-0 bottom-0 group-hover:bg-[#0006]  p-12">
                                <h1 className="text-xl font-bold text-white drop-shadow-md">
                                    {el.name}
                                </h1>
                                <span className="py-2 px-3 bg-black text-white text-base mt-3 inline-block">
                                    {t("see_prods")}
                                </span>
                            </Link>
                        </div>
                    </>
                })
            }
        </div>
    )
}
