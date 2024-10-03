import { useState } from 'react';
import { Button, Input, Password } from 'rizzui';
import { useFormik } from 'formik';
import alertError from '../../hoock/alertError';
import { IoIosInformationCircleOutline, IoMdCheckmark, IoMdSave } from 'react-icons/io';
import UploadImageSingle from '../../Admin/components/UploadImageSingle';
import ApiConfig from '../../Api/ApiConfig';
import { useSelector } from 'react-redux';
import { ThemeSetting } from '../../Types/ThemeSetting';
import JoomlaApi from '../../Api/JoomlaApi';
import useValidation from '../../hoock/Validation';
import useLang from '../../hoock/useLang';




interface JoomlaUserInput extends Omit<JoomlaClient, 'password'> {
    password: string;
}


export default function RegisterView({ onClose, afterChange }: { afterChange: (e: JoomlaClientFull) => void, onClose: (e: boolean) => void }) {
    const [isLoading, setLoading] = useState(false);
    const { tr } = useLang()
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const validationSchema = useValidation({
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        password: true,
        address: true,
    });
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

    return <form onSubmit={formik.handleSubmit}>
        <div className='flex items-center justify-center flex-col gap-4'>
            <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                className="h-9 max-md:h-5 max-[400px]:hidden" alt="" />
            <h1 className='text-2xl font-bold'>{tr.auth.signup}</h1>

        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
            <div className='col-span-full'>
                <span className='rizzui-input-label block text-sm mb-1.5 font-medium'>
                    {tr.auth.up_img_profile}
                </span>
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
                placeholder={tr.auth.phone}
                {...register("phoneNumber", tr.auth.phone)} />
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
                {tr.auth.register} <IoMdSave className='text-lg' />
            </Button>
        </div>
        <p className='text-center text-sm mt-4'>
            {tr.auth.have_account} <span onClick={() => onClose(false)} className='text-primary font-semibold cursor-pointer'>{tr.auth.login}</span>
        </p>
    </form>
}