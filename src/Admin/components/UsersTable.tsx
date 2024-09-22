import React, { useEffect, useMemo } from "react";
import Table from "./Table";
import HeaderCell from "./HeaderCell";
import { ActionIcon, Avatar, Badge, Checkbox, Select, Switch, Text, Tooltip } from "rizzui";
import { FiEdit } from "react-icons/fi";
import Pagination from "./Pagination";
import moment from "moment";
import 'moment/locale/fr';
import toast, { Toaster } from "react-hot-toast";
import orderCols from "../Const/order-cols";
import imgSrc from "../../utils/imgSrc";
import { MdContentCopy, MdOutlineRefresh } from "react-icons/md";
import CopyText from "../../Constants/CopyText";
import { RiDeleteBinLine } from "react-icons/ri";
import UsersFormModal from "./UsersFormModal";
import AssociateApi from "../../Api/Associate";
import alertError from "../../hoock/alertError";
function formatPhoneNumber(phoneNumber: string) {
    // Ensure the input is a string
    phoneNumber = phoneNumber.toString();

    // Check if the phone number length is valid
    if (phoneNumber.length !== 10) {
        throw new Error('Phone number must be 10 digits long');
    }

    // Split and format the phone number
    return phoneNumber.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
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
            title: <HeaderCell title="Image" />,
            dataIndex: "image",
            key: "image",
            show: false,
            render: (_: string, row: AssociateFull) => (
                <div className="">
                    <Avatar
                        rounded="lg"
                        customSize="40"
                        name={""}
                        className="ring-2 min-w-[40px] ring-blue ring-offset-background ring-offset-2"
                        src={imgSrc(row.avatar, true)}
                    />



                </div>
            ),
        },
        {
            title: <HeaderCell title="Name" />,
            dataIndex: "name",
            key: "name",
            show: false,
            render: (_: any, row: AssociateFull) => (
                <div className="flex items-center">
                    {row.firstName + " " + row.lastName}
                </div>
            ),
        },
        {
            title: <HeaderCell title="Email" />,
            dataIndex: "email",
            key: "email",
            show: false,
            render: (email: string) => (
                <div className="flex justify-center">


                    <div onClick={() => { CopyText(email); toast.success("Texte copié") }}>
                        <Badge variant="flat" color="success" className="mb-0.5 whitespace-nowrap !text-sm font-medium  leading-3 rounded-full   p-2 py-1 cursor-pointer flex items-center"
                        >
                            {email}
                            <div className="me-1"></div>
                            <MdContentCopy />
                        </Badge>
                    </div>

                </div>
            ),
        },
        {
            title: <HeaderCell title="N° Téléphone" />,
            dataIndex: "phoneNumber",
            key: "phoneNumber",
            show: false,
            render: (phoneNumber: string) => {
                let p = formatPhoneNumber("0" + phoneNumber)
                return <div className="flex justify-center">

                    <div onClick={() => { CopyText("0" + phoneNumber); toast.success("Texte copié") }}>
                        <Badge variant="flat" color="info" className="mb-0.5 whitespace-nowrap !text-sm font-medium  leading-3 rounded-full   p-2 py-1 cursor-pointer flex items-center"
                        >
                            {p}
                            <div className="me-1"></div>
                            <MdContentCopy />
                        </Badge>
                    </div>

                </div>
            },
        },
        {
            title: <HeaderCell title="Address" />,
            dataIndex: "address",
            key: "address",
            show: false,
            render: (address: string) => (
                <div className="flex justify-center">
                    {
                        address
                    }
                </div>
            ),
        },

        {
            title: <HeaderCell title="Role" />,
            dataIndex: "role",
            key: "role",
            show: false,
            render: (role: string) => (
                <div className="flex items-center">
                    {role}
                </div>
            ),
        },
        {
            title: <HeaderCell title="Active" />,
            dataIndex: "active",
            key: "active",
            show: false,
            render: (active: boolean, row: AssociateFull) => (
                <div className="flex items-center">

                    <Switch
                        label=""
                        // offIcon={<span className="h-3.5 w-3.5" />}
                        // onIcon={<span className="h-3 w-3" />}
                        switchClassName="min-w-[40px]"
                        variant="outline"
                        onChange={async () => {
                            try {
                                await AssociateApi["updateAssociate"]({
                                    ...row,
                                    active: !active
                                });


                                afterChange();
                            } catch (error) {
                                alertError(error);
                            }
                        }}
                        checked={active}
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
                    <Tooltip content={"Resend Password"} color="invert" placement="top">
                        <ActionIcon variant="text" color="primary">
                            <MdOutlineRefresh className="w-5 h-5 min-w-[20px]" />
                        </ActionIcon>
                    </Tooltip>
                    <UsersFormModal
                        data={row}
                        afterChange={afterChange}
                        action={
                            <Tooltip content={"Edit"} color="invert" placement="top">
                                <ActionIcon variant="text">
                                    <FiEdit className="w-5 h-5 min-w-[20px]" />
                                </ActionIcon>
                            </Tooltip>
                        }
                    />

                    <Tooltip content={"Delete"} color="danger" placement="top">
                        <ActionIcon variant="text" color="danger">
                            <RiDeleteBinLine className="w-5 h-5 min-w-[20px]" />
                        </ActionIcon>
                    </Tooltip>

                </div>
            ),
        }
    ];

export default function UsersTable({ data, option, showCols, setOption, isLoading, afterChange = () => { } }:
    { data: AssociateResponse, option: AssociateOptionRequest, setOption: any, afterChange: any, showCols: typeof orderCols, isLoading: boolean }) {

    // if (showCols) { }
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