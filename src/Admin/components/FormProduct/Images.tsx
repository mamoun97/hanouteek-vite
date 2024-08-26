
import UploadImage from '../UploadImage'

export default function Images({
    data,setData,footer
}:SubFormProps) {
  return (
    <div>
      <div className='my-3 flex justify-center'>
      <UploadImage {...{data,setData}}/>
      </div>
      {footer}
    </div>
  )
}
