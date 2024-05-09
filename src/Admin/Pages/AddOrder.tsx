import { useEffect, useState } from "react";

import FormOrder from "../components/FormOrder";
// import { useGetOrderByIdService } from "../../Api/Services";
import { useParams } from "react-router-dom";
import { Loader } from "rizzui";
import OrderApi from "../../Api/OrderApi";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import { GlobalS } from "../../Store/globalSlice";

export default function AddOrder() {
  const param=useParams()
  const d=param.id?parseInt(param.id):0
  // const {data,isLoading} =useGetOrderByIdService(d);
  const [isLoading,setisLoading]=useState(false)
  const [data,setData]=useState<OrderFull|null>(null)
 const global = useSelector<RootState>((state) => state.global) as GlobalS
  const getData=()=>{
    setisLoading(true)
    OrderApi.getById(d,(global?.platform)?"?"+global?.platform:undefined).then((res)=>{
      setData(res)
      setisLoading(false)
    }).catch(_=>{
      setisLoading(false)
    })
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <h1 className="text-2xl font-semibold">Update Order</h1>
      {
         isLoading&&
         <div className="flex justify-center items-center h-24">
          <Loader size="xl" className="scale-150" variant="spinner" color="primary"/>
        </div>
      }
      {data&&<FormOrder data={data}/>}
     
    </div>
  )
}
