
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { MdRemove } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import ApiConfig from "../../Api/ApiConfig";
import { ActionIcon } from "rizzui";
import Currency from "../../Constants/Currency";
import ProductPageModalPos from "./ProductPageModalPos";
import imgSrc from "../../utils/imgSrc";
// import ProductPageModal from "./ProductPageModal";


export default function ProductPos({ data, showAddToCart = false, addToCart }: { data: Product, showAddToCart?: boolean, addToCart: (e: OrderFullItem) => void }) {

    const [showQte, setShowQte] = useState(false)
    const [open, setOpen] = useState(false)
    const [qte, setQte] = useState(1)
    const [animate, setAnimate] = useState(false);
    const [TH, setTH] = useState<any>(undefined)

    const timer = () => {
        clearTimeout(TH)
        setTH(
            setTimeout(() => {
                setQte(1)
                setShowQte(false)
            }, 5000)
        )
    }
    return <>
        <div

            className={`transition-all z-50 rounded-md border-none cursor-pointer bg-card`}
            onClick={() => {
                // navigate("/product/" + data.slugName)
            }}
        >
            <div className="overflow-visible p-0 relative ">

                <div className="w-full pt-[100%] z-0 relative shadow-sm rounded-lg rounded-b-none bg-cover bg-no-repeat bg-center" style={{
                    backgroundImage: "url('" + imgSrc(data.images[0],true)  + "')"
                }}>

                </div>

                {
                    showAddToCart && <div className="z-10 absolute bottom-2 right-2 flex gap-1 overflow-hidden">
                        {
                            showQte ? <>
                                <div className=" flex items-center rounded-lg overflow-hidden animate-qte bg-white">
                                    <ActionIcon variant="text" className="text-xl font-bold " size="sm" onClick={() => {
                                        setAnimate(true);
                                        setTimeout(() => {
                                            if (qte == 1) {
                                                setAnimate(false);
                                                setShowQte(false)
                                                return
                                            }
                                            setQte(qte > 1 ? qte - 1 : 1)
                                            timer()
                                            setAnimate(false);
                                        }, 150);


                                    }}>
                                        <MdRemove />
                                    </ActionIcon>
                                    <div className={`w-6 text-center min-w-6  font-bold transition-transform duration-150 ${animate ? 'scale-0' : 'scale-100'}`}>{qte}</div>
                                    <ActionIcon variant="text" className="text-xl font-bold cursor-pointer " size="sm" onClick={() => {
                                        setAnimate(true);
                                        setTimeout(() => {
                                            setQte(qte + 1)
                                            timer()
                                            setAnimate(false);
                                        }, 150);
                                    }}>
                                        <AiOutlinePlus />
                                    </ActionIcon>
                                </div>
                                <ActionIcon variant="solid" className="text-xl font-bold " size="sm" onClick={() => {
                                    setOpen(true)
                                }}>
                                    <IoCartOutline />
                                </ActionIcon>
                            </>
                                :
                                <ActionIcon variant="solid" className="text-xl font-bold cursor-pointer" size="sm" onClick={() => {
                                    // setShowQte(true)
                                    // timer()
                                    setOpen(true)
                                }}>
                                    <AiOutlinePlus />
                                </ActionIcon>}
                    </div>
                }
            </div>
            <div className="text-small justify-between items-center max-sm:flex-col max-sm:items-start p-2">
                <b className="h-8  font-medium  text-start  w-full leading-4 line-clamp-2 text-foreground ">{data.name}</b>
                <p className="text-default-500 text-sm font-bold text-primary ">{data.price} <Currency /></p>
            </div>
        </div>

        <ProductPageModalPos
            open={open}
            prod={{
                qte: qte,
                onClose: setOpen,
                slug: data.slugName,
                addToCart
            }} />
    </>

}
