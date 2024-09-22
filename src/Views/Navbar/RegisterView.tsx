import { useState } from 'react';
import { Button, Input, Password } from 'rizzui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import alertError from '../../hoock/alertError';
import { IoIosInformationCircleOutline, IoMdCheckmark, IoMdSave } from 'react-icons/io';
import UploadImageSingle from '../../Admin/components/UploadImageSingle';
import ApiConfig from '../../Api/ApiConfig';
import { useSelector } from 'react-redux';
import { ThemeSetting } from '../../Types/ThemeSetting';
import JoomlaApi from '../../Api/JoomlaApi';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^0[567][0-9]{8}$/, 'Phone number must start with 0 followed by 5, 6, or 7, and then 8 digits').required('Phone number is required'),
    // avatar: Yup.string().required('Image is required'),
    password: Yup.string().required('Password is required'),
    address: Yup.string().required('address is required'),
});


interface JoomlaUserInput extends Omit<JoomlaClient, 'password'> {
    password: string;
}


export default function RegisterView({ onClose, afterChange }: { afterChange: (e: JoomlaClientFull) => void, onClose: (e: boolean) => void }) {
    const [isLoading, setLoading] = useState(false);
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            avatar: "",
            password: "",
            address: "",
            zipCode: "0",
        },
        validationSchema,
        onSubmit: async (values: JoomlaUserInput) => {
            setLoading(true);
            try {
                let data = await JoomlaApi.signUpClient(values);
                afterChange(data);
            } catch (error) {
                alertError(error);
            } finally {
                setLoading(false);
            }
        }
    });

    const register = (name:keyof JoomlaUserInput, label: string) => ({
        label,
        suffix: formik.touched[name] ? (
            !!formik.errors[name] ? <IoIosInformationCircleOutline className='text-lg' /> : <IoMdCheckmark className='text-lg' />
        ) : null,

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

    return <form onSubmit={formik.handleSubmit}>
        <div className='flex items-center justify-center flex-col gap-4'>
            <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                className="h-9 max-md:h-5 max-[400px]:hidden" alt="" />
            <h1 className='text-2xl font-bold'>Inscription</h1>

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
                {...register("firstName", "Nom")} />
            <Input
                className='col-span-1' 
                {...register("lastName", "Prénom")} />
            <Input
                className='col-span-1 max-sm:col-span-full' 
                {...register("email", "Email")} type='email' />
            <Input
                className='col-span-1 max-sm:col-span-full' 
                {...register("phoneNumber", "N° Téléphone")} />
            <Password
                className='col-span-full' 
                {...register("password", "Mot de pass")} />
            <Input
                className='col-span-full' 
                {...register("address", "Address")} />

        </div>
        <div className="mt-4">
            <Button isLoading={isLoading} disabled={isLoading} variant="solid" type='submit' className='gap-2 w-full'>
                Register <IoMdSave className='text-lg' />
            </Button>
        </div>
        <p className='text-center text-sm mt-4'>
            Already have an account ? <span onClick={() => onClose(false)} className='text-primary font-semibold cursor-pointer'>Login</span>
        </p>
    </form>
}