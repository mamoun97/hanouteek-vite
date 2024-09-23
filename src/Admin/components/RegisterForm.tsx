import { useState } from 'react';
import { Button, Input, Password } from 'rizzui';
import { useFormik } from 'formik';
import alertError from '../../hoock/alertError';
import { IoMdSave } from 'react-icons/io';
import UploadImageSingle from '../../Admin/components/UploadImageSingle';
import ApiConfig from '../../Api/ApiConfig';
import { useSelector } from 'react-redux';
import { ThemeSetting } from '../../Types/ThemeSetting';
import { Link, useNavigate } from 'react-router-dom';
import AuthApi from '../../Api/Auth';
import useModal from '../../hoock/useModal';
import { LuBadgeCheck } from 'react-icons/lu';
import useValidation from '../../hoock/Validation';
import useLang from '../../hoock/useLang';



type JoomlaUserInput = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    role: string,
    avatar: string,
    password: string
};


export default function RegisterForm() {
    const [isLoading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const { ModalView } = useModal({
        open, setOpen,
        closable: false,
        content: <div className='flex items-center justify-center flex-col gap-2'>
            <LuBadgeCheck className='text-green-500 w-14 h-14' />
            <p className='text-center max-w-md'>
                Bienvenue dans la famille Risedrop, votre inscription a été effectuée avec succès. Votre compte sera vérifié et activé sous peu 🙏.
            </p>
            <Link to={"/admin"}>
                <Button variant='solid' className='min-w-[80px] mt-6' color='primary'>
                    Ok
                </Button>
            </Link>
        </div>
    })
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const navigate = useNavigate()
    const validationSchema = useValidation({
        firstName:true,
        lastName:true,
        email:true,
        phone:true,
        address:true,
        password:true
    })
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            role: "vendor",
            avatar: "",
            password: ""
        },
        validationSchema,
        onSubmit: async (values: JoomlaUserInput) => {
            setLoading(true);

            try {
                let data = await AuthApi.signUp({
                    id: 0,
                    ...values,
                    role: "vendor",
                    phone: "+213" + Number(values.phone),
                });
                setOpen(true)
            } catch (error) {
                alertError(error);
            } finally {
                setLoading(false);
                // setModalState(false);
            }
        }
    });

    const register = (name: "email" | "firstName" | "lastName" | "phone" | "password" | "email" | "address", label: string) => ({
        label,
        // suffix: formik.touched[name] ? (
        //     !!formik.errors[name] ? <IoIosInformationCircleOutline className='text-lg' /> : <IoMdCheckmark className='text-lg' />
        // ) : null,
        error: formik.touched[name] ? formik.errors[name] : "",
        value: formik.values[name],
        onChange: (e: any) => formik.setFieldValue(name, e.target.value),
        onBlur: (_: any) => {
            formik.setTouched({
                ...formik.touched,
                [name]: true
            })
        }
    });

    const {tr}=useLang()

    return <form onSubmit={formik.handleSubmit}>
        <div className='flex items-center justify-center flex-col gap-4'>
            <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                className="h-16 max-md:h-9 " alt="" />
            <h1 className='text-2xl font-bold'>{tr.auth.signup}</h1>

        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
            <div className='col-span-full'>
                <UploadImageSingle
                    className='min-h-[210px]'
                    setData={(e) => formik.setFieldValue("avatar", e)}
                    imgSrc={formik.values.avatar}
                    error={formik.touched.avatar && formik.errors.avatar ? "error" : null}
                />
                {/* {formik.touched.avatar && formik.errors.avatar && (
                    <span className='text-red text-[13px] mt-0.5 rizzui-input-error-text'>
                        {formik.errors.avatar}
                    </span>
                )} */}
            </div>
            <Input
                className='col-span-1'
                placeholder={tr.auth.enter_first_name}
                {...register("firstName", tr.auth.first_name)} />
            <Input
                className='col-span-1'
                placeholder={tr.auth.enter_last_name}
                {...register("lastName", tr.auth.last_name)} />
            <Input
                className='col-span-1 max-sm:col-span-full'
                placeholder={tr.auth.enter_email}
                {...register("email", tr.auth.email)} type='email' />
            <Input
                className='col-span-1 max-sm:col-span-full'
                placeholder=' '
                {...register("phone", tr.auth.phone)} />
            <Password
                className='col-span-full'
                placeholder={tr.auth.enter_password}
                {...register("password", tr.auth.password)} />
            <Input
                className='col-span-full'
                placeholder={tr.auth.enter_address}
                {...register("address", tr.auth.address)} />

        </div>
        <div className="mt-4">
            <Button isLoading={isLoading} disabled={isLoading} variant="solid" type='submit' className='gap-2 w-full'>
                {tr.auth.send} <IoMdSave className='text-lg' />
            </Button>
        </div>
        <p className='text-center text-sm mt-4'>
            {tr.auth.have_account} <Link to={"/admin"} className='text-primary font-semibold cursor-pointer'>{tr.auth.login}</Link>
        </p>
        {ModalView}
    </form>
}