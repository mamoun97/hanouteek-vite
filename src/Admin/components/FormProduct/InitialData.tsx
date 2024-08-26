import React from 'react'
import { Input, Switch } from 'rizzui'
import CategoryInputSearch from '../CategoryInputSearch'

type ITEType={
    label: string,
    key: keyof  ProductFull
}[]
const its:ITEType=[
  {
    label: "Livraison gratuite",
    key: "freeshipping"
  },
  {
    label: "Autoriser les achats pour les articles en rupture de stock.",
    key: "underStock"
  },
  {
    label: "Offre disponible",
    key: "hasOffer"
  },
  {
    label: "Prix de livraison spécifique",
    key: "specificPriceDelivery"
  },
]
export default function InitialData({
  data, setData, footer
}: SubFormProps) {
  
  return (
    <div>
      <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2'>
        <Input
          label="Name"
          placeholder="Enter your name"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />
        <CategoryInputSearch
          isSearch={true}
          nameCategory={data.category.name}
          setValue={(e: Category) => {
            console.log(e)
            setData({ ...data, category: {id:e.id, name: e.name } })
          }}
        />
        <Input
          label="Stock"
          type='number'
          placeholder="Enter your name"
          value={data.stock}
          onChange={e => setData({ ...data, stock: parseInt(e.target.value) })}
        />
        <Input
          label="Prix de vent"
          type="number"
          suffix={
            <span>DZD</span>
          }
          min={0}
          step={1}
          value={data.price}
          onChange={e => setData({ ...data, price: parseInt(e.target.value) })}

        />
        <Input
          label="Prix hors remise"
          type="number"
          suffix={
            <span>DZD</span>
          }
          min={0}
          value={data.CompareAtPrice}
          onChange={e => setData({ ...data, CompareAtPrice: parseInt(e.target.value) })}

        />
        <Input
          label="Prix d'achat"
          type="number"
          suffix={
            <span>DZD</span>
          }
          value={data.originalPrice}
          onChange={e => setData({ ...data, originalPrice: parseInt(e.target.value) })}
          
          min={0}

        />
        {
          its.map((el, k) => {
            return <Switch
            key={k}

              variant="flat"
              label={el.label}
              className='col-span-full'
              switchClassName='min-w-[40px]'
              checked={data[el.key]}
              onChange={(_) => {
                setData({ ...data, [el.key ]: !data[el.key] })
              }}
            />
          })
        }
        

      </div>
      {footer}
    </div>
  )
}
