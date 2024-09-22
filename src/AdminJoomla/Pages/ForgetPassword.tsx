
import { Toaster } from 'react-hot-toast'
import images from '../../assets'
import useLang from '../../hoock/useLang'
import * as Yup from "yup";
import { Button, Input } from 'rizzui'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import alertError from '../../hoock/alertError';
import { useState } from 'react';
import { LuBadgeInfo } from 'react-icons/lu';
import { IoChevronBackOutline } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import ApiConfig from '../../Api/ApiConfig';
import { useSelector } from 'react-redux';
import { ThemeSetting } from '../../Types/ThemeSetting';

type InputInfo = {
    email: string
}

const validationS = Yup.object().shape({
    password: Yup.string().min(0, "").required("requis")
});
export default function ForgetPassword() {
    const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
    const { lang } = useLang()
    const formik = useFormik({
        initialValues: {
            email: ""
        },

        onSubmit: (values: InputInfo) => {
            getPassword(values)
        },
        validationSchema: validationS,
    });
    const [loading, setLoading] = useState(false)
    const getPassword = async (values: InputInfo) => {
        try {
            setLoading(true)

            setLoading(false)

        } catch (err) {

            setLoading(false)
            alertError(err)
        }
    }
    return (
        <div className="flex h-[100vh]" dir={lang == "ar" ? "rtl" : "ltr"}>
            <div className="h-full w-full max-w-md flex justify-center items-center flex-col px-6 max-sm:px-4" >
                <div className='max-w-lg w-full'>
                    <form onSubmit={formik.handleSubmit} className='w-full'>
                        <div className="flex gap-2 flex-col ">
                            <div className='flex items-center justify-center flex-col gap-4'>
                                {/* <LuBadgeInfo className='w-12 h-12 text-primary' /> */}
                                <img src={ApiConfig.rootUrl + "/" + theme.theme.favicon}
                                    className="h-9 max-md:h-6 " alt="" />
                                <h1 className='text-2xl font-bold'>ForgetPassword</h1>
                                <p className='text-center text-sm'>
                                    Entrez votre email et nous vous enverrons le mot de passe par email
                                </p>
                            </div>
                            <Input
                                label={"Email"}
                                name='email'
                                placeholder='Entrez votre Email'
                                className="col-span-2"
                                type='email'
                                prefix={<MdOutlineEmail className='w-4 h-4' />}
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



                            <Button
                                type="submit"
                                isLoading={loading}
                                className="col-span-2 mt-2"
                            // onClick={() => setModalState(false)}
                            >
                                Soumettre
                            </Button>
                            <p className='flex justify-center text-sm mt-4'>
                                <Link to={"/joomla-auth/"} className='text-primary flex items-center font-semibold cursor-pointer'>
                                    <IoChevronBackOutline className='w-4 h-4' /> Back to login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div
                className="bg-cover bg-no-repeat bg-center grow h-full scale-95 rounded-3xl shadow-md"
                style={{ backgroundImage: "url('" + images.bg_auth + "')" }}></div>

            <Toaster position="bottom-center" />
        </div>
    )
}