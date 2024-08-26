import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, Tab } from 'rizzui'
import useGlobal from '../../hoock/useGlobal'
import ProductApi from '../../Api/ProductApi'
import FormProduct from '../components/FormProduct'
import { initialDataProduct } from '../Const/initialData'
import { Toaster } from 'react-hot-toast'

export default function AddProduct({ update = true }: { update?: boolean }) {
  const param = useParams()
  const d = param.id ? parseInt(param.id) : 0
  // const {data,isLoading} =useGetOrderByIdService(d);
  const [isLoading, setisLoading] = useState(false)
  const [data, setData] = useState<Product | null>(null)
  const global=useGlobal("?")
  const getData = () => {
    setisLoading(true)
    ProductApi.getById(d, global ).then((res) => {
      
      setData(res)
      setisLoading(false)
    }).catch(_ => {
      setisLoading(false)
    })
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
       {update ? <>
        <h1 className="text-2xl font-semibold">Modifier Product</h1>
        {
          isLoading &&
          <div className="flex justify-center items-center h-24">
            <Loader size="xl" className="scale-150" variant="spinner" color="primary" />
          </div>
        }
        {data && <FormProduct data={data as ProductFull} />}
      </> : <>
        <h1 className="text-2xl font-semibold">Ajouter un Product</h1>
        <FormProduct data={initialDataProduct} isAdd={true} />
      </>}

      <Toaster position="top-center" />
     
      
    </div>
  )
}
