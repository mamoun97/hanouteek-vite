import { AiOutlinePlus } from "react-icons/ai"
import { MdRemove } from "react-icons/md"
import { ActionIcon } from "rizzui"
import Currency from "../Constants/Currency"


type AddonProps = {
    isActive:boolean,
    onInc:(e:any)=>void,
    onDec:(e:any)=>void,
    onClick:(e:any)=>void,
    data:AddonSubQte
}
export default function Addon(
    {isActive,onInc,onDec,onClick,data }: AddonProps
) {
    return (
        <div className={`pt-[100%] w-full  relative border 
        ${isActive ? "border-primary shadow-md" : ""} 
        ${data.price==0?"!pt-0":""}
        rounded-lg overflow-hidden `}  >
            <div className={`absolute top-0 left-0 right-0 bottom-0 transition-bg duration-300 
            ${isActive ? "bg-primary text-white" : "bg-gray-100"} flex flex-col
            ${data.price==0?"!relative py-2":""}`}>
                <div className={`flex text-sm items-center cursor-pointer justify-center grow flex-col`} onClick={onClick}>
                    <span className=" font-semibold capitalize">{data.value}</span>
                    {!!data.price&&<span>{data.price*data.qte} <Currency /></span>}
                </div>
                {data.price>0&&<div className={`flex ${isActive ? 'text-black' : "-mb-8"} transition-all items-center  m-1 bg-white shadow overflow-hidden rounded-full`}>
                    <ActionIcon variant="text" size="sm" className="text-base hover:bg-neutral-100 rounded-full" onClick={onDec}>
                        <MdRemove />
                    </ActionIcon>
                    <span className="grow text-lg text-center">
                        {data?.qte}
                    </span>
                    <ActionIcon variant="text" size="sm" className="text-base hover:bg-neutral-100 rounded-full" onClick={onInc} >
                        <AiOutlinePlus />
                    </ActionIcon>
                </div>}
            </div>

        </div>
    )
}
