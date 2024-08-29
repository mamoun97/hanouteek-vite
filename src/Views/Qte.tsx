import { MdRemove } from "react-icons/md";
import { AiOutlinePlus } from "react-icons/ai";


type PropsType = {
    addClick: any,
    removeClick: any,
    value: number,
    large?: boolean,
    type?: "default" | "type1"
}
const cc = `bg-gray-200 dark:bg-muted w-7 h-7 text-center hover:bg-primary 
active:bg-primary/90 hover:text-white  
flex justify-center cursor-pointer items-center rounded-md disabled:bg-gray-100 dark:disabled:bg-muted/50  
disabled:!text-gray-500 `
export default function Qte({
    addClick,
    large = false,
    removeClick,
    value,
    type = "default"
}: PropsType) {
    if (type == "default") return <QteDefault {...{ addClick, large, removeClick, value }} />
    if (type == "type1") return <QteType1 {...{ addClick, large, removeClick, value }} />
}

function QteDefault({
    addClick,
    large = false,
    removeClick,
    value
}: PropsType) {
    const styleLarge = large ? "w-9 h-9" : "";


    return (
        <div className={'flex items-center  ' + (large ? "text-lg" : "text-sm")}>
            <button
                type="button"
                className={`${cc}  ${styleLarge} customHover `}

                onClick={removeClick} disabled={value <= 1}
            // {...customHover(theme.theme.Primary,)}
            >
                <MdRemove />
            </button>
            <span className={`text-sm font-semibold text-center min-w-[20px] ${large ? "min-w-[30px] !text-lg" : ""}`}>{value}</span>
            <button
                type="button"
                className={`${cc} ${styleLarge} customHover`}
                onClick={addClick} disabled={value > 9}
            >
                <AiOutlinePlus />
            </button>
        </div>
    )
}
function QteType1({
    addClick,
    large = false,
    removeClick,
    value
}: PropsType) {
    const styleLarge = large ? "w-9 h-9" : "";


    return (
        <div className={'flex items-center border ' + (large ? "text-lg" : "text-sm")}>
            <button
                type="button"
                className={`${cc} rounded-none  bg-transparent  ${styleLarge} customHover`}

                onClick={removeClick} disabled={value <= 1}
            // {...customHover(theme.theme.Primary,)}
            >
                <MdRemove />
            </button>
            <span className={`text-sm  font-semibold text-center min-w-[20px] ${large ? "min-w-[30px] !text-lg" : ""}`}>{value}</span>
            <button
                type="button"
                className={`${cc} rounded-none  bg-transparent ${styleLarge} customHover`}
                onClick={addClick} disabled={value > 9}
            >
                <AiOutlinePlus />
            </button>
        </div>
    )
}
