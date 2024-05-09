
import MenuAnimation from './MenuAnimation'
import IconButton from './TailwindComponent/IconButton'
import { IoClose } from "react-icons/io5";
export default function CartView({ onClose }: {
    onClose: any
}) {
    return (
        <MenuAnimation childClassName={"max-w-sm"} onClose={onClose}>
            <div className="p-4 px-6 flex flex-col">
                <div className="flex items-center">
                    <h1 className='text-lg font-semibold'>Votre Panier</h1>
                    <div className="grow"></div>
                    <IconButton className=" " onClick={onClose}>
                        <IoClose className="text-2xl" />
                    </IconButton>
                </div>
                <div className="border-b border-gray-200 mt-2"></div>
            </div>
        </MenuAnimation>
    )
}
