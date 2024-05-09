import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { ThemeSetting } from "../Types/ThemeSetting"
import { useTranslation } from "react-i18next"


type typeF=(d: ProductCart)=>void

export default function Attribute({ data, className = "", ActiveId = null, onClick, product, setProduct, type }: {
  data: Array<Color | Size>,
  className?: string,
  ActiveId?: number | null,
  onClick: any,
  product: ProductCart,
  setProduct: (e:any) => void,
  type?: "color" | "size"
}) {
  const {
    t: _,
    i18n } = useTranslation()
  const theme = useSelector<RootState>(state => state.theme) as ThemeSetting

  return (
    <div className={" inline-block my-1" + className}>
      {
        data.map((el, k) => {
          let disable = !el.underStock && el.stock <= 0
          return <div className={`${disable ? "bg-gray-300" : "cursor-pointer  bg-gray-100"} flex font-medium text-gray-600
            items-center justify-center m-1 text-base  p-3 h-9  rounded-sm min-w-[50px]
            ${ActiveId == el.id ? "  text-white border-transparent" : ""}
            ${i18n.language != "ar" ? "float-left" : "float-right"}
            ${""
            // el.stock <= 0 ? "!bg-gray-200 !text-gray-500 cursor-auto" : ""
            }
            `}
            key={k}
            style={ActiveId == el.id ? { backgroundColor: theme.theme.Primary } : {}}
            onClick={() => {
              // if (el.stock <= 0)
              //   alert(t("no_dispo"))
              // else
              if (!disable) {
                // console.log(product)
                // if (product.qte > el.stock && type == "size" && !!product.checkData.color)
                //   setProduct(
                //     (e:ProductCart) => ({...e,qte: el.stock})
                //   )
                onClick(el)
              }
            }}>
            {el.value}
          </div>
        })
      }
    </div>
  )
}
