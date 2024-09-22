
import * as Yup from "yup";
import alertError from "../hoock/alertError";
import { useFormik } from "formik";
import { useState } from "react";
import OrderApi from "../Api/OrderApi";
import { useTranslation } from "react-i18next";
import { ActionIcon, Avatar, Button, Input, Loader, Text, Tooltip } from "rizzui";
import { IoSearchOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import { MdContentCopy, MdLocalPhone } from "react-icons/md";
import { TbCubeSend } from "react-icons/tb";
import moment from "moment";
import Container from "../Views/Container";
import ExchangeFormModal from "../Views/ExchangeFormModal";
import StateChange from "../Admin/components/StateChangeButton";
import getPlatformUrl from "../Constants/Platform";
import CopyText from "../Constants/CopyText";
import { FaExchangeAlt } from "react-icons/fa";
import ApiConfig from "../Api/ApiConfig";
function formatPhoneNumber(phoneNumber: string) {
    const localNumber = phoneNumber.replace(/^(\+\d{3})(\d{9})$/, '0$2');
    return localNumber.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
}
const validationS = (dt: Erros) => Yup.object().shape({
    phone: Yup.string()
        .matches(
            /^0[567][0-9]{8}$/,
            dt.invalid_phone
        ).required(dt.phone_op),
});
type Erros = {
    invalid_phone: string,
    phone_op: string
}
type InputData = {
    phone: string
}
export default function Tracking() {
    if(ApiConfig.isJoomla)
        return <TrackingkaziTour/>
    const { t, i18n } = useTranslation()
    const [data, setData] = useState<TrackingResponse | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    const formik = useFormik({
        initialValues: {
            phone: ""
        },

        onSubmit: (_: InputData) => {

            setData(undefined)
            setLoading(true)
            getData()


        },

        validationSchema: validationS({
            invalid_phone: t("invalid_phone"),
            phone_op: t("phone_op")
        }),
    });
    const getData = () => {
        OrderApi.tracking({
            phone: "+213" + parseInt(formik.values.phone)
        }).then((res) => {
            setData(res)
            setLoading(false)
        }).catch((err: any) => {
            alertError(err)
            setData(undefined)
            setLoading(false)
        })
    }
    const isLessThanThreeDays = (date:string) => {
        const startDate = moment();
        const endDate = moment(date);
        const differenceInDays = startDate.diff(endDate, 'days');
        return differenceInDays < 3; 
    }
    return (
        <form onSubmit={formik.handleSubmit}>

            <div className="flex justify-center items-center mt-6 p-3 flex-col gap-5">
                <TbCubeSend className=" w-28 h-28 text-primary opacity-80" />
                <h1 className="text-center font-semibold text-xl">
                    {t('tracking_title')}
                </h1>
                <p className="text-center max-w-md text-sm">
                    {t('tracking_subtitle')}
                </p>
                <div className="flex items-center flex-col  max-w-xs w-full">
                    <Input

                        id="contact_phone"
                        label={""}
                        type="tel"
                        size="lg"
                        dir={i18n.language == "ar" ? "rtl" : "ltr"}
                        prefix={
                            <MdLocalPhone className=" w-5 h-5" />
                        }
                        suffix={
                            loading ?
                            <Loader />
                                : <ActionIcon className="ms-3" variant="text" type="submit" onClick={() => formik.handleSubmit} >
                                    <IoSearchOutline className=" w-5 h-5 " />
                                </ActionIcon>
                        }



                        inputClassName=""
                        className="grow"
                        placeholder={t("phone")}
                        {...((formik.touched.phone) && formik.errors.phone) ? { error: formik.errors.phone } : {}}
                        value={formik.values.phone}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if ((!/^[0-9]{0,10}$/.test(e.target.value))) {
                                return
                            }
                            formik.setValues({
                                phone: e.target.value
                            })
                        }}
                        onBlur={formik.handleBlur}

                    />


                </div>

            </div>
            {!!data?.length && <Container>
                <Table header={<>
                    {[t("id"), t("date"), t("state"), t("phone"), t("fullname"), t("wilaya"), t("commune"), t("platform"), t("tracking"), ""].map((header, index) => (
                        <th
                            key={index}
                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                        >
                            <p className="block antialiased font-sans text-sm text-blue-gray-900 font-normal leading-none opacity-70 text-center">
                                {header}
                            </p>
                        </th>
                    ))}
                </>}>
                    {
                        data.map((el, index) => (
                            <tr key={index}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex justify-center">
                                        # {el.id}
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex justify-center">
                                        <Text className="whitespace-nowrap   flex flex-col items-center">
                                            <span className="text-[12px] font-bold">{moment(el.created_at).format("YYYY-MM-DD")}</span>
                                            <span className="text-[12px] ">{moment(el.created_at,).fromNow()}</span>
                                        </Text>
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50 ">
                                    <div className="flex justify-center">
                                        <StateChange readOnly={true} data={el} afterChange={() => { }} />
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50 text-sm font-bold">
                                    <div className="flex justify-center " dir="ltr">
                                        {formatPhoneNumber(el.contact_phone)}
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex justify-center text-sm">
                                        {el.firstname} {el.familyname}
                                    </div>
                                </td>


                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex justify-center">
                                        {el.to_wilaya_name}
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <div className="flex justify-center">
                                        {el.to_commune_name}
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50 ">
                                    <div className="flex justify-center">
                                        {el.platform ? <>
                                            <div>
                                                <Avatar name=""
                                                    className="ring-2 ring-primary ring-offset-background ring-offset-2"
                                                    src={getPlatformUrl(el.platform)} />
                                            </div>

                                        </>
                                            : <span className="text-sm text-gray-400 font-semibold whitespace-nowrap">{t("not_exist")}</span>}
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">

                                    <div className="flex justify-center">
                                        {el.tracking ? <Text className="mb-0.5 whitespace-nowrap !text-sm font-medium bg-green-100 leading-3 rounded-full text-green-700 p-2 py-1 cursor-pointer flex items-center"
                                            onClick={() => { CopyText(el.tracking ?? ""); toast.success(t("copied_text")) }}>
                                            {el.tracking}
                                            <div className="me-1"></div>
                                            <MdContentCopy />
                                        </Text> : <Text className=" !text-sm whitespace-nowrap font-medium bg-red-100  rounded-full text-red-700 p-2 py-1">
                                            {t("not_exist")}
                                        </Text>}
                                    </div>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">

                                    <div className="flex justify-center">
                                        {(isLessThanThreeDays(el.updated_at)&&(el.state == "Livré" || el.state == "payed" ))&& <ExchangeFormModal
                                            action={<Button className="flex gap-2" size="lg">
                                                {t("change")}

                                                <FaExchangeAlt />
                                            </Button>}
                                            data={el}
                                            afterChange={() => {
                                                getData()
                                            }}
                                        />}
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </Table>
            </Container>}






            <Toaster position="top-center" />
        </form >
    )
}



function Table({ header, children }: { header: any, children: React.ReactNode }) {
    return (
        <div className="flex w-full items-center justify-center ">
            <div className="p-6  px-0 overflow-auto">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        {header}
                    </thead>
                    <tbody>
                        {children}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

// 
function TrackingkaziTour(){
    return <div>
        <iframe src="https://kazi-tour.xyz/public/tracking" name="iFrame Name"   width="100%"  className="h-[calc(100vh-96px)]"></iframe>
    </div>
}


