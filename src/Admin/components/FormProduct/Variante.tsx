import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

import { RiDeleteBin5Line } from 'react-icons/ri'
import { ActionIcon, Button, Input, Switch } from 'rizzui'
import UploadImageSingle from '../UploadImageSingle'
type PropsType=SubFormProps&{
  errors:ProductFormErrors,
  setErrors:(e:ProductFormErrors)=>void
}

export default function Variante({
  data, setData, footer,errors,setErrors
}: PropsType) {
  return (
    <div className=''>
      <div className='grid grid-cols-2 max-sm:grid-cols-1 gap-2'>
        <Input
          label="Nom de l'option"
          value={data.attribute.name}
          onChange={(e) => {
            let dt = { ...data }
            dt.attribute.name = e.target.value
            setData(dt)
          }}
          placeholder="Nom de l'attribut (couleurs par exemple)"
        />
        <Input
          label="Nom des sous-options"
          value={data.attribute.optionsName}
          onChange={(e) => {
            let dt = { ...data }
            dt.attribute.optionsName = e.target.value
            setData(dt)
          }}
          placeholder="Nom des sous-options (tailles par exemple)"
        />
        <div className="col-span-full flex flex-col gap-4 mt-4 z-0">


          {
            data.attribute?.options?.map((el, index) => {
              return <div className=' relative  shadow-md p-4 rounded-lg' key={index}>
                <div className="flex justify-between items-center sticky top-24 p-2 bg-white dark:bg-[#151515] shadow-md z-10">
                  <div className='font-semibold flex items-center gap-2'>
                    # Option {index + 1}
                    {
                      data.attribute.options[index].value ?<span>
                        ({data.attribute.options[index].value})
                      </span>:""
                    }
                  </div>
                  <ActionIcon variant='flat' color='danger' onClick={() => {
                    let dt = { ...data }
                    dt.attribute.options.splice(index, 1)
                    setData(dt)
                  }}>
                    <RiDeleteBin5Line />
                  </ActionIcon>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4 z-0">
                  <div className='flex flex-col gap-2 col-span-2 max-md:col-span-full'>
                    <Input
                      label="Valeur de l'option"
                      placeholder="Saisissez la valeur de l'option"
                      value={el.value}
                      onChange={(e) => {
                        let dt = { ...data }
                        dt.attribute.options[index].value = e.target.value
                        setData(dt)
                      }}
                    />
                    <Input
                      label="Stock de l'option"
                      value={el.stock}
                      type='number'

                      onChange={(e) => {
                        let dt = { ...data }
                        dt.attribute.options[index].stock = parseInt(e.target.value)
                        setData(dt)
                      }}
                      placeholder="Saisissez le stock de l'option"
                    />
                    <Input
                      label="Prix de l'option"
                      value={el.price + ""}
                      type='number'
                      suffix={
                        <span>DZD</span>
                      }
                      onChange={(e) => {
                        let dt = { ...data }
                        dt.attribute.options[index].price = parseInt(e.target.value)
                        setData(dt)
                      }}
                      placeholder="Saisissez le prix de l'option (facultatif)"
                    />
                  </div>
                  <div className='col-span-1 max-md:col-span-full flex items-center justify-center'>
                    <UploadImageSingle
                      className='h-full min-h-[210px]'
                      setData={(e) => {
                        let dt = { ...data }
                        dt.attribute.options[index].image = e
                        setData(dt)
                      }} imgSrc={data.attribute.options[index].image} />
                  </div>
                </div>
                <div className='my-2'>
                  <Switch
                    label="Permettre aux utilisateurs d'effectuer des achats même si l'article est en rupture de stock."
                    variant="flat"
                    switchClassName='min-w-[40px]'
                    checked={data.attribute.options[index].underStock}
                    onChange={(_) => {
                      let dt = { ...data }
                      dt.attribute.options[index].underStock = !dt.attribute.options[index].underStock
                      setData(dt)
                    }}
                  />
                </div>
                <div className='mt-4 border border-gray-400/40 rounded-lg p-4 flex flex-col gap-2 '>
                  {
                    el.sizes.map((item, key) => {
                      return <>
                        <div className='grid grid-cols-10 items-end gap-2' key={key}>
                          <Input
                            label={"Nom des sous-options #" + (key + 1)}
                            value={item.value}
                            onChange={(e) => {
                              let dt = { ...data }
                              dt.attribute.options[index].sizes[key].value = e.target.value
                              setData(dt)
                            }}
                            placeholder="Nom des sous-options (tailles par exemple)"
                            className='col-span-3'
                          />
                          <Input
                            label="Stock de la sous-option"
                            placeholder="Saisissez le stock de sous-option"
                            className='col-span-3'
                            type='number'
                            value={item.stock}
                            onChange={(e) => {
                              let dt = { ...data }
                              dt.attribute.options[index].sizes[key].stock = parseInt(e.target.value)
                              setData(dt)
                            }}
                          />
                          <Input
                            label="Prix de la sous-option"
                            placeholder="Saisissez le prix de sous-option (facultatif)"
                            className='col-span-3'
                            value={item.price}
                            onChange={(e) => {
                              let dt = { ...data }
                              dt.attribute.options[index].sizes[key].price = parseInt(e.target.value)
                              setData(dt)
                            }}
                          />
                          <ActionIcon variant='flat' color='danger' onClick={() => {
                            let dt = { ...data }
                            dt.attribute.options[index].sizes.splice(key, 1)
                            setData(dt)
                          }}>
                            <RiDeleteBin5Line />
                          </ActionIcon>
                          <div className='col-span-full'>
                            <Switch
                              label="Permettre aux utilisateurs d'effectuer des achats même si l'article est en rupture de stock."
                              variant="flat"
                              checked={item.underStock}
                              switchClassName='min-w-[40px]'
                              onChange={(e) => {
                                let dt = { ...data }
                                dt.attribute.options[index].sizes[key].underStock = !dt.attribute.options[index].sizes[key].underStock
                                setData(dt)
                              }}
                            />
                          </div>
                        </div>
                        <div className="my-2 border border-dashed border-gray-400/50"></div>
                      </>
                    })
                  }
                  <div>
                    <Button className='gap-2 ' color='secondary' variant='outline' onClick={() => {
                      let dt = { ...data }
                      dt.attribute.options[index].sizes.push({
                        id: 0,
                        price: 0,
                        stock: 0,
                        underStock: false,
                        value: ""
                      })
                      setData(dt)
                    }}>
                      Add Sub Option <AiOutlinePlus className='text-lg' />
                    </Button>
                  </div>
                </div>
              </div>
            })
          }

        </div>

      </div>
      <Button className='gap-2 mt-4' onClick={() => {
        let dt = { ...data }
        dt.attribute.options.push({
          id: 0,
          image: "",
          price: 0,
          sizes: [],
          sku: "",
          stock: 0,
          underStock: false,
          value: ""
        })
        setData(dt)
      }}>
        Add Option <AiOutlinePlus className='text-lg' />
      </Button>
      {footer}
    </div>
  )
}
