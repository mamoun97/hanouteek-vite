import React, { useEffect, useState } from 'react'
import useGlobal from '../../hoock/useGlobal'
import { Toaster } from 'react-hot-toast'
import AbandonedCartsTable from '../components/AbandonedCartsTable'
import { useGetOrderAbandonedService } from '../../Api/Services'

export default function AbandonedCarts() {
    const global = useGlobal("&")
   
    const [option, setOptions] = useState<AssociateOptionRequest>({
        limit: 10,
        page: 1,

    })

    const [param, setParam] = useState(`?limit=${option.limit}&page=${option.page}`)

    const { data, isLoading, mutate } = useGetOrderAbandonedService(param, global)

    useEffect(() => {
        if (option) {
            let p = `?limit=${option.limit}&page=${option.page}`
            setParam(p)
        }
    }, [option])
    return (
        <div>

            <h1 className="text-2xl font-semibold">Paniers abandonnés</h1>

            <div className="flex py-2 items-center gap-2">
                
            </div>
            <AbandonedCartsTable
                afterChange={() => mutate()}
                data={data?.data ? data :
                    {
                        data: [],
                        totalCount: 0,
                        limit: option.limit,
                        hasMore: true,
                        page: option.page

                    }
                } showCols={[]} isLoading={isLoading} option={option} setOption={setOptions} />
            <Toaster position="top-center" />
        </div >
    )
}
