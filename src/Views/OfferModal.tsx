import { Modal } from "rizzui"
import CartItem from "./Cart/CartItem"


type PropsType = {
    open: boolean,
    setOpen: (e: boolean) => void,
    prod: ProductCart
}

export default function OfferModal({
    open,
    prod,
    setOpen
}: PropsType) {
    return (
        <>
            <Modal isOpen={open} onClose={() => setOpen(false)} size="full">
                <div className="m-auto px-7 pt-6 pb-8">
                    <h1 className="font-bold text-lg text-center my-3">Il y a une offre spéciale  👊</h1>
                    <div className="border-b border-gray-200"></div>
                    <CartItem data={prod} index={-1}  isCheckout={true} editable={true} />
                </div>
            </Modal>
        </>
    )
}
