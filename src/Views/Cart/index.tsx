import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { Cart } from "../../Store/cartSlice"
import CartItem from "./CartItem"
import MenuAnimation from '../MenuAnimation'
import IconButton from '../TailwindComponent/IconButton'
import { IoClose } from "react-icons/io5";
import Button from "../Flowbit/Button"
import { Link } from "react-router-dom"
import CartEmpty from "../CartEmpty"
import { useTranslation } from "react-i18next"
import Currency from "../../Constants/Currency"
import { ThemeSetting } from "../../Types/ThemeSetting"

export default function CartView({ onClose }: {
    onClose: any
}) {
    const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
    if (theme.theme.templateType == "restaurant") return null
    const cart = useSelector<RootState>(state => state.cart) as Cart

    const getTotal = (): number => {
        let s = 0;
        for (let i = 0; i != cart.items.length; i++)
            s += cart.items[i].price * cart.items[i].qte
        return s
    }
    const { t } = useTranslation()
    
    return (
        <MenuAnimation childClassName={"max-w-sm"} onClose={onClose}>
            <div className="p-4 px-6 flex flex-col h-full">
                <div className="flex items-center">
                    <h1 className='text-lg font-semibold'>{t("your_cart")}</h1>
                    <div className="grow"></div>
                    <IconButton className=" " onClick={onClose}>
                        <IoClose className="text-2xl" />
                    </IconButton>
                </div>
                <div className="border-b border-gray-200 mt-2"></div>
                {cart.items.length != 0 ? <>
                    <div className="grow py-2">
                        <div className="flex flex-col gap-2">
                            {
                                cart.items.map((el, k) => {
                                    return <CartItem data={el} index={k} key={k} onClose={onClose} />
                                })
                            }
                        </div>
                    </div>
                    <div className="border-b border-gray-200 mt-2"></div>
                    <div className="flex items-center font-semibold mt-2 mb-2">
                        <h1 className="text-lg">{t("sub_total")}</h1>
                        <div className="grow"></div>
                        <h1 className="text-lg">{getTotal().toFixed(2)} <Currency /></h1>
                    </div>
                    <Link className="w-full" to={"/checkout"}>
                        <Button
                            onClick={onClose}
                            className={"customPrimary grow text-white mb-1 max-h-11 h-11 animate-vibre uppercase w-full"}>
                            {t("order")}
                        </Button>
                    </Link>
                </> : <CartEmpty />}

            </div>
        </MenuAnimation>
    )
}


