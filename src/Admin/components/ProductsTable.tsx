import React, { useEffect, useMemo } from "react";
import Table from "./Table";
import HeaderCell from "./HeaderCell";
import { ActionIcon, Avatar, Badge, Button, Checkbox, Select, Tooltip } from "rizzui";
import { FiEdit } from "react-icons/fi";
import Pagination from "./Pagination";
import moment from "moment";
import 'moment/locale/fr';
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import orderCols from "../Const/order-cols";
import imgSrc from "../../utils/imgSrc";
import { GrDeliver } from "react-icons/gr";
import { IoMdEye } from "react-icons/io";
import { LuArrowBigDownDash } from "react-icons/lu";
type OC = {
    label: string,
    value: string,
    check: boolean
  }[]
moment.locale('fr')
const getColumns = (
    order: string,
    column: string,
    onHeaderClick: (value: string) => any,
    afterChange: any,
    changeFilter: any
) => [
        {
            title: <></>,
            dataIndex: "checked",
            key: "checked",

            width: 50,
            render: () => (
                <div className="inline-flex cursor-pointer">
                    <Checkbox variant="flat" />
                </div>
            ),
        },

        {
            title: (
                <HeaderCell

                    title="id"
                    sortable
                    ascending={order === "asc" && column === "id"}
                />
            ),
            onHeaderCell: () => onHeaderClick("id"),
            dataIndex: "id",
            key: "id",
        },

        {
            title: <HeaderCell title="Image" />,
            dataIndex: "image",
            key: "image",
            show: false,
            render: (_: string, row: Product) => (
                <div className="">
                    {
                        <Avatar
                            rounded="sm"
                            customSize="40"
                            name={""}
                            className="ring-2 ring-blue ring-offset-background ring-offset-2"
                            src={imgSrc(row.images[0], true)}
                        />

                    }

                </div>
            ),
        },
        {
            title: <HeaderCell title="Name" />,
            dataIndex: "name",
            key: "name",
            show: false,
            render: (name: string) => (
                <div className="flex items-center">
                    <span className="whitespace-nowrap font-semibold">{name}</span>
                </div>
            ),
        },
        {
            title: <HeaderCell title="Livraison gratuite" />,
            dataIndex: "freeShipping",
            key: "freeShipping",
            show: false,
            render: (_: string, row: Product) => (
                <div className="flex justify-center">
                    {
                         <Badge variant="outline"  className="flex items-center whitespace-nowrap gap-2">
                            <GrDeliver className="text-lg" />
                            Free Shipping
                        </Badge>
                    }

                </div>
            ),
        },

        {
            title: <HeaderCell title="Prix" />,
            dataIndex: "price",
            key: "price",
            show: false,
            render: (price: string) => (
                <div className="flex items-center">
                    <span className="font-bold text-green-500">{price} <small>DZD</small></span>
                </div>
            ),
        },
        {
            title: <HeaderCell title="Catergory" />,
            dataIndex: "category",
            key: "category",
            show: false,
            render: (_: string, row: Product) => (
                <div className="flex items-center">
                    {row?.category?.name}
                </div>
            ),
        },
        {
            title: <HeaderCell title="Attribute" />,
            dataIndex: "attribute",
            key: "attribute",
            show: false,
            render: (_: string, row: Product) => (
                <div className="flex items-center">
                    <Button variant="outline" className="gap-2 ">
                        {row.attribute?.options?.length}
                        variant
                        <IoMdEye className="text-lg" />
                    </Button>
                </div>
            ),
        },
        {
            title: <HeaderCell title="Qte" />,
            dataIndex: "qte",
            key: "qte",
            show: false,
            render: (_: string, row: Product) => (
                <div className="flex items-center">
                    <div className="flex items-center gap-2">
                        {
                            row.stock
                        }
                        <LuArrowBigDownDash />
                    </div>
                </div>
            ),
        },


        {
            title: <></>,
            dataIndex: "action",
            key: "action",
            width: 120,

            render: (_: string, row: Product) => (
                <div className="flex items-center gap-2">
                    <Tooltip content={"product update"} color="invert" placement="top">
                        <Link to={"/products/edit/" + row.id}>
                            <ActionIcon variant="text">
                                <FiEdit className="w-5 h-5 min-w-[20px]" />
                            </ActionIcon>
                        </Link>
                    </Tooltip>




                </div>
            ),
        }
    ];

export default function ProductsTable({ data, option, showCols, setOption, isLoading, afterChange = () => { } }:
    { data: ProductsResponse, option: ProductOptionRequest, setOption: any, afterChange: any, showCols: OC, isLoading: boolean }) {

   
    const [order, _] = React.useState<string>("desc");
    const [count, setCount] = React.useState<number>(0);
    const [column, setColumn] = React.useState<string>("");
    // const [data, setData] = React.useState<typeof initialData>(initialData);
    const onHeaderClick = (value: string) => ({
        onClick: () => {
            setColumn(value);

        },
    });
    const changeFilter = (e: any) => {

        setOption(e)
    }
    const columns = useMemo<any>(() => getColumns(order, column, onHeaderClick, afterChange, changeFilter)
        , [order, column, onHeaderClick, afterChange, changeFilter])


    const footerT = <div className="flex justify-end p-2">
        <Pagination
            total={data.totalCount}
            defaultCurrent={data.page}
            nextIcon="Next"
            prevIcon="Previous"
            pageSize={option.limit}
            onChange={(page) => {
                setOption({
                    ...option,
                    page
                })
            }}
            prevIconClassName="py-0 text-foreground !leading-[26px]"
            nextIconClassName="py-0 text-foreground !leading-[26px]"
        />

        <Select
            options={[
                {
                    label: "10",
                    value: 10
                },
                {
                    label: "20",
                    value: 20
                },
                {
                    label: "50",
                    value: 50
                }
            ]}
            size="sm"
            className={"w-auto"}
            value={{
                label: option.limit + "",
                value: option.limit
            }}
            onChange={(e: any) => {
                setOption({
                    ...option,
                    limit: e.value,
                    page: 1

                })
            }}
        />
    </div>
    useEffect(() => {
        setCount(count + 1)
    }, [option])
    return <div>
        <Table variant="modern"
            data={data.data} columns={columns} className="text-sm" direction="rtl" isLoading={isLoading} />
        {count % 2 == 0 ? <>{footerT}</> : <div>{footerT}</div>}

        <Toaster position="top-center" />
    </div>;
}