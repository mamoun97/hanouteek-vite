
import { useTranslation } from 'react-i18next'
import { IoBagOutline } from 'react-icons/io5'

export default function CartEmpty({text,iconClassName="",children}:{text?:string,iconClassName?:string,children?:React.ReactNode}) {
    const {t}=useTranslation()
    return (
        <div className="flex items-center justify-center flex-col text-gray-400 mt-4 mb-5">
            <IoBagOutline className={"text-6xl "+iconClassName} />
            {
                children??<h1 className="text-xl font-bold">{text?text:t("cart_empty")}</h1>
            }
        </div>
    )
}
