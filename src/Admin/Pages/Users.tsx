
import { Toaster } from 'react-hot-toast'
import { LuPlus } from 'react-icons/lu'
import { Button } from 'rizzui'
import UsersFormModal from '../components/UsersFormModal'
import { useGetAllAssociateService } from '../../Api/Services'
import useGlobal from '../../hoock/useGlobal'
import { useEffect, useState } from 'react'
import UsersTable from '../components/UsersTable'



export default function Users() {
    const global = useGlobal("&")
    const { data, isLoading, mutate } = useGetAllAssociateService("?limit=10&page=1", global)
    const [option, setOptions] = useState<AssociateOptionRequest>({
        limit: 10,
        page: 1,

    })

    const [param, setParam] = useState(`?limit=${option.limit}&page=${option.page}`)



    useEffect(() => {
        if (option) {
            let p = `?limit=${option.limit}&page=${option.page}`
            setParam(p)
        }
    }, [option])
    return (
        <div>

            <h1 className="text-2xl font-semibold">All Users</h1>

            <div className="flex py-2 items-center gap-2">
                <div className="grow"></div>
                <UsersFormModal
                    action={
                        <Button>
                            <span className="">Add New User</span>
                            <span className="me-1"></span>
                            <LuPlus className="text-lg" />
                        </Button>
                    }
                />
            </div>
            <UsersTable
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
