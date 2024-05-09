import { useTranslation } from "react-i18next"
import { IoIosArrowRoundForward } from "react-icons/io"
import { Link } from "react-router-dom"
import { ActionIcon } from "rizzui"



export default function CategoryCard({ data }: { data: Category }) {
  if (data) { }
  return (
    <div className="pt-[120%] bg-center relative   bg-cover group bg-no-repeat overflow-hidden shadow-lg shadow-gray-100  rounded-lg border  cursor-pointer after:content-[''] after:absolute after:top-0 after:bottom-0 after:right-0 m-2"
      style={{ backgroundImage: "url('" + data.image + "')" }}>
        <Link to={"/categories/"+data.id}>
      <div className="absolute flex flex-col p-3 top-0 left-0 right-0 bottom-0 bg-[linear-gradient(#0003,#0009)] group-hover:bg-[linear-gradient(#0001,#0009)]">
        <div className="grow"></div>
        <h1 className="text-xl font-bold text-white  origin-bottom-left rtl:origin-bottom-right  transition-all duration-300">{data.name}</h1>
      </div>
       </Link>
    </div>
  )
}
export function CategoryCardMore({src}:{src?:string}) {
  const { t,i18n } = useTranslation()
 
 
  return (
    <div className="pt-[120%] h-full bg-center relative  bg-cover group bg-no-repeat bg-slate-50 overflow-hidden rounded-lg   cursor-pointer  m-2"
    >
      <Link to={src?src:"/categories/"}>
        <div className="absolute flex items-center flex-col justify-center  p-3 top-0 left-0 right-0 bottom-0 ">

          <ActionIcon variant="outline" size="lg" rounded="full">
            <IoIosArrowRoundForward className={"w-8 h-8 " + (i18n.language == "ar" ? "rotate-180" : "")} />

          </ActionIcon>
          <span className="font-medium mt-2">{t("showMore")}</span>
        </div>
      </Link>

    </div>
  )
}
