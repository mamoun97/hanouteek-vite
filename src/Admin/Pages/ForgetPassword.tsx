
import useLang from '../../hoock/useLang'
import { Button, Input } from 'rizzui'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import alertError from '../../hoock/alertError';
import { useState } from 'react';
import { IoChevronBackOutline } from 'react-icons/io5';
import { MdLockReset, MdOutlineEmail } from 'react-icons/md';
import useValidation from '../../hoock/Validation';
import ContainerAuth from '../components/ContainerAuth'

type InputInfo = {
    email: string
}


export default function ForgetPassword() {
    const { tr, lang } = useLang()
    const validationS = useValidation({
        email: true
    })
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
        <ContainerAuth>
            <div className='max-w-lg w-full bg-card p-4'>
                <form onSubmit={formik.handleSubmit} className='w-full'>
                    <div className="flex gap-2 flex-col ">
                        <div className='flex items-center justify-center flex-col gap-4'>

                            <MdLockReset className='text-primary w-16 h-16' />
                            <h1 className='text-2xl font-bold'>{tr.auth.recover_password}</h1>
                            <p className='text-center text-sm'>
                                {tr.auth.recover_password_subtitle}
                            </p>
                        </div>
                        <Input
                            label={tr.auth.email}
                            name='email'
                            placeholder={tr.auth.enter_email}
                            className="col-span-2 mt-6"
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
                            {tr.auth.send}
                        </Button>
                        <p className='flex justify-center text-sm mt-4'>
                            <Link to={"/admin/"} className='text-primary flex items-center font-semibold cursor-pointer'>
                                <IoChevronBackOutline className={'w-4 h-4 ' + (lang == "ar" ? "rotate-180" : "")} /> {tr.auth.back_to_login}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </ContainerAuth>
    )
}