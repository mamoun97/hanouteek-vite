import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";
import { ThemeSetting } from "../Types/ThemeSetting";

const read = async (db?:string): Promise<ThemeSetting> => {
    const {data}=await req.http.get("/tenant/store/findOne" + (db??ApiConfig.dbq));
    return data
}



const ThemeApi = {
    read
};


export default ThemeApi;