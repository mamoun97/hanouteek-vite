import { useState } from 'react'
import { MdClear } from 'react-icons/md'
import { RiUserLine } from 'react-icons/ri'
import { ActionIcon, Avatar, Button, Dropdown, Input, Modal, Password, Text } from 'rizzui'
import { ThemeSetting } from '../../Types/ThemeSetting';
import { useDispatch, useSelector } from 'react-redux';
import ApiConfig from '../../Api/ApiConfig';
import { AppDispatch, RootState } from '../../Store';
import * as Yup from "yup";
import { useFormik } from 'formik';
import { changeClient } from '../../Store/authSliceClient';
import AuthApi from '../../Api/Auth';
import { AxiosError } from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
type LoginInfo = {
    phone: string,
    password: string
}

const validationS = Yup.object().shape({
    password: Yup.string().min(0, "").required("requis"),
    phone: Yup.string()
    .matches(
        /^0[567][0-9]{8}$/,
        "téléphone invalide"
    ).required("requis")
});

export default function LoginButton() {
    const [modalState, setModalState] = useState(false);
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const userS = useSelector<RootState>((state) => state.client) as UserAuth
    const dispatch: AppDispatch = useDispatch();
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            phone: "",
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
            const data = await AuthApi.signInClient({
                password:values.password,
                phoneNumber:"+213"+parseInt(values.phone)
            })
           
            // const data = client
            if (data.id) {

                dispatch(changeClient({
                    ...data
                }))

                setModalState(false)
            }else
            toast.error("téléphone ou mot de passe non valide")
            setLoading(false)


        } catch (err: AxiosError | any) {

            setLoading(false)
            toast.error(err.response ? err.response.data.message : err.message)
        }
    }
    return (
        <>
            {userS ?
                <Dropdown placement="bottom-end">
                    <Dropdown.Trigger className='flex'>
                        <Button variant="text" size="sm" className="text-base gap-2" onClick={() => {

                        }} >
                            <Avatar
                                name=""
                                src={ApiConfig.rootUrl + "/" + userS.avatar}
                            />
                            {userS.firstName + " " + userS.lastName}
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Menu className="w-56 divide-y text-gray-600">
                        <Dropdown.Item className="hover:bg-transparent">
                            <Avatar
                                name=""
                                src={ApiConfig.rootUrl + "/" + userS.avatar}
                            />
                            <span className="ml-2 text-start">
                                <Text className="text-gray-900 font-medium leading-tight">
                                {userS.firstName + " " + userS.lastName}
                                </Text>
                                <Text>{userS.email}</Text>
                            </span>
                        </Dropdown.Item>
                        
                        <div className="mt-2 pt-2">
                            <Dropdown.Item className="hover:bg-gray-900 hover:text-gray-50" onClick={()=>{
                                dispatch(changeClient(null))
                                navigate("/")
                            }}>
                                Se déconnecter
                            </Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                : <Button variant="text" size="sm" className="text-base gap-2" onClick={() => {
                    setModalState(true)
                }} >
                    <RiUserLine className="text-lg" />
                    <span className='max-[950px]:hidden'></span>
                </Button>}

            <Modal isOpen={modalState} onClose={() => setModalState(false)}>
                <div className="m-auto px-7  pt-2 pb-8">
                    <div className="mb-3 flex items-center justify-end">

                        <ActionIcon
                            size="lg"
                            className='text-2xl'
                            variant="text"
                            onClick={() => setModalState(false)}
                        >
                            <MdClear />
                        </ActionIcon>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex gap-2 flex-col">
                            <div className='flex items-center justify-center flex-col gap-4'>
                                <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                                    className="h-9 max-md:h-5 max-[400px]:hidden" alt="" />
                                <h1 className='text-2xl font-bold'>Se connecter</h1>
                                <p className='text-center'>
                                    Saisissez votre  téléphone pour vous connecter
                                </p>
                            </div>
                            <Input
                                label={"N° téléphone"}
                                size="lg"
                                name='phone'
                                placeholder='Entrez votre téléphone'
                                className="col-span-2"
                                type='tel'
                                value={formik.values.phone}
                                onChange={(e) => {
                                    formik.setValues({
                                        ...formik.values,
                                        phone: e.target.value
                                    })
                                }}
                                error={formik.touched.phone&&formik.errors.phone?formik.errors.phone:""}
                                onBlur={formik.handleBlur}
                            />

                            <Password
                                label="Mot de pass"
                                size="lg"
                                name='password'
                                placeholder='Entrez votre mot de passe'
                                className="col-span-2"
                                value={formik.values.password}
                                onChange={(e) => {
                                    formik.setValues({
                                        ...formik.values,
                                        password: e.target.value
                                    })
                                }}
                                error={formik.touched.password&&formik.errors.password?formik.errors.password:""}
                                onBlur={formik.handleBlur}
                            />

                            <Button
                                type="submit"
                                size="lg"
                                isLoading={loading}
                                className="col-span-2 mt-2"
                            // onClick={() => setModalState(false)}
                            >
                                Soumettre
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Toaster position="top-center" />
        </>
    )
}
