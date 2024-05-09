import {useEffect} from "react"
import { useTranslation } from "react-i18next";
export default function MenuAnimation({
    childClassName = "",
    className = "",
    onClose,
    children
}: {
    childClassName?: string,
    className?: string,
    onClose: any,
    children?: any
}) {
    const { i18n } = useTranslation();
    useEffect(() => {
        document.body.style.height = "100vh"
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.height = "initial"
            document.body.style.overflow = "initial"
        }
    }, [])
    const crl=i18n.language=="ar"?" left-0 animate-cart_rtl ":" right-0 animate-cart "
    return (
        <div className={"z-50 fixed top-0 right-0 bottom-0 left-0 bg-[#0003]  "+className}>
            <div className="absolute top-0 left-0 right-0 bottom-0 cursor-pointer" onClick={onClose}></div>
            <div className={" w-full max-w-sm bg-white transition duration-300 fixed top-0 bottom-0 overflow-auto " +crl+ childClassName}>
                {children}
            </div>
        </div>
    )
}
