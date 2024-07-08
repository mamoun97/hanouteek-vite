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
    email: string,
    password: string
}

const validationS = Yup.object().shape({
    password: Yup.string().min(0, ""),
    email: Yup.string().email().required()
});
const client: UserAuth = {
    id: 23,
    firstName: "Amine",
    lastName: "Cherif",
    email: "amine974@gmail.com",
    phoneNumber: "665584456",
    address: "ORAN",
    role: "associate",
    avatar: "22-1718206645219-681670605.webp",
    active: true,
    socketId: null,
    isOnline: false,
    created_at: "2024-06-07T09:16:15.382Z",
    updated_at: "2024-07-07T14:10:56.000Z",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIzLCJlbWFpbCI6ImFtaW5lOTc0QGdtYWlsLmNvbSIsImlhdCI6MTcyMDM2MTU2MSwiZXhwIjoxNzUxNDY1NTYxfQ.QHhxb94GRlU0qmu0La4nFutlIX10tlFySgH-2PJseSA", "md5": "336986e35f2560c2875fe709e2835ede721b1ccd1f45fe020966ea7111827b1d"
}
export default function LoginButton() {
    const [modalState, setModalState] = useState(false);
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const userS = useSelector<RootState>((state) => state.client) as UserAuth
    const dispatch: AppDispatch = useDispatch();
    const navigate=useNavigate()
    const [loading, setLoading] = useState(false)
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
            // const data = await AuthApi.signInClient(values)
            const data = client
            if (values.email==data.email&&values.password=="123456") {

                dispatch(changeClient({
                    ...data
                }))

                setModalState(false)
            }else
            toast.error("email or password not valid")
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
                                Sign Out
                            </Dropdown.Item>
                        </div>
                    </Dropdown.Menu>
                </Dropdown>
                : <Button variant="text" size="sm" className="text-base gap-2" onClick={() => {
                    setModalState(true)
                }} >
                    <RiUserLine className="text-lg" />
                    Se connecter
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
                                    Saisissez votre adresse e-mail ou numéro de téléphone pour vous connecter
                                </p>
                            </div>
                            <Input
                                label="Email"
                                size="lg"
                                placeholder='Enter your email'
                                className="col-span-2"
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
                                label="Password"
                                size="lg"
                                placeholder='Enter your password'
                                className="col-span-2"
                                value={formik.values.password}
                                onChange={(e) => {
                                    formik.setValues({
                                        ...formik.values,
                                        password: e.target.value
                                    })
                                }}
                                onBlur={formik.handleBlur}
                            />

                            <Button
                                type="submit"
                                size="lg"
                                isLoading={loading}
                                className="col-span-2 mt-2"
                            // onClick={() => setModalState(false)}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </div>
            </Modal>
            <Toaster position="top-center" />
        </>
    )
}
