
import { Accordion, ActionIcon, Button, Modal, Progressbar } from "rizzui";
import cn from "../utils/class-names";
import { useTranslation } from "react-i18next";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Rate from "./RateInput";
import { FaStar } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";
import ProductApi from "../Api/ProductApi";
import { useEffect, useState } from "react";
import CreateRating from "./CreateReview";
import { Toaster } from "react-hot-toast";


export default function Reviews({ id }: { id: number }) {
    const { t, i18n } = useTranslation()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<ReviewResponse>({
        data: [],
        hasMore: true,
        limit: 6,
        page: 1,
        totalCount: 10000,

    })
    function getData(dataNew?: ReviewResponse) {
        const dt = dataNew ?? data
        setLoading(true)
        ProductApi.getAllReviews("?product=" + id + "&limit=" + dt.limit + "&page=" + dt.page).then(res => {
            setData({
                ...dt,
                data: [
                    ...dt.data,
                    ...res.data
                ],
                totalCount: res.totalCount,
            })
            setLoading(false)

        }).catch(_ => {
            setLoading(false)
        })
    }
    useEffect(() => {
        getData()
    }, [data.page])
    function initialData() {
        if (data.page == 1)
            getData({
                ...data,
                data: [],
                page: 1
            })
        else
            setData({
                ...data,
                data: [],
                page: 1
            })

    }
    return <div className="border bg-white my-4 rounded-lg">
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        <Accordion
            key={"item.title"}
            className="mx-8 border-b last-of-type:border-b-0"
        >
            <Accordion.Header>
                {
                    ({ open }) => {
                        return <div className="flex w-full cursor-pointer items-center justify-between py-5 text-xl font-semibold">
                            <div className="flex gap-2">
                                {t("ratings")}
                                {!open && <span className="flex items-center gap-2">
                                    <FaStar />
                                    4.5
                                </span>}
                            </div>

                            {
                                i18n.language == "ar" ?
                                    <IoIosArrowBack className={cn(
                                        "h-5 w-5 transform transition-transform duration-300",
                                        open && "-rotate-90"
                                    )} /> :
                                    <IoIosArrowForward className={cn(
                                        "h-5 w-5  transform transition-transform duration-300",
                                        open && "rotate-90"
                                    )} />
                            }

                        </div>
                    }

                }
            </Accordion.Header>
            <Accordion.Body className="mb-7">
                <div className="flex items-center justify-center gap-4 max-sm:flex-col ">
                    <div className="flex  justify-center flex-col grow">
                        <h1 className="text-6xl font-bold">4.5</h1>
                        <Rate value={4.5} allowHalf size="md" disabled />
                    </div>

                    <div className="d-flex flex-column border p-4 rounded-lg w-full max-w-lg">
                        {
                            [
                                {
                                    id: 5,
                                    value: 398
                                },
                                {
                                    id: 4,
                                    value: 134
                                },
                                {
                                    id: 3,
                                    value: 42
                                },
                                {
                                    id: 2,
                                    value: 24
                                },
                                {
                                    id: 1,
                                    value: 35
                                },
                            ].map((el, k) => {
                                return <div key={k} className="flex items-center">
                                    <span className="flex font-semibold  items-center w-9  gap-2">{el.id} <FaStar className="text-sm " /></span>
                                    <Progressbar size="sm" value={Math.ceil(el.value * 100 / 633)} className="mx-1 w-28 grow" />
                                    <span className="w-8">{el.value}</span>
                                </div>
                            })
                        }


                    </div>
                </div>
                <div className="mt-6 flex justify-center">
                    <Button onClick={() => setOpen(true)} variant="text">
                        {t("add_rating")}
                    </Button>
                </div>
                <div className="my-6 border border-gray-100"></div>
                <ReviewsItems data={data} />
                <div className="flex justify-center ">
                    {(data.data.length < data.totalCount && !loading) && <ActionIcon rounded="full" variant="outline" onClick={() => {
                        setData({ 
                            ...data,
                            page: data.page + 1

                        })
                    }} className=" !h-12 !w-12" size="lg" color="primary">
                        <AiOutlinePlus className="w-5 h-5" />
                    </ActionIcon>}

                </div>
                {loading && <div className="flex justify-center">
                    <svg aria-hidden="true" role="status" className="inline w-16 h-16 me-3 text-primary animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                    </svg>
                </div>}
            </Accordion.Body>
        </Accordion>

        <Modal isOpen={open} onClose={() => setOpen(false)}>
            <div className="m-auto px-7 pt-6 pb-8">
                <CreateRating id_prod={id} onClose={() => setOpen(false)} afterChange={() => {
                    initialData()
                }} />
            </div>
        </Modal>

    </div>

}
function ReviewsItems({ data }: { data: ReviewResponse }) {

    return <div className="flex flex-col gap-2">
        {
            data.data.map((el, k) => {
                return <ReviewItem data={el} key={k} />
            })
        }

    </div>
}
function ReviewItem({ data }: { data: ReviewFull }) {
    return <div className="p-2 flex gap-2">
        <div className="h-10 w-10 min-w-[40px] bg-primary text-white rounded-full flex items-center justify-center capitalize text-xl font-bold">
            {data.firstName.charAt(0)}
        </div>
        <div>
            <h1 className="text-lg font-semibold capitalize">{data.firstName}</h1>
            <h2 className="text-sm">{data.email}</h2>
            <Rate value={data.Rating} size="sm" disabled />
            <p className="mt-3 text-sm">
                {data.description}
            </p>
        </div>
    </div>
}

