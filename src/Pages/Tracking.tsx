
import * as Yup from "yup";
import alertError from "../hoock/alertError";
import { useFormik } from "formik";
import { useState } from "react";
import OrderApi from "../Api/OrderApi";
import { useTranslation } from "react-i18next";
import { Input } from "rizzui";
import { IoSearchOutline } from "react-icons/io5";
import { Toaster } from "react-hot-toast";
import { MdErrorOutline, MdLocalPhone } from "react-icons/md";
import { TbCubeSend } from "react-icons/tb";
import statesColor from "../Admin/Const/statesColor";
import moment from "moment";
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
    const { t, i18n } = useTranslation()
    const [data, setData] = useState<TrackingResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const formik = useFormik({
        initialValues: {
            phone: ""
        },

        onSubmit: (values: InputData) => {
            if (values) { }
            setData(null)
            setLoading(true)

            OrderApi.tracking({
                phone: "+213" + parseInt(values.phone)
            }).then((res) => {
                setData(res)
                setLoading(false)
            }).catch((err: any) => {
                alertError(err)
                setData({
                    data: [],
                    has_more: false,
                    links: { self: "" },
                    total_data: 0
                })
                setLoading(false)
            })

        },

        validationSchema: validationS({
            invalid_phone: t("invalid_phone"),
            phone_op: t("phone_op")
        }),
    });
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
                <div className="flex items-center max-w-xs w-full">
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
                                <svg aria-hidden="true" role="status" className="inline scale-125 w-4 h-4  text-primary animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                : <IoSearchOutline className="ms-3 w-5 h-5 cursor-pointer" onClick={formik.handleSubmit} />
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
                {
                    data && data.data.length != 0 && <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
                        <table className="w-full text-sm   text-gray-500 dark:text-gray-400">
                            <caption className="text-center p-5 text-lg font-semibold   text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                {t("all_colis")}
                            </caption>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        {t("products_list")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("stopdesk")}
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        {t("address")}
                                    </th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data.map((item, index) => {
                                        return <>
                                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th className="px-6 max-w-[240px] align-top py-4 font-medium text-gray-900  dark:text-white">
                                                    <div className="">
                                                        <p className="max-w-sm sticky top-0">{item.product_list}</p>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4 align-top">
                                                    <div className="relative h-full">
                                                        <p className="">{item.stopdesk_name}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 align-top">
                                                    <p className="">{item.current_wilaya_name} , {item.current_commune_name}</p>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td className="px-6 py-3 align-top bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-medium text-gray-900  dark:text-white">
                                                    {t("date_state")}
                                                </td>
                                                <td className="px-6 py-4 " colSpan={2}>
                                                    <ol className="relative border-s border-gray-200 dark:border-gray-700">

                                                        {
                                                            item.timeline.map((el, i) => {
                                                                return <li className="mb-10 ms-4" key={i}>
                                                                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                                                    <time className="mb-2 text-sm  leading-none text-gray-400 dark:text-gray-500 font-semibold">{moment(el.created_at).format("yyyy-MM-DD HH:mm")}</time>
                                                                    <div className="mt-2">
                                                                        <span
                                                                            className={" whitespace-nowrap text-center capitalize rounded-full p-1 px-2 cursor-pointer w-auto  text-[13px] font-semibold border py-1 !text-[" + statesColor[item?.last_status ?? ""] + "]"}
                                                                            style={{
                                                                                color: statesColor[el?.state ?? ""],
                                                                                borderColor: statesColor[el?.state ?? ""] + "26",
                                                                                backgroundColor: statesColor[el?.state ?? ""] + "22"
                                                                            }} >
                                                                            {el.state}
                                                                        </span>
                                                                    </div>

                                                                </li>
                                                            })
                                                        }

                                                    </ol>
                                                </td>
                                            </tr>
                                        </>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
                {
                    data && data.data.length == 0 && <>
                        <MdErrorOutline className="mt-3 w-20 h-20 text-red-600" />
                        <p className="capitalize">{t("nocolis")}</p>
                    </>
                }
            </div>





            <div className="p-4">
                {/* <ol className="relative border-s border-gray-200 dark:border-gray-700">
                    <li className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">February 2022</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Application UI code in Tailwind CSS</h3>
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.</p>
                        <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Learn more <svg className="w-3 h-3 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg></a>
                    </li>
                    <li className="mb-10 ms-4">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">March 2022</time>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Marketing UI design in Figma</h3>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.</p>
                    </li>

                </ol> */}
            </div>

            <Toaster position="top-center" />
        </form >
    )
}
