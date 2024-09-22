import { useState } from 'react';
import { Button, Input, Password } from 'rizzui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { IoIosInformationCircleOutline, IoMdCheckmark, IoMdSave } from 'react-icons/io';

import { useSelector } from 'react-redux';
import { ThemeSetting } from '../Types/ThemeSetting';
import JoomlaApi from '../Api/JoomlaApi';
import alertError from '../hoock/alertError';
import ApiConfig from '../Api/ApiConfig';
import UploadImageSingle from '../Admin/components/UploadImageSingle';
import Container from '../Views/Container';
import { RootState } from '../Store';

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


export default function Profile() {
    const [isLoading, setLoading] = useState(false);
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const userS = useSelector<RootState>((state) => state.client) as UserAuth

    const formik = useFormik({
        initialValues: {
            firstName: userS.firstName ?? "",
            lastName: userS.lastName ?? "",
            email: userS.email ?? "",
            phoneNumber: userS.phoneNumber?.replace(/^\+213/, '0') ?? "",
            avatar: userS.avatar ?? "",
            password: "",
            address: userS.address ?? "",
            zipCode: "0",
        },
        validationSchema,
        onSubmit: async (values: JoomlaUserInput) => {
            // setLoading(true);
            // try {
            //     let data = await JoomlaApi.signUpClient(values);
            //     // afterChange(data);
            // } catch (error) {
            //     alertError(error);
            // } finally {
            //     setLoading(false);
            // }
        }
    });

    const register = (name: keyof JoomlaUserInput, label: string) => ({
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

    return <Container>
        <form onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-center flex-col gap-4 mt-8'>

                <h1 className='text-2xl font-bold'>Profile</h1>

            </div>
            <div className='grid grid-cols-3 gap-6 my-8 max-sm:grid-cols-1'>
                <div className='col-span-1'>
                    <UploadImageSingle
                        className='min-h-[210px]'
                        setData={(e) => formik.setFieldValue("avatar", e)}
                        imgSrc={formik.values.avatar}
                        error={formik.touched.avatar && formik.errors.avatar ? "error" : null}
                    />
                </div>
                <div className='col-span-2 grid grid-cols-2 gap-2 '>


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
                    {/* <Password
                        className='col-span-full'
                        {...register("password", "Mot de pass")} /> */}
                    <Input
                        className='col-span-full'
                        {...register("address", "Address")} />
                    <div className="mt-4 col-span-full flex justify-end">
                        <Button isLoading={isLoading} disabled={isLoading} variant="solid" type='submit' className='gap-2 '>
                            Register <IoMdSave className='text-lg' />
                        </Button>
                    </div>

                </div>
            </div>



        </form>
    </Container>
}