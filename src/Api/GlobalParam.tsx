import axios from "axios";
import ApiConfig from "./ApiConfig";
import { loadData } from "../Store/localStorage";


const http = axios.create({
  baseURL: ApiConfig.url,
  headers: {
    "Content-type": "application/json",
  }
})
const httpAuth = (token: string) => {
  const user: UserAuth | null = loadData("user")
  const client: ClientAuth | null = loadData("client")
  return axios.create({
    baseURL: ApiConfig.url,
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + (user?.token??client?.token)
    }
  })
}
const httpAuthUpload = (token: string) => {
  const user: UserAuth | null = loadData("user")
  const client: ClientAuth | null = loadData("client")
  return axios.create({
    baseURL: ApiConfig.url,
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: "Bearer " + (user?.token??client?.token)
    }
  })
}



const req = {
  http, httpAuth, httpAuthUpload
}

export default req;