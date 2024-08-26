import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdDelete, MdOutlineClear } from 'react-icons/md';
import { ActionIcon, Button, Input, Modal, Select, Text } from 'rizzui'
import { useGetWilayasService } from '../../../Api/Services';
import TableSimple from '../TableSimple';


type SelectItemType = {
  label: string,
  value: string,
  items: {
    id: number,
    deliveryCostToTheOffice: number,
    deliveryCostToTheHome: number,
    city: {
      id: number,
      name: string
    }
  }[],
}
type VluesType = {
  deliveryCostToTheOffice: number,
  deliveryCostToTheHome: number,
  wilaya: SelectItemType | null
}
export default function DeliveryPrice({
  data, setData, footer
}: SubFormProps) {
  const [modalState, setModalState] = useState(false);
  const { data: cities } = useGetWilayasService()
  const [values, setValues] = useState<VluesType>({
    deliveryCostToTheOffice: 0,
    deliveryCostToTheHome: 0,
    wilaya: null
  })
  return (
    <div>
      <div className="flex items-center ">
        <Button variant="solid" className='gap-2 ' onClick={() => setModalState(true)}>Add Price <AiOutlinePlus className='text-lg' /></Button>

      </div>
      <div className='my-4'>
        <TableSimple
          thead={<>
            <tr className=''>

              <th scope="col" className="px-3 py-3 ">
                CITY
              </th>
              <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">

                COST TO THE HOME
              </th>
              <th scope="col" className="px-3 py-3 text-center whitespace-nowrap">
                COST TO THE OFFICE
              </th>
              <th scope="col" className="px-3 py-3 text-center">
                ACTIONS
              </th>
            </tr>
          </>}
          tbody={<>
            {
              data.deliveryPrices.map((el, k) => {
                return <tr key={k} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th className="px-3 py-0">
                    {el.city.name}
                  </th>
                  <th scope="row" className="text-center px-3 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {el.deliveryCostToTheHome} DZD
                  </th>
                  <td className="text-center px-3 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {el.deliveryCostToTheOffice} DZD
                  </td>
                  <td className="px-3 py-4 flex justify-center">
                    <Button color='danger' className='text-lg' variant='flat' onClick={() => {
                      let dt = { ...data }
                      dt.deliveryPrices.splice(k, 1)
                      setData(dt)
                    }}><MdDelete /></Button>
                  </td>
                </tr>
              })
            }
            {
              data.deliveryPrices.length == 0 && <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
                <th className="px-3 py-8 " colSpan={5}>
                  <div className="flex justify-center items-center flex-col">
                    <span className="text-lg">No Prices</span>
                  </div>

                </th>
              </tr>
            }
          </>}
        />
      </div>



      {footer}

      <Modal isOpen={modalState} onClose={() => setModalState(false)}>
        <div className="m-auto px-7 pt-6 pb-8 flex flex-col gap-2" key={"modal" + open}>
          <div className="mb-7 flex items-center justify-between">
            <Text className='text-lg font-semibold'>Add New Wilaya</Text>
            <ActionIcon
              size="lg"
              variant="text"
              onClick={() => setModalState(false)}
            >
              <MdOutlineClear className="h-auto w-6" />
            </ActionIcon>
          </div>

          <Select
            label="Select"
            options={
              cities?.data ? [
                {
                  label: "All",
                  value: "All",
                  items: cities.data.map(el => {
                    return {
                      id: el.id,
                      deliveryCostToTheOffice: el.deliveryCostToTheOffice,
                      deliveryCostToTheHome: el.deliveryCostToTheHome,
                      city: {
                        id: el.id,
                        name: el.name
                      }
                    }
                  })
                },
                ...cities.data.map(el => {
                  return {
                    label: el.name,
                    value: el.name,
                    items: [{
                      id: el.id,
                      deliveryCostToTheOffice: el.deliveryCostToTheOffice,
                      deliveryCostToTheHome: el.deliveryCostToTheHome,
                      city: {
                        id: el.id,
                        name: el.name
                      }
                    }]
                  }
                })
              ] : []
            }
            value={values.wilaya}
            onChange={(e: SelectItemType) => {
              setValues({
                ...values,
                wilaya: e
              })
            }}
          />
          <Input
            label="Price delivery cost home"
            placeholder="Enter your price delivery cost home"
            type='number'
            suffix={"DZD"}
            onChange={(e) => {
              setValues({
                ...values,
                deliveryCostToTheHome: parseInt(e.target.value)
              })
            }}
            value={values.deliveryCostToTheHome}
          />
          <Input
            label="Price delivery cost office"
            placeholder="Enter your price delivery cost office"
            type='number'
            suffix={"DZD"}
            onChange={(e) => {

              setValues({
                ...values,
                deliveryCostToTheOffice: parseInt(e.target.value)
              })
            }}
            value={values.deliveryCostToTheOffice}
          />
          <div className="grid grid-cols-2 gap-2 mt-4 ">
            <Button variant="outline" className='gap-2 ' onClick={() => {
              setModalState(false)
            }}>Cancel</Button>
            <Button variant="solid" className='gap-2 ' onClick={() => {
              console.log(values)
              setData({
                ...data,
                deliveryPrices: [
                  ...values.wilaya?.items ?
                    values.wilaya.items.map(el => (
                      {
                        ...el,
                        deliveryCostToTheOffice: values.deliveryCostToTheOffice,
                        deliveryCostToTheHome: values.deliveryCostToTheHome,
                        
                      }
                    ))
                    : [],
                  ...data.deliveryPrices,
                ]
              })
              setModalState(false)
            }}>Add <AiOutlinePlus className='text-lg' /></Button>

          </div>
        </div>
      </Modal >
    </div >
  )
}
