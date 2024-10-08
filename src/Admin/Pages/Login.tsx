import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { ThemeSetting } from "../../Types/ThemeSetting";
import ApiConfig from "../../Api/ApiConfig";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthApi from "../../Api/Auth";
import { changeUser } from "../../Store/authSlice";
import { Button, Input, Password } from "rizzui";
import toast, { Toaster } from 'react-hot-toast';
import sha256 from 'crypto-js/sha256';
import { AxiosError } from "axios";
import useLang from "../../hoock/useLang";
import LangButton from "../components/LangButton";
import useValidation from "../../hoock/Validation";
import ContainerAuth from "../components/ContainerAuth";
import PassToDashboard from "../../hoock/usePassToDashboard";
type LoginInfo = {
    email: string,
    password: string
}




export default function Login() {
    const navigate = useNavigate()
    const param = new URLSearchParams(window.location.search)

    const [loginFromUrl, setLoginFromUrl] = useState<LoginInfo | null>(
        (!!param.get("email") && !!param.get("password")) ? {
            email: param.get("email") ?? "",
            password: param.get("password") ?? ""
        } : null)

    const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
    const dispatch: AppDispatch = useDispatch();
    const { tr } = useLang()
    const [loading, setLoading] = useState(false)
    const validationS = useValidation({
        password: true,
        email: true
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        onSubmit: (values: LoginInfo) => {

            loginService(values)

        },
        validationSchema: validationS,
    });
    const loginService = async (values: LoginInfo, isLoginFromUrl?: boolean) => {
        try {
            setLoading(true)
            const data = await AuthApi.signIn(values)
            // const data=client
            if (data.id) {
                type UserAuthS = UserAuth | SupplierAuth | ClientAuth | null
                const d: UserAuthS = {
                    ...data,
                    authType: "user",
                    md5: sha256(JSON.stringify({ ...data, authType: "user" }) + import.meta.env.VITE_SEC_KEY).toString()
                }
                dispatch(changeUser(d))
                navigate("/dashboard")

                setLoading(false)
            } else {
                if (isLoginFromUrl) {
                    formik.setValues({
                        email: loginFromUrl?.email ?? "",
                        password: loginFromUrl?.password ?? ""
                    })
                    setLoginFromUrl(null)
                }
                setLoading(false)
            }

        } catch (err: AxiosError | any) {
            if (isLoginFromUrl) {
                formik.setValues({
                    email: loginFromUrl?.email ?? "",
                    password: loginFromUrl?.password ?? ""
                })
                setLoginFromUrl(null)
            }
            setLoading(false)
            toast.error(err.response ? err.response.data.message : err.message)
        }
    }

    useEffect(() => {
        
        if (loginFromUrl?.email && loginFromUrl.password) {
            loginService(loginFromUrl, true)
        }
    }, [])
    const LoginView = <ContainerAuth>

        <div className="grow"></div>
        <div className="w-full bg-card rounded-lg p-4">
            <div className="flex items-center gap-4 flex-col p-2 justify-center mb-3">
                <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                    className="h-16 max-md:h-9   " alt="" />
                <h1 className='text-2xl font-bold'>{tr.auth.login}</h1>
            </div>
            <Input
                id="email"
                label={tr.auth.email}

                labelClassName="font-semibold"
                type="email"
                inputClassName=""
                required
                className={""}
                placeholder={tr.auth.enter_email}
                value={formik.values.email}
                onChange={(e) => {
                    formik.setValues({
                        ...formik.values,
                        email: e.target.value
                    })
                }}
                onBlur={formik.handleBlur}
            />

            <Password
                id="password"
                label={tr.auth.password}
                labelClassName="font-semibold"
                required
                className="mt-2"
                placeholder={tr.auth.enter_password}
                value={formik.values.password}
                onChange={(e) => {
                    formik.setValues({
                        ...formik.values,
                        password: e.target.value
                    })
                }}
                onBlur={formik.handleBlur}

            />
            <div className='flex justify-end mt-3'>
                <Link to={"/admin/forget_password"} className='text-primary text-sm font-semibold cursor-pointer'>{tr.global.forget_password}</Link>
            </div>
            <Button
                type="submit"
                // onClick={}
                isLoading={loading}
                color="primary"
                className={` grow  mb-3 max-h-11 h-11 mt-3 uppercase w-full`}>

                {tr.auth.login}
            </Button>
            {ApiConfig.isDrop && <p className='text-center text-sm mt-4'>
                {tr.auth.dont_have_account} <Link to={"/admin/register"} className='text-primary font-semibold cursor-pointer'>{tr.auth.signup}</Link>
            </p>}
        </div>

        <div className="grow"></div>
        <div className="my-2">
            <LangButton />
        </div>
        <div className="text-sm mb-3" dir="ltr">
            All rights reserved by <a href="https://devgate.net/" target="_blank" className="ms-1"> Devgate</a> © 2024..
        </div>

    </ContainerAuth>



    return (
        <>
            <PassToDashboard authType='user' navUrl='/dashboard'>

                <form className="" onSubmit={formik.handleSubmit}>

                    {loginFromUrl?.email && loginFromUrl.password ?
                        <div className="h-screen flex items-center justify-center">
                            <svg aria-hidden="true" role="status" className="inline w-16 h-1w-16 me-3 text-primary animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </div> :
                        LoginView}

                    <Toaster position="bottom-center" />
                </form>
            </PassToDashboard>
        </>
    )
}
