import { useEffect, useState } from 'react';
import { MdOutlineClear } from 'react-icons/md';
import { ActionIcon, Button, Modal, Text, Textarea } from 'rizzui';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import toast from 'react-hot-toast';
import alertError from '../hoock/alertError';
import UploadImageSingle from '../Admin/components/UploadImageSingle';
import OrderApi from '../Api/OrderApi';
import { useTranslation } from 'react-i18next';

const validationSchema = Yup.object({
    note_exchange: Yup.string().required('Note  is required'),
    iamge_exchange: Yup.string().required('Avatar is required'),
});

type AssociateInput = {
    note_exchange: string,
    iamge_exchange: string,
};

export default function ExchangeFormModal({ afterChange = () => { }, data, action }: { afterChange?: any, data: OrderFull, action: JSX.Element }) {
    const [modalState, setModalState] = useState(false);


    return (
        <div>
            <div onClick={() => setModalState(true)}>
                {action}
            </div>
            <FormExchange {...{
                modalState, setModalState,
                afterChange,
                data
            }} key={"modal" + modalState} />
        </div>
    );
}


function FormExchange({ afterChange = () => { }, data, modalState, setModalState }: { afterChange?: any, modalState: boolean, data: OrderFull, setModalState: any }) {
    const [isLoading, setLoading] = useState(false);
    const { t, i18n } = useTranslation()
    const formik = useFormik({
        initialValues: {
            note_exchange: "",
            iamge_exchange: "",
        },
        validationSchema,
        onSubmit: async (values: AssociateInput) => {
            setLoading(true);
            const payload = { id_order_exchange: data.id, ...values };
            try {
                await OrderApi.exchange(payload);

                toast.success(t("send_success"),{
                    duration:1000
                });
                afterChange();
                setModalState(false)
            } catch (error) {
                alertError(error);
            } finally {
                setLoading(false);
                // setModalState(false);
            }
        }
    });

    const register = (name: "note_exchange", label: string) => ({
        label,
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
    useEffect(() => {
        formik.resetForm()
    }, [modalState])
    return <Modal isOpen={modalState} onClose={() => setModalState(false)} key={"modal" + modalState}>
        <form onSubmit={formik.handleSubmit}>
            <div className="m-auto px-7 pt-6 pb-8 flex flex-col gap-2">
                <div className="mb-2 flex items-center justify-between">
                    <Text className='text-xl font-semibold'>{t("change_ur_order")}</Text>
                    <ActionIcon size="lg" variant="text" onClick={() => setModalState(false)}>
                        <MdOutlineClear className="h-auto w-6" />
                    </ActionIcon>
                </div>
                <div className="flex flex-col gap-4">
                    <div className='flex flex-col gap-2 p-4 bg-green-100 border border-green-300 rounded-lg'>
                        <span>1 - {t("form_note1")}</span>
                        <span>2 - {t("form_note2")}</span>
                        <span>3 - {t("form_note3")}</span>
                    </div>
                    

                    <div className="flex justify-center mb-4">
                    <div className="arrow-anim">
                        <span className='block w-4 h-4 border-r-[3px] border-b-[3px] border-gray-400 rotate-45 -m-[10px]'></span>
                        <span className='block w-4 h-4 border-r-[3px] border-b-[3px] border-gray-400 rotate-45 -m-[10px]'></span>
                        <span className='block w-4 h-4 border-r-[3px] border-b-[3px] border-gray-400 rotate-45 -m-[10px]'></span>
                    </div>
                    </div>
                    <Textarea   {...register("note_exchange", (t("notes")) + "*")} />
                    <div>
                        <span className=' rizzui-textarea-label block text-sm mb-1.5 font-medium'>
                            {t("upload_image")} *
                        </span>
                        <UploadImageSingle
                            className='min-h-[210px]'
                            setData={(e) => formik.setFieldValue("iamge_exchange", e)}
                            imgSrc={formik.values.iamge_exchange}
                            error={formik.touched.iamge_exchange && formik.errors.iamge_exchange ? "error" : null}
                        />
                        {formik.touched.iamge_exchange && formik.errors.iamge_exchange && (
                            <span className='text-red text-[13px] mt-0.5 rizzui-input-error-text'>
                                {formik.errors.iamge_exchange}
                            </span>
                        )}
                    </div>


                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="outline" className='gap-2' onClick={() => setModalState(false)}>
                        {t("cancel")}
                    </Button>
                    <Button isLoading={isLoading} disabled={isLoading} variant="solid" type='submit' className='gap-2'>
                        {t("send")}
                    </Button>
                </div>
            </div>
        </form>
    </Modal>
}