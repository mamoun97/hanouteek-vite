import { useEffect, useRef, useState } from 'react'
import AddOrderPos from './AddOrderPos'
import FormOrder from '../components/FormOrder'
import { initialDataOrder } from '../Const/initialData'
import { ActionIcon } from 'rizzui'
import { IoArrowBackOutline } from 'react-icons/io5'

export default function AddOrderDrop() {
    const [openForm, setOpenForm] = useState(false)
    const [dataOrder, setDataOrder] = useState<OrderFull>(initialDataOrder)
   
    return (
        <div  className='relative z-0' >
          
            {
                openForm ? <div className="flex gap-2 items-center">
                    <ActionIcon variant="text" className="text-lg" onClick={() => setOpenForm(false)}>
                        <IoArrowBackOutline />
                    </ActionIcon>
                </div> : ""
            }
            <div className={`${openForm ? "hidden" : "block"}`}>
                <AddOrderPos dropData={{
                    openForm,
                    setOpenForm,
                    setDataDrop: setDataOrder
                }} />
            </div>
            <div className={`${openForm ? "block" : "hidden"}`}  key={"formdata"+openForm} >
                <FormOrder data={dataOrder} isAdd={true} />
            </div>


        </div>
    )
}
