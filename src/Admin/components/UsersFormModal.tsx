import { useEffect, useState } from 'react';
import { MdOutlineClear } from 'react-icons/md';
import { ActionIcon, Button, Checkbox, Input, Modal, Select, Text } from 'rizzui';
import UploadImageSingle from './UploadImageSingle';
import { AiOutlinePlus } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import alertError from '../../hoock/alertError';
import AssociateApi from '../../Api/Associate';
import { IoIosInformationCircleOutline, IoMdCheckmark, IoMdSave } from 'react-icons/io';
import { Label } from 'recharts';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^0[567][0-9]{8}$/, 'Phone number must start with 0 followed by 5, 6, or 7, and then 8 digits').required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    role: Yup.object().nullable().required('Role is required'),
    avatar: Yup.string().required('Avatar is required'),
    active: Yup.boolean().required('Active status is required')
});

type AssociateInput = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    address: string,
    role: { label: string, value: string } | null,
    avatar: string,
    active: boolean
};

export default function UsersFormModal({ afterChange = () => { }, data, action }: { afterChange?: any, data?: AssociateFull, action: JSX.Element }) {
    const [modalState, setModalState] = useState(false);


    return (
        <div>
            <div onClick={() => setModalState(true)}>
                {action}
            </div>
            <FormAssociate {...{
                modalState, setModalState,
                afterChange,
                data,
                action
            }} key={"modal" + modalState} />
        </div>
    );
}


function FormAssociate({ afterChange = () => { }, data, action, modalState, setModalState }: { afterChange?: any, data?: AssociateFull, action: JSX.Element, modalState: boolean, setModalState: any }) {
    const [isLoading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            id: data?.id ?? 0,
            firstName: data?.firstName ?? "",
            lastName: data?.lastName ?? "",
            email: data?.email ?? "",
            phoneNumber: data?.phoneNumber ? "0" + data?.phoneNumber : "",
            address: data?.address ?? "",
            role: data?.role ? { label: data.role, value: data.role } : null,
            avatar: data?.avatar ?? "",
            active: data?.active ?? false
        },
        validationSchema,
        onSubmit: async (values: AssociateInput) => {
            setLoading(true);
            const { role, ...rest } = values;
            const payload = { ...rest, role: role?.value ?? "" };
            try {
                await AssociateApi[data ? "updateAssociate" : "addAssociate"](payload);
                if (!data) formik.resetForm();
                toast.success(data ? "update success" : "add success");
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

    const register = (name: "email" | "firstName" | "lastName" | "phoneNumber" | "address", label: string) => ({
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
    useEffect(() => {
        formik.resetForm()
    }, [modalState])
    return <Modal isOpen={modalState} onClose={() => setModalState(false)} key={"modal" + modalState}>
        <form onSubmit={formik.handleSubmit}>
            <div className="m-auto px-7 pt-6 pb-8 flex flex-col gap-2">
                <div className="mb-2 flex items-center justify-between">
                    <Text className='text-lg font-semibold'>{data ? "Edit User" : "Add New User"}</Text>
                    <ActionIcon size="lg" variant="text" onClick={() => setModalState(false)}>
                        <MdOutlineClear className="h-auto w-6" />
                    </ActionIcon>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className='col-span-full'>
                        <UploadImageSingle
                            className='min-h-[210px]'
                            setData={(e) => formik.setFieldValue("avatar", e)}
                            imgSrc={formik.values.avatar}
                            error={formik.touched.avatar && formik.errors.avatar ? "error" : null}
                        />
                        {formik.touched.avatar && formik.errors.avatar && (
                            <span className='text-red text-[13px] mt-0.5 rizzui-input-error-text'>
                                {formik.errors.avatar}
                            </span>
                        )}
                    </div>
                    <Input className='col-span-1' {...register("firstName", "Nom")} />
                    <Input className='col-span-1' {...register("lastName", "Prénom")} />
                    <Input className='col-span-1 max-sm:col-span-full' {...register("email", "Email")} type='email' />
                    <Input className='col-span-1 max-sm:col-span-full' {...register("phoneNumber", "N° Téléphone")} />
                    <Input className='col-span-1 max-sm:col-span-full ' {...register("address", "Address line")} />
                    <Select
                        label="Role"
                        error={formik.touched.role ? formik.errors.role : ""}
                        value={formik.values.role}
                        onChange={(e: any) => formik.setFieldValue("role", e)}
                        className='col-span-1 max-sm:col-span-full'
                        options={[{ label: "Pos", value: "pos" }]}
                        // suffix={formik.touched.role?(
                        //     !!formik.errors.role?<IoIosInformationCircleOutline className='text-lg'/>:<IoMdCheckmark className='text-lg'/>
                        // ):null}
                        onBlur={(_: any) => {
                            formik.setTouched({
                                ...formik.touched,
                                role: true
                            })
                        }}
                    />
                    <Checkbox
                        label="Active"
                        className='mt-2'
                        checked={formik.values.active}
                        onChange={() => formik.setFieldValue("active", !formik.values.active)}
                    />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                    <Button variant="outline" className='gap-2' onClick={() => setModalState(false)}>Cancel</Button>
                    <Button isLoading={isLoading} disabled={isLoading} variant="solid" type='submit' className='gap-2'>
                        {
                            data ? <>
                                Save <IoMdSave className='text-lg' />
                            </> : <>
                                Add <AiOutlinePlus className='text-lg' />
                            </>
                        }
                    </Button>
                </div>
            </div>
        </form>
    </Modal>
}