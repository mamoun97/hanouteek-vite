import React, { useEffect, useMemo } from "react";
import Table from "./Table";
import HeaderCell from "./HeaderCell";
import { ActionIcon, Badge, Button, Checkbox, Popover, Select, Switch, Text, Title, Tooltip } from "rizzui";

import Pagination from "./Pagination";
import moment from "moment";
import 'moment/locale/fr';
import toast, { Toaster } from "react-hot-toast";
import orderCols from "../Const/order-cols";
import { MdContentCopy } from "react-icons/md";
import CopyText from "../../Constants/CopyText";
import { RiDeleteBinLine } from "react-icons/ri";
import alertError from "../../hoock/alertError";
import OrderApi from "../../Api/OrderApi";
function formatPhoneNumber(phoneNumber: string) {
    const localNumber = phoneNumber.replace(/^(\+\d{3})(\d{9})$/, '0$2');
    return localNumber.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
}

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
            title: <HeaderCell title="Date" />,
            dataIndex: "date",
            key: "date",
            show: false,
            render: (_: string, row: OrderAbandoned) => (
                <div className="">
                    <Text className="whitespace-nowrap   flex flex-col items-center">
                        <span className="text-[12px] font-bold">{moment(row.updated_at).format("YYYY-MM-DD")}</span>
                        <span className="text-[12px] ">{moment(row.updated_at,).fromNow()}</span>
                    </Text>



                </div>
            ),
        },
        {
            title: <HeaderCell title="Article" />,
            dataIndex: "article",
            key: "article",
            show: false,
            render: (_: any, row: OrderAbandoned) => (
                <div className="flex items-center ">
                    <div className="min-w-[120px]">
                        {row.items}

                    </div>
                </div>
            ),
        },
        {
            title: <HeaderCell title="Commune" />,
            dataIndex: "to_commune_name",
            key: "to_commune_name",
            show: false,
            render: (to_commune_name: string) => (
                <div className="flex justify-center">


                    {to_commune_name}

                </div>
            ),
        },
        {
            title: <HeaderCell title="N° Téléphone" />,
            dataIndex: "contact_phone",
            key: "contact_phone",
            show: false,
            render: (contact_phone: string) => {
                let p = formatPhoneNumber(contact_phone)
                return <div className="flex justify-center">

                    <div onClick={() => { CopyText(contact_phone); toast.success("Texte copié") }} dir="ltr">
                        <Badge variant="flat" color="info"  className="mb-0.5 whitespace-nowrap !text-sm font-medium  leading-3 rounded-full   p-2 py-1 cursor-pointer flex items-center"
                        >
                            <div style={{direction:"ltr"}}>{p}</div>
                            <div className="me-1"></div>
                            <MdContentCopy />
                        </Badge>
                    </div>

                </div>
            },
        },
        {
            title: <HeaderCell title="Active" />,
            dataIndex: "state",
            key: "state",
            show: false,
            render: (_: any, row: OrderAbandoned) => (
                <div className="flex items-center">

                    <Switch
                        label=""
                        // offIcon={<span className="h-3.5 w-3.5" />}
                        // onIcon={<span className="h-3 w-3" />}
                        switchClassName="min-w-[40px]"
                        variant="outline"

                        onChange={async () => {
                            try {
                                await OrderApi.orderAbandonedEdit({
                                    ...row,
                                    state: !row.state
                                });


                                afterChange();
                            } catch (error) {
                                alertError(error);
                            }
                        }}
                        checked={row.state}
                    />
                </div>
            ),
        },




        {
            title: <></>,
            dataIndex: "action",
            key: "action",
            width: 120,

            render: (_: string, row: AssociateFull) => (
                <div className="flex items-center gap-2">



                    <Popover>
                        <Popover.Trigger>
                            <div>
                                <Tooltip content={"Delete"} color="danger" placement="top">
                                    <ActionIcon variant="text" color="danger">
                                        <RiDeleteBinLine className="w-5 h-5 min-w-[20px]" />
                                    </ActionIcon>
                                </Tooltip>
                            </div>
                        </Popover.Trigger>
                        <Popover.Content>
                            {({ setOpen }) => (
                                <div className="w-56">
                                    <Title as="h6">Delete</Title>
                                    <Text>Are you sure you want to delete?</Text>
                                    <div className="flex justify-end gap-3 mb-1">
                                        <Button size="sm" variant="outline" onClick={() => setOpen(false)}>
                                            No
                                        </Button>
                                        <Button size="sm" color="danger" onClick={async () => {
                                            try {
                                                await OrderApi.orderAbandonedDelete(row.id);
                                                afterChange();
                                                setOpen(false)
                                            } catch (error) {
                                                alertError(error);
                                                setOpen(false)
                                            }
                                        }} >
                                            Yes
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Popover.Content>
                    </Popover>

                </div>
            ),
        }
    ];

export default function AbandonedCartsTable({ data, option, showCols, setOption, isLoading, afterChange = () => { } }:
    { data: OrderAbandonedResponse, option: AssociateOptionRequest, setOption: any, afterChange: any, showCols: typeof orderCols, isLoading: boolean }) {

    if (showCols) { }
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