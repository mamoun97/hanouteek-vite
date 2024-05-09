import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Select,
    Password,
    Textarea
} from "rizzui";
import { IoSave } from "react-icons/io5";
import { associatStates } from "../Const/states";
import statesColor from "../Const/statesColor";
import OrderApi from "../../Api/OrderApi";

import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { GlobalS } from "../../Store/globalSlice";

export default function StateChange({ data,afterChange=()=>{} }: { data: OrderFull,afterChange?:any }) {
   
    const [modalState, setModalState] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataReq, setDataReq] = useState({
        comment: "",
        password: "",
        platform: "",
        state: data.state
    })
    const global = useSelector<RootState>((state) => state.global) as GlobalS
    const updateState = () => {
        setLoading(true)
        OrderApi.updateState(data.id, dataReq,global?.platform?"?"+global.platform:undefined).then(_ => {
            afterChange()
            setModalState(false)
            setLoading(false)
        }).catch(err => {
            toast.error(err.response ? err.response.data.message : err.message)
            setLoading(false)
        }
        )
    }
    useEffect(()=>{
        setDataReq({
            comment: "",
            password: "",
            platform: "",
            state: data.state
        })
    },[data])
    return (
        <>
            <div onClick={() => setModalState(true)}
                className={"whitespace-nowrap capitalize rounded-full p-1 px-2 cursor-pointer  text-[13px] font-semibold border py-1 !text-[" + statesColor[data?.state ?? ""] + "]"}
                style={{
                    color: statesColor[data?.state ?? ""],
                    borderColor: statesColor[data?.state ?? ""]+"26",
                    backgroundColor: statesColor[data?.state ?? ""] + "22"
                }} >
                {data.state}
            </div>
            <Modal isOpen={modalState} onClose={() => setModalState(false)}>
                <div className="m-auto px-7 pt-6 pb-8">
                    <div className="mb-7 flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Change state</h1>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Select
                            label="Select state"
                            value={{label:dataReq.state,value:dataReq.state}}
                            onChange={(e: typeof associatStates[0]) => {

                                setDataReq({
                                    ...dataReq,
                                    state: e.value
                                })
                            }}
                            options={associatStates}
                        />
                        <Password
                            label="Password"
                            value={dataReq.password}
                            onChange={e=>setDataReq({...dataReq,password:e.target.value})}
                        />
                        <Textarea
                            label="Comment"
                            value={dataReq.comment}
                            onChange={e=>setDataReq({...dataReq,comment:e.target.value})}
                            rows={2} />
                        <Select
                            label="Company delivery"
                            options={[]}
                        />
                    </div>
                    <div className="flex justify-end mt-3 gap-2">
                        <Button
                            type="submit"
                            variant="flat"
                            onClick={() => setModalState(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className=" flex gap-2"
                            onClick={() => {
                                updateState()
                            }}
                            isLoading={loading}
                        >
                            Save
                            <IoSave />
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}