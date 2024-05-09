import { Button } from "rizzui";
import ApiConfig from "../../Api/ApiConfig";
import { HomePageSection } from "../../Types/ThemeSetting";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SingleProductSection({ data }: { data: HomePageSection }) {
  const {t}=useTranslation()
  return (
    <div className="my-6">
      <div className="bg-gray-100 grid grid-cols-2  overflow-hidden  max-md:grid-cols-1">

        <div className="bg-cover bg-center bg-no-repeat h-[80vh] " style={{
          backgroundImage: "url('" + ApiConfig.rootUrl + "/" + data.Product?.images[0] + "')"
        }}></div>

        <div className="text-center p-4 flex flex-col justify-center items-center gap-4">
          <h1 className="text-6xl uppercase max-md:text-2xl font-normal">
            {data.Product?.name}
          </h1>
          <p className="text-sm max-w-xs line-clamp-3">
            {data.Product?.sub_description}
          </p>
          <Link to={"/product/" + data.Product?.slugName}>
            <Button className=" p-6 text-xl">
              {t("buy")}
            </Button>
          </Link>


        </div>

      </div>
    </div>
  )
}
