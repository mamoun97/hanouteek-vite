import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loader, Tab } from 'rizzui'
import useGlobal from '../../hoock/useGlobal'
import ProductApi from '../../Api/ProductApi'
import { Toaster } from 'react-hot-toast'
import FormProduct from '../../Admin/components/FormProduct'
import { initialDataProduct } from '../../Admin/Const/initialData'
import JoomlaApi from '../../Api/JoomlaApi'

export default function AddProduct({ update = true, isJoomla = false }: { update?: boolean, isJoomla?: boolean }) {
  const param = useParams()
  const d = param.id ? parseInt(param.id) : 0
  // const {data,isLoading} =useGetOrderByIdService(d);
  const [isLoading, setisLoading] = useState(false)
  const [data, setData] = useState<Product | null>(null)
  const global = useGlobal("&")
  const getData = () => {
    setisLoading(true)
    // isJoomla
    if (isJoomla)
      JoomlaApi.getProducts("?limit=1&page=1&productId="+d, global).then((res) => {
        if (res.data.length)
          setData(res.data[0])
        setisLoading(false)
      }).catch(_ => {
        setisLoading(false)
      })
    else
      ProductApi.getById(d, global).then((res) => {

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
        {data && <FormProduct isJoomla={true} data={data as ProductFull} />}
      </> : <>
        <h1 className="text-2xl font-semibold">Ajouter un Product</h1>
        <FormProduct isJoomla={true} data={initialDataProduct} isAdd={true} />
      </>}

      <Toaster position="top-center" />


    </div>
  )
}
