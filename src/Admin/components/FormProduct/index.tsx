import React, { useEffect, useState } from 'react'
import { Button, Tab } from 'rizzui'
import Addons from './Addons'
import Autres from './Autres'
import DeliveryPrice from './DeliveryPrice'
import Details from './Details'
import Images from './Images'
import InitialData from './InitialData'
import Variante from './Variante'
import { IoMdArrowForward, IoMdSave } from 'react-icons/io'
import { IoArrowBack } from 'react-icons/io5'
import ProductApi from '../../../Api/ProductApi'
import alertError from '../../../hoock/alertError'
import useGlobal from '../../../hoock/useGlobal'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import JoomlaApi from '../../../Api/JoomlaApi'
const  initialErrors:ProductFormErrors = [
    false,true,false,false,true,true,true
]
export default function FormProduct({ data, isAdd = false ,isJoomla=false}: { data: ProductFull, isAdd?: boolean,isJoomla?:boolean }) {
    console.log(data)
    const [loading, setLoading] = useState(false)
    const [dt, setData] = useState({
        ...data,
        attribute:data.attribute??{
            "id": 1,
            "name": "",
            "optionsName": "",
            "options": []
          }
    })
    const [index, setIndex] = useState(0)
    const size = 6
    const [errors,setErrors]=useState<ProductFormErrors>(initialErrors)
    const global = useGlobal("?")
    const navigate = useNavigate()
    const CreateFooter = (i: number) => {
        return <div className='flex items-center justify-end gap-2 mt-4'>
            {i != 0 && <Button variant='outline' className='gap-2' onClick={() => {
                setIndex(i - 1)
            }}><IoArrowBack className='text-lg' /> Previos</Button>}
            {(!isAdd && i != size) && <Button variant='outline' className='gap-2' onClick={() => {
                save()
            }} isLoading={loading}>Save <IoMdSave className='text-lg' /></Button>}
            {i != size && <Button variant='outline' className='gap-2' onClick={() => {
                setIndex(i + 1)
            }}>Next <IoMdArrowForward className='text-lg' /></Button>}
            {i == size && <Button variant='outline' className='gap-2' onClick={() => {
                save()
            }} isLoading={loading}>Save <IoMdSave className='text-lg' /></Button>}
        </div>
    }
    const validation = (i:number) => {

    }
    const save = () => {
        setLoading(true)
        let { category, ...p } = dt
        if(!isJoomla){
            if (!isAdd) {
                ProductApi.updateProduct({ ...p, category: category.id }, global).then(res => {
    
                    setLoading(false)
                    toast.success("Ajoute success")
                    navigate("/products")
                }).catch(err => {
                    alertError(err)
                    setLoading(false)
                })
            } else {
                ProductApi.addProduct({ ...p, category: category.id }, global).then(res => {
    
                    setLoading(false)
                    toast.success("Modife success")
                    navigate("/products")
                }).catch(err => {
                    alertError(err)
                    setLoading(false)
                })
            }
        }else{
            if (!isAdd) {
                JoomlaApi.updateProduct({ ...p, category: category.id }, global).then(_ => {
    
                    setLoading(false)
                    toast.success("Ajoute success")
                    navigate("/joomla-admin/products")
                }).catch(err => {
                    alertError(err)
                    setLoading(false)
                })
            } else {
                JoomlaApi.createProduct({ ...p, category: category.id }, global).then(_ => {
    
                    setLoading(false)
                    toast.success("Modife success")
                    navigate("/joomla-admin/products")
                }).catch(err => {
                    alertError(err)
                    setLoading(false)
                })
            }
        }
    }
    useEffect(()=>{
        setErrors([
            dt.name.length!=0&&dt.category.id>1&&dt.price>0&&dt.originalPrice!=null,
            true,false,false,true,true,true
        ])
    },[dt])
    return (
        <div>
            <Tab onChange={(i: number) => {

                setIndex(i)
            }} selectedIndex={index}>
                <Tab.List className={"sticky top-14 bg-white dark:bg-[#151515] z-10"}>
                    <Tab.ListItem>Données initiales</Tab.ListItem>
                    <Tab.ListItem>Détails</Tab.ListItem>
                    <Tab.ListItem>Images</Tab.ListItem>
                    <Tab.ListItem>Variante</Tab.ListItem>
                    <Tab.ListItem>Addons</Tab.ListItem>
                    <Tab.ListItem> Delivery prices</Tab.ListItem>
                    <Tab.ListItem> Autres</Tab.ListItem>
                </Tab.List>
                <Tab.Panels className={"p-4 z-0"}>
                    <Tab.Panel>
                        <InitialData data={dt} setData={setData} footer={CreateFooter(0)} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Details data={dt} setData={setData} footer={CreateFooter(1)} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Images data={dt} setData={setData} footer={CreateFooter(2)} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Variante {...{errors,setErrors}} data={dt} setData={setData} footer={CreateFooter(3)} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Addons data={dt} setData={setData} footer={CreateFooter(4)} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <DeliveryPrice data={dt} setData={setData} footer={CreateFooter(5)} />
                    </Tab.Panel>
                    <Tab.Panel>
                        <Autres data={dt} setData={setData} footer={CreateFooter(6)} />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab>
        </div>
    )
}
