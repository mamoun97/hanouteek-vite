import { useEffect, useState } from "react";
import {
    Modal,
    Button,
    Select,
    Password,
    Textarea
} from "rizzui";
import { IoSave } from "react-icons/io5";
import { associatStates, returnStates, Substates, vendorStates } from "../Const/states";
import statesColor, { subStatesColor } from "../Const/statesColor";
import OrderApi from "../../Api/OrderApi";

import toast from "react-hot-toast";
import useGlobal from "../../hoock/useGlobal";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import useLang from "../../hoock/useLang";

export default function StateChange({ data, afterChange = () => { }, readOnly = false, type = "default" }: { data: OrderFull, afterChange?: any, readOnly?: boolean, type?: OrderProsType }) {
    const user = useSelector<RootState>((state) => state.user) as UserAuth
    const [modalState, setModalState] = useState(false);
    const {tr}=useLang()
    const [loading, setLoading] = useState(false);
    const [dataReq, setDataReq] = useState({
        comment: "",
        password: "",
        platform: "",
        state: data.state,
    })
    const [dataReqFailed, setDataReqFailed] = useState({
        remark: "",
        subStatus: data.subStatus,
    })
    const global = useGlobal("?")
    const updateState = () => {
        setLoading(true)
        OrderApi.updateState(data.id, type=="failed"?dataReqFailed:dataReq, global).then(_ => {
            afterChange()
            setModalState(false)
            setLoading(false)
        }).catch(err => {
            toast.error(err.response ? err.response.data.message : err.message)
            setLoading(false)
        })
    }
    const updateSubState = () => {
        
    }
    useEffect(() => {
        setDataReq({
            comment: "",
            password: "",
            platform: "",
            state: data.state
        })
        setDataReqFailed({
            remark: "",
            subStatus: data.subStatus
        })
    }, [data])
    return (
        <>
            <div onClick={readOnly ? () => { } : () => setModalState(true)}
                className={"whitespace-nowrap capitalize rounded-full p-1 px-2   text-[13px] font-semibold border py-1 !text-[" + statesColor[data?.state ?? ""] + "] " + (readOnly ? "" : "cursor-pointer")}
                style={ 
                    type=="failed" ? {
                        color: subStatesColor[data?.subStatus ?? ""],
                        borderColor: subStatesColor[data?.subStatus ?? ""] + "26",
                        backgroundColor: subStatesColor[data?.subStatus ?? ""] + "22"
                    } : {
                        color: statesColor[data?.state ?? ""],
                        borderColor: statesColor[data?.state ?? ""] + "26",
                        backgroundColor: statesColor[data?.state ?? ""] + "22"
                    }
                } >
                {type=="failed" ? data.subStatus :(
                    (tr.states[data.state as keyof typeof tr.states]) || "undefined"
                     )}
            </div>
            <Modal isOpen={modalState} onClose={() => setModalState(false)}>
                <div className="m-auto px-7 pt-6 pb-8">
                    <div className="mb-7 flex items-center justify-between">
                        <h1 className="text-lg font-semibold">Change state</h1>
                    </div>
                    {
                        type!="default" ? <div className="flex flex-col gap-2">
                            <Select
                                label="Select sub State"
                                value={{ label: dataReqFailed.subStatus, value: dataReqFailed.subStatus }}
                                onChange={(e: typeof Substates[0]) => {

                                    setDataReqFailed({
                                        ...dataReqFailed,
                                        subStatus: e.value as OrderSubState
                                    })
                                }}
                                options={type=="failed"?Substates:returnStates}
                            />

                            <Textarea
                                label="Remark"
                                value={dataReqFailed.remark}
                                onChange={e => setDataReqFailed({ ...dataReqFailed, remark: e.target.value })}
                                rows={2} />

                        </div> : <div className="flex flex-col gap-2">
                            <Select
                                label="Select state"
                                value={{ label: dataReq.state, value: dataReq.state }}
                                onChange={(e: typeof associatStates[0]) => {

                                    setDataReq({
                                        ...dataReq,
                                        state: e.value
                                    })
                                }}
                                options={
                                    user?.role=="vendor"?vendorStates:
                                    associatStates
                                }
                            />
                            <Password
                                label="Password"
                                value={dataReq.password}
                                onChange={e => setDataReq({ ...dataReq, password: e.target.value })}
                            />
                            <Textarea
                                label="Comment"
                                value={dataReq.comment}
                                onChange={e => setDataReq({ ...dataReq, comment: e.target.value })}
                                rows={2} />
                            <Select
                                label="Company delivery"
                                options={[]}
                            />
                        </div>
                    }
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
                                if (type=="failed")
                                    updateSubState()
                                else
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