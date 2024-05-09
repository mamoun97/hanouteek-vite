

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';

import { useFormik } from 'formik';
import * as Yup from "yup"

import { ActionIcon, Button, Input, Title } from 'rizzui';
import ProductApi from '../Api/ProductApi';
import Rate from './RateInput';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';

const validationS = (req: string) => Yup.object().shape({
    name: Yup.string().required(req),
    email: Yup.string().email().required(req),
    description: Yup.string().required(req),
    Rating: Yup.number().required(req)
});


type RatingData = {
    name: string,
    email: string,
    description: string,
    Rating: number
}
export default function CreateRating({ onClose, afterChange = () => { }, id_prod }: { onClose: any, afterChange?: any, id_prod: number }) {


    const [isLoading, setLoading] = useState(false);

    const { t } = useTranslation()


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            description: "",
            Rating: 3
        },


        onSubmit: (values: RatingData) => {
            setLoading(true)
            const { name, ...v } = values
            ProductApi.createReview({
                ...v,
                firstName: name,
                lastName: name,
                image: '',
                product: { id: id_prod }
            }).then(_ => {

                afterChange()
                onClose()
                toast.success(t("thanks_rating"))
                setLoading(false)
            }).catch(_ => {

                setLoading(false)
            })



        },
        validationSchema: validationS(t("required")),



    });
    const register = (p: "name" | "email" | "description") => {
        return {
            name: p,
            value: formik.values[p],
            onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {


                formik.handleChange(e)
            },
            onBlur: formik.handleBlur,
            ...((formik.touched[p]) && formik.errors[p]) ? { error: formik.errors[p] } : {}
        }
    }


    return (

        <form onSubmit={formik.handleSubmit} >


            <div className="flex items-center justify-between mb-4">
                <Title as="h4" className="font-semibold">

                    {t("add_rating")}
                </Title>
                <ActionIcon size="sm" variant="text" onClick={onClose}>
                    <PiXBold className="h-auto w-5" />
                </ActionIcon>
            </div>

            <div className="flex flex-col gap-2">




                <Input
                    label={t("fullname")}
                    placeholder={t("fullname")}
                    {...register('name')}
                />
                <Input
                    label={t("email")}
                    placeholder={t("email")}
                    {...register('email')}
                />
                <Input
                    label={t("desc")}
                    placeholder={t("desc")}
                    {...register('description')}
                />
                <Rate label={t("rating")}

                    labelClassName="text-sm"
                    value={formik.values.Rating}
                    onChange={(e) => formik.setValues({
                        ...formik.values,
                        Rating: e
                    })}
                    size="lg" />
            </div>



            <div className="flex items-center justify-end gap-4 mt-4">
                <Button
                    variant="outline"
                    onClick={onClose}
                    className="w-full @xl:w-auto"
                >
                    {t("cancel")}
                </Button>
                <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={isLoading}
                    className="w-full @xl:w-auto"
                >
                    {t("add")}
                </Button>
            </div>

        </form>
    );
}
