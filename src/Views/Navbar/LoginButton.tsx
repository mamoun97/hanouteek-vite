import { useEffect, useState } from 'react'
import { MdClear } from 'react-icons/md'
import { RiUserLine } from 'react-icons/ri'
import { ActionIcon, Avatar, Button, Dropdown, Input, Modal, Password, Text } from 'rizzui'
import { ThemeSetting } from '../../Types/ThemeSetting';
import { useDispatch, useSelector } from 'react-redux';
import ApiConfig from '../../Api/ApiConfig';
import { AppDispatch, RootState } from '../../Store';
import { useFormik } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import alertError from '../../hoock/alertError';
import { SHA256 } from 'crypto-js';
import JoomlaApi from '../../Api/JoomlaApi';
import RegisterView from './RegisterView';
import { changeUser } from '../../Store/authSlice';
import useValidation from '../../hoock/Validation';
import useSessionMiddleware from '../../hoock/useSessionMiddleware';
type LoginInfo = {
    phone: string,
    password: string
}


/* 
phoneNumber: 0661397937
password: secret123
*/

export default function LoginButton() {
    useSessionMiddleware({navUrl:"/"})
    const [modalState, setModalState] = useState(false);
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const userS = useSelector<RootState>((state) => state.user) as UserAuth
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [openRegiter, setOpenRegiste] = useState(false)
    const validationSchema = useValidation({
        phone: true,
        password: true,
    });
    const formik = useFormik({
        initialValues: {
            phone: "",
            password: ""
        },

        onSubmit: (values: LoginInfo) => {

            loginService(values)

        },
        validationSchema,
    });

    const loginService = async (values: LoginInfo, isLoginFromUrl?: boolean) => {
        try {
            setLoading(true)
            const data = await JoomlaApi.signInClient({
                password: values.password,
                phoneNumber:"+213"+Number(values.phone)
            })

            // const data = client
            if (data.id) {
                type UserAuthS= UserAuth|SupplierAuth|ClientAuth|null
                const d:UserAuthS={
                    ...data,
                    authType:"client",
                    md5: SHA256(JSON.stringify({...data,authType:"client"}) + import.meta.env.VITE_SEC_KEY).toString()
                }
                dispatch(changeUser(d))
                setModalState(false)
            } else
                toast.error("téléphone ou mot de passe non valide")
            setLoading(false)


        } catch (err) {

            setLoading(false)
            alertError(err)
        }
    }
    useEffect(()=>{
        setOpenRegiste(false)
    },[modalState])
    return (
        <>
            {userS&&userS.authType=="client" ?
                <Dropdown placement="bottom-end">
                    <Dropdown.Trigger className='flex'>
                        <Button variant="text" size="sm" className="text-base gap-2" onClick={() => {

                        }} >
                            <Avatar
                                name=""
                                src={ApiConfig.rootUrl + "/" + userS.avatar}
                            />
                            <span className='max-w-[60px] line-clamp-1 whitespace-nowrap '>{userS.firstName + " " + userS.lastName}</span>
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Menu className="w-56  text-gray-600">
                        <Dropdown.Item className="hover:bg-transparent overflow-hidden">
                            <div className='flex w-full'>
                                <Avatar
                                    name=""
                                    src={ApiConfig.rootUrl + "/" + userS.avatar}
                                />
                                <div className='grow  '>
                                    <div className="ms-2 text-start max-w-full overflow-hidden ">
                                        <Text className="text-gray-900 font-medium leading-tight">
                                            {userS.firstName + " " + userS.lastName}
                                        </Text>
                                        <p className='whitespace-nowrap  max-w-full line-clamp-1'>{userS.email}</p>
                                    </div>
                                </div>

                            </div>
                        </Dropdown.Item>
                        <Dropdown.Item className="mt-2 pt-2" onClick={() => {
                            navigate("/joomla/profile")
                        }}>
                            Profil
                        </Dropdown.Item>
                        <Dropdown.Item className=" pt-2" onClick={() => {
                            navigate("/joomla-orders")
                        }}>
                            Mes commandes
                        </Dropdown.Item>
                        <div className="">
                            <Dropdown.Item onClick={() => {
                                dispatch(changeUser(null))
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
                <div className="m-auto px-7  pt-2 pb-8" key={"mmmm"+modalState}>
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
                    {
                        openRegiter ? <RegisterView afterChange={(e)=>{
                            
                            toast.success( "add success");
                            setOpenRegiste(false)
                        }} onClose={setOpenRegiste}/> :
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
                                        label={"N° Téléphone"}
                                        name='phone'
                                        placeholder='Entrez votre Téléphone'
                                        className="col-span-2"
                                        type='tel'
                                        value={formik.values.phone}
                                        onChange={(e) => {
                                            formik.setValues({
                                                ...formik.values,
                                                phone: e.target.value
                                            })
                                        }}
                                        error={formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                                        onBlur={formik.handleBlur}
                                    />

                                    <Password
                                        label="Mot de pass"
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
                                        error={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                                        onBlur={formik.handleBlur}
                                    />

                                    <Button
                                        type="submit"
                                        isLoading={loading}
                                        className="col-span-2 mt-2"
                                    // onClick={() => setModalState(false)}
                                    >
                                        Soumettre
                                    </Button>
                                    <p className='text-center text-sm mt-4'>
                                        Don't have an account ? <span onClick={() => setOpenRegiste(true)} className='text-primary font-semibold cursor-pointer'>Sign up</span>
                                    </p>
                                </div>
                            </form>
                    }

                </div>
            </Modal>
            <Toaster position="top-center" />
        </>
    )
}
