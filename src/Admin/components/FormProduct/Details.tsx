
import { Textarea } from 'rizzui'
import RitchTextEditor from '../RitchTextEditor'

export default function Details({
  data, setData, footer
}: SubFormProps) {
  return (
    <div>
      <Textarea
        label="Sub description"
        value={data.sub_description}
        onChange={(e)=>setData({...data,sub_description:e.target.value})}
        placeholder="Write you message..."
      />
      <div className="mt-4"></div>
      <RitchTextEditor initialValue={data.description} setValue={(e)=>{
        setData({...data,description:e})
      }}/>
      {footer}
    </div>
  )
}
