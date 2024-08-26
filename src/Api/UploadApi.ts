import { loadData } from "../Store/localStorage";
import ApiConfig from "./ApiConfig";
import req from "./GlobalParam";

const uploadImages = async (images: File[],db?:string):Promise<string> => {
    const user:UserAuth|null = loadData("user") 

    const formData = new FormData();
    images.forEach((image, _) => {
      formData.append('file', image);
    });
    const {data}=await req.httpAuthUpload(user?.token??"").post("/upload-image"+(db??ApiConfig.dbq),formData);
    return data
}

const UploadApi={
    uploadImages
}
export default UploadApi
