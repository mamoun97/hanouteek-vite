
import ApiConfig from '../Api/ApiConfig'
import images from '../assets'

export default function imgSrc(src:string|null|undefined,withUrl?:boolean) {
  if(withUrl){
    return !!src?ApiConfig.rootUrl + "/"+src:images.img_notfound
  }
  return !!src?src:images.img_notfound
}
