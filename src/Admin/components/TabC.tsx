
import { Button } from 'rizzui'

type DataCat={
    name:string,
    onClick:(e:any)=>void,
    active?:boolean

}
export default function TabC({data,size="md"}:{data:DataCat[],size?:"lg"|"sm"|"md"|"xl"}) {
  return (
  
      <div className=' flex no-scrollbar overflow-x-auto whitespace-nowrap gap-1   bg-content1 z-20 border-b dark:border-gray-700'>
        {
            data.map((el,k)=>{
                return <Button size={size} variant={"text"} key={k} onClick={el.onClick} 
                className={`capitalize rounded-none border-b-2 border-transparent ${el.active?"border-primary text-primary":""}`}>
                    {el.name.toLowerCase()}
                </Button>
            })
        }
      </div>

  )
}
