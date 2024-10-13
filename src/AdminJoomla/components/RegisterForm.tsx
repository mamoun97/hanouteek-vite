import { useState } from 'react';
import { Button, Input, Loader, Password, Select } from 'rizzui';
import { useFormik } from 'formik';
import alertError from '../../hoock/alertError';
import { IoMdSave } from 'react-icons/io';
import UploadImageSingle from '../../Admin/components/UploadImageSingle';
import { useGetWilayasService } from '../../Api/Services';
import ProductApi from '../../Api/ProductApi';
import useSWR from 'swr';
import ApiConfig from '../../Api/ApiConfig';
import { useSelector } from 'react-redux';
import { ThemeSetting } from '../../Types/ThemeSetting';
import JoomlaApi from '../../Api/JoomlaApi';
import { Link, useNavigate } from 'react-router-dom';
import useValidation from '../../hoock/Validation';
import useLang from '../../hoock/useLang';


type JoomlaUserInput = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    wilaya: { label: string, value: string, item: Wilaya } | null,
    commune: { label: string, value: string, item: Commune } | null,
    role: string,
    avatar: string,
    banner: string,
    password: string
};




export default function RegisterForm() {
    const [isLoading, setLoading] = useState(false);
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const navigate = useNavigate()
    const { tr, t } = useLang()
    const validationSchema = useValidation({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        wilaya: true,
        commune: true,
        password: true
    })
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
            password: "",
            banner: ""
        },
        validationSchema,
        onSubmit: async (values: JoomlaUserInput) => {
            setLoading(true);
            const { wilaya, commune, ...rest } = values;
            const payload = { ...rest, wilaya: wilaya?.value ?? "", commune: commune?.value ?? "" };
            try {
                let data = await JoomlaApi.signUpSaller(payload);

                navigate("/joomla-auth")
            } catch (error) {
                alertError(error);
            } finally {
                setLoading(false);
                // setModalState(false);
            }
        }
    });

    const register = (name: "email" | "firstName" | "lastName" | "phone" | "password" | "email" | "avatar"|"banner", label: string) => ({
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
            <h1 className='text-2xl font-bold'>{tr.auth.signup}</h1>

        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">

            <Input
                placeholder={tr.auth.enter_first_name}
                className='col-span-1'
                {...register("firstName", tr.auth.first_name)} />
            <Input
                placeholder={tr.auth.enter_last_name}
                className='col-span-1'
                {...register("lastName", tr.auth.last_name)} />
            <Input
                placeholder={tr.auth.enter_email}
                className='col-span-1 max-sm:col-span-full'
                {...register("email", tr.auth.email)} type='email' />
            <Input
                placeholder={tr.auth.phone}
                className='col-span-1 max-sm:col-span-full'
                {...register("phone", tr.auth.phone)} />
            <Password
                placeholder={tr.auth.enter_password}
                className='col-span-full'
                {...register("password", tr.auth.password)} />
            <Select
                label={t.wilaya}
                error={formik.touched.wilaya ? formik.errors.wilaya : ""}
                value={formik.values.wilaya}
                onChange={(e: any) => formik.setFieldValue("wilaya", e)}
                className='col-span-1 max-sm:col-span-full'
                options={
                    wilayas?.data.map((el, k) => ({ label: (k + 1) + " - " + el.name, value: el.name, item: el })) ?? []
                }
                onBlur={(_: any) => {
                    formik.setTouched({
                        ...formik.touched,
                        wilaya: true
                    })
                }}
                suffix={
                    lodingWilaya ? <Loader /> : null
                }
            />
            <Select
                label={t.commune}
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
                suffix={
                    communeLoading ? <Loader /> : null
                }
            />

            <div className='col-span-full'>
                <span className='rizzui-input-label block text-sm mb-1.5 font-medium'>
                    Banner
                </span>
                <div className='relative'>
                    <UploadImageSingle
                        className='min-h-[210px]'
                        setData={(e) => formik.setFieldValue("banner", e)}
                        imgSrc={formik.values.banner}
                        error={formik.touched.banner && formik.errors.banner ? "error" : null}
                    />

                </div>

            </div>
            <div className='col-span-full'>
                <span className='rizzui-input-label block text-sm mb-1.5 font-medium'>
                    {tr.auth.up_img_profile}
                </span>
                <div className="flex justify-center">
                    <UploadImageSingle
                        className=' h-32'
                        setData={(e) => formik.setFieldValue("avatar", e)}
                        imgSrc={formik.values.avatar}
                        error={formik.touched.avatar && formik.errors.avatar ? "error" : null}
                    />
                </div>
            </div>

        </div>
        <div className="mt-4">
            <Button isLoading={isLoading} disabled={isLoading} variant="solid" type='submit' className='gap-2 w-full'>
                {tr.auth.register} <IoMdSave className='text-lg' />
            </Button>
        </div>
        <p className='text-center text-sm mt-4'>
            {tr.auth.have_account} <Link to={"/joomla-auth"} className='text-primary font-semibold cursor-pointer'>{tr.auth.login}</Link>
        </p>
    </form>
}