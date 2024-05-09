
import { useTranslation } from 'react-i18next'
import { IoBagOutline } from 'react-icons/io5'

export default function CartEmpty({text}:{text?:string}) {
    const {t}=useTranslation()
    return (
        <div className="flex items-center justify-center flex-col text-gray-400 mt-4 mb-5">
            <IoBagOutline className="text-6xl" />
            <h1 className="text-xl font-bold">{text?text:t("cart_empty")}</h1>
        </div>
    )
}
