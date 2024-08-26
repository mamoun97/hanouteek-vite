import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { ThemeSetting } from "../Types/ThemeSetting"
import { useTranslation } from "react-i18next"
import toast, { Toaster } from "react-hot-toast"
import { FaInfoCircle } from "react-icons/fa"
import { Button, Dropdown } from "rizzui"
import { IoIosArrowDown } from "react-icons/io"
import { useEffect, useState } from "react"


type typeF = (d: ProductCart) => void
type PropsType = {
  data: Array<Color | Size>,
  className?: string,
  ActiveId?: number | null,
  onClick: any,
  product: ProductCart,
  setProduct: (e: any) => void,
  type?: "color" | "size",
  typeAtt?: "default" | "type1" | "type2"
}
const toastStyle = {
  icon: <FaInfoCircle className="w-10 " />,
  className: "shadow-xl",

  style: {
    border: '1px solid #F00',
    padding: '16px',
    color: '#FFF',
    fontWeight: "bold",
    backgroundColor: "#F00"
  },
  iconTheme: {
    primary: '#F00',
    secondary: '#F00',
  },
}

export default function Attribute({ data, className = "", ActiveId = null, onClick, product, setProduct, type, typeAtt = "default" }: PropsType) {


  if (typeAtt == "default") return <AttributeDefault {...{ data, className, ActiveId, onClick, product, setProduct, type, typeAtt }} />
  if (typeAtt == "type1") return <AttributeType1 {...{ data, className, ActiveId, onClick, product, setProduct, type, typeAtt }} />
  if (typeAtt == "type2") return <AttributeType2 {...{ data, className, ActiveId, onClick, product, setProduct, type, typeAtt }} />
}



//Attribute default type

function AttributeDefault({ data, className = "", ActiveId = null, onClick, product, setProduct, type }: PropsType) {


  const { t, i18n } = useTranslation()
  const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
  const alert = (s: any) => {
    toast(s, toastStyle);
  }
  return (
    <div className={" inline-block my-1" + className}>
      {
        data.map((el, k) => {
          let disable = type == "size" ? !el.underStock && el.stock <= 0 : el.stock <= 0
          return <div className={`${disable ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed" : "cursor-pointer  bg-gray-100 dark:bg-gray-500"} flex font-medium text-gray-600 dark:text-gray-100
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
                return
              }

              if (type == "color") {
                alert(<div className="flex gap-1">
                  <span>{el.value}</span> {t("no_dispo")}
                </div>)
                return
              }
              if (type == "size") {
                alert(<div className="flex gap-1">
                  <span>{el.value}</span> {t("no_dispo")}
                </div>)
                return
              }
            }}>
            {el.value}
          </div>
        })
      }
      <Toaster position="top-center" />
    </div>
  )
}


//Attribute type 1


function AttributeType1({ data, className = "", ActiveId = null, onClick, product, setProduct, type }: PropsType) {


  const { t, i18n } = useTranslation()
  const alert = (s: any) => {
    toast(s, toastStyle);
  }
  return (
    <div className={" inline-block my-1" + className}>
      {
        data.map((el, k) => {
          let disable = type == "size" ? !el.underStock && el.stock <= 0 : el.stock <= 0
          return <div className={`
            ${disable ? "line-through !text-gray-400  cursor-not-allowed" : "cursor-pointer   "} 
            flex font-medium text-gray-600 
            items-center justify-center m-1 text-base  p-3 h-9  rounded-sm min-w-[50px]
            ${ActiveId == el.id ? "   underline" : ""}
            ${i18n.language != "ar" ? "float-left" : "float-right"}
           
            `}
            key={k}
            style={ActiveId == el.id ? { color: "#000" } : {}}
            onClick={() => {
              if (!disable) {
                onClick(el)
                return
              }

              if (type == "color") {
                alert(<div className="flex gap-1">
                  <span>{el.value}</span> {t("no_dispo")}
                </div>)
                return
              }
              if (type == "size") {
                alert(<div className="flex gap-1">
                  <span>{el.value}</span> {t("no_dispo")}
                </div>)
                return
              }
            }}>
            {el.value}
          </div>
        })
      }
      <Toaster position="top-center" />
    </div>
  )
}




//Attribute type 2


function AttributeType2({ data, className = "", ActiveId = null, onClick, product, setProduct, type }: PropsType) {


  const { t } = useTranslation()
  const alert = (s: any) => {
    toast(s, toastStyle);
  }
  const [value, setValue] = useState("Chose")
  useEffect(() => {
    if (ActiveId == null) {
      setValue("Chose")
    }
  }, [ActiveId])
  return (
    <div className={" inline-block my-1" + className}>
      <Dropdown>
        <Dropdown.Trigger>
          <Button
            as="span"
            variant="outline"
          >
            {value} <IoIosArrowDown className="ml-2 w-5" />
          </Button>
        </Dropdown.Trigger>
        <Dropdown.Menu>

          {
            data.map((el, k) => {
              let disable = type == "size" ? !el.underStock && el.stock <= 0 : el.stock <= 0;
              return <Dropdown.Item
                key={k}
                className={(ActiveId == el.id ? "font-bold text-black " : "") + "" + (disable ? "text-gray-400 cursor-not-allowed" : "")}
                onClick={() => {
                  if (!disable) {
                    setValue(el.value)
                    onClick(el)
                    return
                  }

                  if (type == "color") {
                    alert(<div className="flex gap-1">
                      <span>{el.value}</span> {t("no_dispo")}
                    </div>)
                    return
                  }
                  if (type == "size") {
                    alert(<div className="flex gap-1">
                      <span>{el.value}</span> {t("no_dispo")}
                    </div>)
                    return
                  }
                }}>
                {el.value}
              </Dropdown.Item>
            })
          }
        </Dropdown.Menu>
      </Dropdown>

      <Toaster position="top-center" />
    </div>
  )
}