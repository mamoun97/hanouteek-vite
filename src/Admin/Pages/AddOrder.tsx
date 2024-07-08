import { useEffect, useState } from "react";

import FormOrder from "../components/FormOrder";
import { useParams } from "react-router-dom";
import { Loader } from "rizzui";
import OrderApi from "../../Api/OrderApi";
import { initialDataOrder } from "../Const/initialData";
import useGlobal from "../../hoock/useGlobal";

export default function AddOrder({ update = true }: { update?: boolean }) {
  const param = useParams()
  const d = param.id ? parseInt(param.id) : 0
  // const {data,isLoading} =useGetOrderByIdService(d);
  const [isLoading, setisLoading] = useState(false)
  const [data, setData] = useState<OrderFull | null>(null)
  const global=useGlobal("?")
  const getData = () => {
    setisLoading(true)
    OrderApi.getById(d, global ).then((res) => {
      delete res.address_lat
      delete res.address_lng
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
        <h1 className="text-2xl font-semibold">Modifier la commande</h1>
        {
          isLoading &&
          <div className="flex justify-center items-center h-24">
            <Loader size="xl" className="scale-150" variant="spinner" color="primary" />
          </div>
        }
        {data && <FormOrder data={data} />}
      </> : <>
        <h1 className="text-2xl font-semibold">Ajouter une commande</h1>
        <FormOrder data={initialDataOrder} isAdd={true} />
      </>}


    </div>
  )
}
