import req from "./GlobalParam";
import ApiConfig from "./ApiConfig";
import { loadData } from "../Store/localStorage";


const signIn = async (dt: { email: string, password: string }): Promise<UserAuth> => {
    const { data } = await req.http.post("/tenant/associate/login" + ApiConfig.dbq, dt);
    return data
}
const signOut = async (): Promise<any> => {
    const user: UserAuth | null = loadData("user")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/associate/logout" + ApiConfig.dbq);
    return data
}

const signInClient = async (dt: { phoneNumber: string, password: string }): Promise<ClientAuth> => {
    const { data } = await req.http.post("/tenant/client/login" + ApiConfig.dbq, dt);
    return data
}
const signOutClient = async (): Promise<any> => {
    const user: UserAuth | null = loadData("client")
    const { data } = await req.httpAuth(user?.token ?? "").get("/tenant/client/logout" + ApiConfig.dbq);
    return data
}



const AuthApi = {
    signIn, signOut,
    signInClient,
    signOutClient
}
export default AuthApi