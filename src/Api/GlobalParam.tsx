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



const req = {
  http,httpAuth
}

export default req;