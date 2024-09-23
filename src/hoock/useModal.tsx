import { useState } from "react";
import {
    Modal
} from "rizzui";

type PropsType={ 
    content: React.ReactNode,
    open:boolean,
    setOpen:(e:boolean)=>void,
    closable?:boolean
}
export default function useModal({ 
    content,open,setOpen,
    closable=true }:PropsType ) {
    return {
        ModalView: <>

            <Modal  isOpen={open} onClose={closable?() => setOpen(false):() =>{}}>
                <div className="m-auto px-7 pt-6 pb-8">
                    {content}
                </div>
            </Modal>
        </>,
        open,
        setOpen
    }
}