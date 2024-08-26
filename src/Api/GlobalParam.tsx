import axios from "axios";
import ApiConfig from "./ApiConfig";


const http = axios.create({
  baseURL: ApiConfig.url,
  headers: {
    "Content-type": "application/json",
 }
})
const httpAuth =(token:string)=> axios.create({
  baseURL: ApiConfig.url,
  headers: {
    "Content-type": "application/json",
    Authorization:"Bearer "+token
 }
})
const httpAuthUpload =(token:string)=> axios.create({
  baseURL: ApiConfig.url,
  headers: {
    "Content-type": "multipart/form-data",
    Authorization:"Bearer "+token
 }
})



const req = {
  http,httpAuth,httpAuthUpload
}

export default req;