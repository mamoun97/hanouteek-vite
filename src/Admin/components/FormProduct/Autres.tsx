
import ProductSelect from '../ProductSelect'
import { Input, Switch } from 'rizzui'

type ItemsType = {
  label: string,
  key: keyof ProductFull,
  placeholder?:string
}[]

const limitItems: ItemsType = [
  {
    label: "limitAlet One :",
    key: "limitAlert"
  },
  {
    label: "limitAlet Two :",
    key: "limitAlertOne"
  },
  {
    label: "limitAlet Three :",
    key: "limitAlertTwo"
  },
]
const posItems: ItemsType = [
  {
    label: "Range :",
    key: "range",
    placeholder:"Enter range"
  },
  {
    label: "Stage :",
    key: "stage",
    placeholder:"Enter stage"
  },
  {
    label: "Position :",
    key: "position",
    placeholder:"Enter position"
  },
]
const items: ItemsType = [
  {
    label: "Visible",
    key: "state"
  },
  {
    label: "Afficher le titre",
    key: "showTitle"
  },
  {
    label: "Afficher les images",
    key: "showImages"
  },
  {
    label: "Afficher le prix total",
    key: "showPriceTotal"
  },
  {
    label: "Afficher le prix réduit",
    key: "showPriceDiscount"
  },
  {
    label: "Afficher le compte à rebours",
    key: "showCountdown"
  },
]
export default function Autres({
  data, setData, footer
}: SubFormProps) {
  return (
    <div>
      <div className='flex flex-col gap-1'>
        <ProductSelect />
        {/* <h1 className='rizzui-input-label block text-sm mb-1.5 font-medium mt-4'>Related products</h1> */}

        <h1 className='rizzui-input-label block text-sm mb-1.5 font-medium mt-4'>Stock Alert ?</h1>
        <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 '>
          {
            limitItems.map((el, k) => {
              return <Input
                key={k}
                prefix={el.label}
                type='number'
                min={0}
                value={data[el.key]}
                onChange={(e) => setData({ ...data, [el.key]: Number(e.target.value) })}
                className='col-span-1'
                placeholder="."
              />
            })
          }


        </div>
        <h1 className='rizzui-input-label block text-sm mb-1.5 font-medium mt-4'>Has Position ?</h1>
        <div className='grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 '>
          {
            posItems.map((el, k) => {
              return <Input
                key={k}
                prefix={el.label}
                value={data[el.key]}
                onChange={(e) => setData({ ...data, [el.key]: e.target.value })}
                placeholder={el.placeholder}
                className='col-span-1'
              />
            })
          }
          
        </div>
        <h1 className='rizzui-input-label block text-sm mb-1.5 font-medium mt-4'>Visibility</h1>
        <div className='grid grid-cols-2 gap-1 max-sm:grid-cols-1 '>
          {
            items.map((el, k) => {
              return <Switch
                key={k}
                label={el.label}
                checked={data[el.key]}
                onChange={() => setData({ ...data, [el.key]: !data[el.key] })}
              />

            })
          }

        </div>
      </div>
      {footer}
    </div>
  )
}
