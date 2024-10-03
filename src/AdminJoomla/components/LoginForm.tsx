import { useState } from 'react'
import { Button, Input, Password } from 'rizzui'

import { useDispatch, useSelector } from 'react-redux';
import ApiConfig from '../../Api/ApiConfig';
import { AppDispatch, RootState } from '../../Store';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import alertError from '../../hoock/alertError';
import { SHA256 } from 'crypto-js';
import JoomlaApi from '../../Api/JoomlaApi';
import { Link, useNavigate } from 'react-router-dom';
import useLang from '../../hoock/useLang';
import useValidation from '../../hoock/Validation';
import { ThemeSetting } from '../../Types/ThemeSetting';
import { changeUser } from '../../Store/authSlice';

type LoginInfo = {
    email: string,
    password: string
}



export default function LoginForm() {
    const theme = useSelector((state:RootState) => state.theme)  as ThemeSetting
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { tr } = useLang()
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

    const loginService = async (values: LoginInfo) => {
        try {
            setLoading(true)
            const data = await JoomlaApi.signInSaller({
                password: values.password,
                email: values.email
            })

            // const data = client
            if (data.id) {
                type UserAuthS= UserAuth|SupplierAuth|ClientAuth|null
                const d:UserAuthS={
                    ...data,
                    authType:"supplier",
                    md5: SHA256(JSON.stringify({...data,authType:"supplier"}) + import.meta.env.VITE_SEC_KEY).toString()
                }
                 
                dispatch(changeUser(d))
                navigate("/joomla-admin/dashboard")


            } else
                toast.error("téléphone ou mot de passe non valide")
            setLoading(false)


        } catch (err) {

            setLoading(false)
            alertError(err)
        }
    }
    return (
        <>
            <form onSubmit={formik.handleSubmit} className='w-full'>
                <div className="flex gap-2 flex-col ">
                    <div className='flex items-center justify-center flex-col gap-4'>
                        <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                            className="h-9 max-md:h-6 " alt="" />
                        <h1 className='text-2xl font-bold'>{tr.auth.login}</h1>
                        <p className='text-center'>
                            {/* Saisissez votre  téléphone pour vous connecter */}
                        </p>
                    </div>
                    <Input
                        label={tr.auth.email}
                        name='email'
                        placeholder={tr.auth.enter_email}
                        className="col-span-2"
                        type='email'
                        value={formik.values.email}
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                email: e.target.value
                            })
                        }}
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        onBlur={formik.handleBlur}
                    />

                    <Password
                        label={tr.auth.password}
                        name='password'
                        placeholder={tr.auth.enter_password}
                        className="col-span-2"
                        value={formik.values.password}
                        onChange={(e) => {
                            formik.setValues({
                                ...formik.values,
                                password: e.target.value
                            })
                        }}
                        error={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                        onBlur={formik.handleBlur}
                    />
                    <div className='flex justify-end'>
                        <Link to={"/joomla-auth/forget_password"} className='text-primary text-sm font-semibold cursor-pointer'>{tr.global.forget_password}</Link>
                    </div>

                    <Button
                        type="submit"
                        isLoading={loading}
                        className="col-span-2 mt-2"
                    // onClick={() => setModalState(false)}
                    >
                        {tr.auth.login}
                    </Button>
                    
                    <p className='text-center text-sm mt-4'>
                        {tr.auth.dont_have_account} <Link to={"/joomla-auth/register"} className='text-primary font-semibold cursor-pointer'>{tr.auth.signup}</Link>
                    </p>
                </div>
            </form>
        </>
    )
}
