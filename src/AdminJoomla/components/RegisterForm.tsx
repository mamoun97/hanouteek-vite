import { useEffect, useState } from 'react';
import { MdOutlineClear } from 'react-icons/md';
import { ActionIcon, Button, Input, Password, Select, Text } from 'rizzui';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import alertError from '../../hoock/alertError';
import { IoMdSave } from 'react-icons/io';

import toast from 'react-hot-toast';
import UploadImageSingle from '../../Admin/components/UploadImageSingle';
import { useGetWilayasService } from '../../Api/Services';
import ProductApi from '../../Api/ProductApi';
import useSWR from 'swr';
import ApiConfig from '../../Api/ApiConfig';
import { useSelector } from 'react-redux';
import { ThemeSetting } from '../../Types/ThemeSetting';
import JoomlaApi from '../../Api/JoomlaApi';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^0[567][0-9]{8}$/, 'Phone number must start with 0 followed by 5, 6, or 7, and then 8 digits').required('Phone number is required'),
    wilaya: Yup.object().nullable().required('Wilaya is required'),
    commune: Yup.object().nullable().required('Commune is required'),
    // avatar: Yup.string().required('Image is required'),
    password: Yup.string().required('Password is required'),
});

type JoomlaUserInput = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    wilaya: { label: string, value: string, item: Wilaya } | null,
    commune: { label: string, value: string, item: Commune } | null,
    role: string,
    avatar: string,
    password:string
};




export default function RegisterForm() {
    const [isLoading, setLoading] = useState(false);
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            wilaya: null,
            commune: null,
            role: "",
            avatar: "",
            password:""
        },
        validationSchema,
        onSubmit: async (values: JoomlaUserInput) => {
            setLoading(true);
            const { wilaya,commune, ...rest } = values;
            const payload = { ...rest, wilaya: wilaya?.value ?? "",commune: commune?.value ?? "" };
            try {
                let data=await JoomlaApi.signUpSaller(payload);
                
                navigate("/joomla-auth")
            } catch (error) {
                alertError(error);
            } finally {
                setLoading(false);
                // setModalState(false);
            }
        }
    });

    const register = (name: "email" | "firstName" | "lastName" | "phone"|"password" | "email" | "avatar", label: string) => ({
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


    const { data: wilayas, isLoading: lodingWilaya } = useGetWilayasService();
    const { data: communes, isLoading: communeLoading } = useSWR(
        `/tenant/city-delivery/${formik.values.wilaya?.item?.id ?? 0}`,
        () => ProductApi.getCityDelivery(formik.values.wilaya?.item?.id ?? 0),
        {
            keepPreviousData: true,
        }
    )
    return <form onSubmit={formik.handleSubmit}>
        <div className='flex items-center justify-center flex-col gap-4'>
            <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                className="h-9 max-md:h-6 " alt="" />
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
            <Input className='col-span-1' {...register("firstName", "Nom")} />
            <Input className='col-span-1' {...register("lastName", "Prénom")} />
            <Input className='col-span-1 max-sm:col-span-full' {...register("email", "Email")} type='email' />
            <Input className='col-span-1 max-sm:col-span-full' {...register("phone", "N° Téléphone")} />
            <Password  className='col-span-full' {...register("password", "Mot de pass")} />
            <Select
                label="Wilaya"
                error={formik.touched.wilaya ? formik.errors.wilaya : ""}
                value={formik.values.wilaya}
                onChange={(e: any) => formik.setFieldValue("wilaya", e)}
                className='col-span-1 max-sm:col-span-full'
                options={
                    wilayas?.data.map(el => ({ label: el.name, value: el.name,item:el })) ?? []
                }
                onBlur={(_: any) => {
                    formik.setTouched({
                        ...formik.touched,
                        wilaya: true
                    })
                }}
            />
            <Select
                label="Commune"
                error={formik.touched.commune ? formik.errors.commune : ""}
                value={formik.values.commune}
                onChange={(e: any) => formik.setFieldValue("commune", e)}
                className='col-span-1 max-sm:col-span-full'
                options={
                    communes?.communes.map(el => ({ label: el.name, value: el.name })) ?? []
                }
                onBlur={(_: any) => {
                    formik.setTouched({
                        ...formik.touched,
                        commune: true
                    })
                }}
            />

        </div>
        <div className="mt-4">
            <Button isLoading={isLoading} disabled={isLoading} variant="solid" type='submit' className='gap-2 w-full'>
                Register <IoMdSave className='text-lg' />
            </Button>
        </div>
        <p className='text-center text-sm mt-4'>
            Already have an account ? <Link to={"/joomla-auth"} className='text-primary font-semibold cursor-pointer'>Login</Link>
        </p>
    </form>
}