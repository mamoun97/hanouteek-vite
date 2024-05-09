
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import {
    Modal,
    Button,
    Text
} from "rizzui";
import ApiConfig from "../../Api/ApiConfig";
// import Currency from "../../Constants/Currency";

export default function ItemsProductModal({ data }: { data: OrderFull }) {
    const [modalState, setModalState] = useState(false);


    return (
        <>

            <Text
                onClick={() => setModalState(true)}
                className="mb-0.5 text-sm  bg-gray-100 dark:bg-black dark:border  rounded-full cursor-pointer p-2 py-1 flex items-center whitespace-nowrap">
                <span>{data.item.length} Item</span>
                <div className="me-1"></div>
                <IoEyeOutline className="text-lg" />
            </Text>
            <Modal isOpen={modalState} onClose={() => setModalState(false)}>
                <div className="m-auto px-7 pt-6 pb-8">
                    <div className="mb-7 flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Order (#{data.id}) products</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        {
                            data.item.map((el, k) => {
                                return <div className="flex gap-2 relative my-1" key={k}>

                                    <div className={`bg-cover cursor-pointer bg-no-repeat bg-center w-14 h-14 min-w-[56px] rounded-md mt-2 sticky `}
                                        style={{ backgroundImage: "url('" + ApiConfig.rootUrl + "/" + el.product?.images[0] + "')" }}>
                                        <div className="w-5 h-5 text-[12px] font-medium rounded-full bg-primary text-white absolute bottom-[2px] right-[2px] flex items-center justify-center">
                                            {el.qte}
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex w-full ">

                                            <h1 className="text-sm font-semibold text-gray-600 line-clamp-2">{el.name}</h1>
                                            <div className="grow ms-[4px]"></div>
                                            <h1 className="font-semibold whitespace-nowrap text-sm">
                                                {(el.price_item* el.qte).toFixed(2)} DZD
                                            </h1>
                                        </div>
                                        <div className="text-[12px] text-gray-600">
                                            <div className="flex gap-2">
                                                <span>unit price :</span>
                                                <span className="font-semibold">{el.price_item.toFixed(2)} DZD</span>
                                            </div>
                                            {!!el.color ? <div className="flex gap-2">
                                                <span>Color :</span>
                                                <span className="font-semibold">{el.color}</span>
                                            </div> : ""}
                                            {!!el.size ? <div className="flex gap-2">
                                                <span> Pointure :</span>
                                                <span className="font-semibold">{el.size}</span>
                                            </div> : ""}
                                        </div>
                                        <div className="border my-2 border-gray-100"></div>
                                        
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="flex justify-end mt-3 gap-2">
                        <Button
                            type="submit"
                            variant="flat"
                            onClick={() => setModalState(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
