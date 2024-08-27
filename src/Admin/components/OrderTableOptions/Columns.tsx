
import { ActionIcon, Avatar, Badge, Popover, Text, Tooltip } from "rizzui";
import { FiEdit, FiPrinter } from "react-icons/fi";
import { MdContentCopy, MdLocalPhone } from "react-icons/md";
import moment from "moment";
import 'moment/locale/fr';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoCopyOutline } from "react-icons/io5";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import HeaderCell from "../HeaderCell";
import TimeLine from "../TimeLine";
import Timer from "../Timer";
import CopyText from "../../../Constants/CopyText";
import getPlatformUrl from "../../../Constants/Platform";
import ApiConfig from "../../../Api/ApiConfig";
import ItemsProductModal from "../ItemsProductModal";
import StateChange from "../StateChangeButton";


function formatPhoneNumber(phoneNumber: string) {
    const localNumber = phoneNumber.replace(/^(\+\d{3})(\d{9})$/, '0$2');
    return localNumber.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4');
}


export type ColumnTypeReturn = {
    title: any,
    dataIndex: string,
    key: string,
    width?: number,
    onHeaderCell?: any,
    show?: boolean,
    render?: (x?: any, y?: any) => any
}


type ColumnTypePros = {
    order: string,
    column: string,
    onHeaderClick: (value: string) => any,
    afterChange: any,
    changeFilter: any,
    isPos: boolean,
    type?: OrderProsType
}


const getColumns= ({ order, column, onHeaderClick, afterChange, changeFilter, isPos, type = "default" }: ColumnTypePros):ColumnTypeReturn[] => {
    return [
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
        ...(isPos || type != "default") ? [] : [
            {
                title: <>Actions</>,
                dataIndex: "actions",
                key: "actions",
                width: 50,
                render: (_: any, row: OrderFull) => (
                    <div className="inline-flex cursor-pointer">

                        <Popover placement={"right"}>
                            <Popover.Trigger>
                                <ActionIcon variant="flat" color="primary">
                                    {/* <AdjustmentsHorizontalIcon  /> */}
                                    <HiAdjustmentsHorizontal className="w-5 h-5" />
                                </ActionIcon>
                            </Popover.Trigger>
                            <Popover.Content className="z-0">
                                {({ setOpen }) => (
                                    <div >
                                        <div className="flex items-center gap-2">
                                            <Tooltip className="z-50" content={"Order update"} color="invert" placement="top">
                                                <Link to={"/order/edit/" + row.id}>
                                                    <ActionIcon variant="text">
                                                        <FiEdit className="w-5 h-5 min-w-[20px]" />
                                                    </ActionIcon>
                                                </Link>
                                            </Tooltip>
                                            {!!row.label && <Tooltip content={"Print ticket"} color="invert" placement="top">
                                                <Link to={row.label} target="_blank">
                                                    <ActionIcon variant="text" className="text-[#7828c8]">
                                                        <FiPrinter className="w-5 h-5 min-w-[20px]" />
                                                    </ActionIcon>
                                                </Link>
                                            </Tooltip>}
                                            <Tooltip content={"Timeline"} color="invert" placement="top">
                                                <div>
                                                    <TimeLine data={row} />
                                                </div>
                                            </Tooltip>
                                            {row.duplicate != 0 && <Tooltip content={"duplicate"} color="invert" placement="top">

                                                <div className="relative inline-flex">
                                                    <ActionIcon variant="text" className="text-[#222] dark:text-[#777]" onClick={() => {

                                                        changeFilter({
                                                            limit: 10,
                                                            page: 1,
                                                            contact_phone: row.contact_phone.replace("+", ""),
                                                            startDate: moment().add(-150, "day").startOf("day").format(),
                                                            endDate: moment().endOf("day").format(),
                                                        })
                                                    }}>
                                                        <IoCopyOutline className="w-5 h-5 min-w-[20px]" />
                                                    </ActionIcon>
                                                    <span className="absolute text-xs bg-gray-800 text-white w-4 h-4 text-center rounded-full right-0 top-0 -translate-y-[25%]">
                                                        {row.duplicate}
                                                    </span>

                                                </div>
                                            </Tooltip>}



                                        </div>
                                    </div>
                                )}
                            </Popover.Content>
                        </Popover>
                    </div>
                ),
            }
        ],

        ...type == "default" ? [] : [{
            title: <HeaderCell title="Loader" />,
            dataIndex: "loader",
            key: "loader",
            show: false,
            render: (_: string, row: OrderFull) => (
                <div className="flex items-center">
                    {row.state === "pending" ? (
                        <Timer createdAt={row.created_at} />
                    ) : (
                        <div className="item">
                            <div className={`animate-load_pulse 
                 ${row.state == "not Answered - 1st Attempt" || row.state == "not Answered - 2nd Attempt" || row.state == "not Answered - 3rd Attempt" ? "bg-orange-500" : "bg-green-500"}
                w-10 h-10 rounded-full`}></div>
                        </div>
                    )}
                </div>
            ),
        }],
        {
            title: <HeaderCell title="Name" />,
            dataIndex: "name",
            key: "name",
            show: false,
            render: (_: string, row: OrderFull) => (
                <div className="flex items-center">
                    <Text className="mb-0.5 !text-sm font-medium min-w-[150px]">
                        {row.firstname}
                    </Text>
                </div>
            ),
        },
        {
            title: <HeaderCell title="Phone number" />,
            dataIndex: "contact_phone",
            key: "contact_phone",

            render: (phone: string) => (
                <div className="flex items-center">
                    <span onClick={() => { CopyText(phone); toast.success("Texte copié") }}>
                        <Badge
                            variant="flat"
                            color="info"
                            className="cursor-pointer flex whitespace-nowrap items-center"

                        >
                            <MdLocalPhone className="text-lg" />
                            <div className="me-1"></div>
                            {formatPhoneNumber(phone)}
                            <div className="me-1"></div>
                            <MdContentCopy className="text-lg" />
                        </Badge>
                    </span>
                </div>
            ),
        },
        {
            title: <HeaderCell title="Wilaya" />,
            dataIndex: "to_wilaya_name",
            key: "to_wilaya_name",
        },
        {
            title: <HeaderCell title="Commune" />,
            dataIndex: "to_commune_name",
            key: "to_commune_name",
        },
        {
            title: <HeaderCell title="Platform" />,
            dataIndex: "platform",
            key: "platform",
            render: (platform: string) => (
                <div className="flex items-center whitespace-nowrap ">
                    {platform ? <Tooltip content={platform} placement="top">
                        <div>
                            <Avatar name=""
                                src={getPlatformUrl(platform)} />
                        </div>

                    </Tooltip>
                        : "not exist yet"}
                </div>
            ),
        },
        {
            title: <HeaderCell title="Bénéfice" />,
            dataIndex: "benefit_drop_shipper",
            key: "benefit_drop_shipper",

            render: (b: string) => (
                <div className="flex items-center whitespace-nowrap ">
                    {b} DZD
                </div>
            ),
        },
        {
            title: <HeaderCell title="َAssociate" />,
            dataIndex: "associate",
            key: "associate",

            render: (_: string, row: OrderFull) => (
                <div className="flex items-center whitespace-nowrap ">
                    {row.associate ? <Tooltip content={row.associate.firstName + " " + row.associate.lastName} placement="top">
                        <div>
                            <Avatar name=""
                                src={ApiConfig.rootUrl + "/" + row.associate.avatar} />
                        </div>
                    </Tooltip>
                        : "not exist "}
                </div>
            ),
        },
        {
            title: <HeaderCell title="tracking" />,
            dataIndex: "tracking",
            key: "tracking",
            render: (tracking: string | null) => (
                <div className="flex items-center">
                    {tracking ? <span onClick={() => { CopyText(tracking); toast.success("Texte copié") }}>
                        <Badge
                            variant="flat"
                            color="success"
                            size="lg"
                            className="flex items-center gap-1 whitespace-nowrap cursor-pointer"
                        >
                            {tracking}
                            <MdContentCopy />
                        </Badge>
                    </span> : <Badge
                        variant="flat"
                        className="whitespace-nowrap"
                        color="danger">
                        Not exist
                    </Badge>}


                </div>
            ),
        },
        {
            title: <HeaderCell ellipsis={true} title="Products" />,
            dataIndex: "products",
            key: "products",
            render: (_: string, row: OrderFull) => row.item ? <ItemsProductModal data={row} /> : null
        },
        {
            title: <HeaderCell ellipsis={true} title="Prix total" />,
            dataIndex: "price_total",
            key: "price_total",
            render: (price_total: string) => (
                <div className="flex items-center ">
                    <Text className="mb-0.5 !text-sm font-semibold ">
                        {price_total} <small className="font-medium">DZD</small>
                    </Text>
                </div>
            ),
        },
        ...type != "default" ? [
            {
                title: <HeaderCell ellipsis={true} title="SubState" />,
                dataIndex: "SubState",
                key: "SubState",
                render: (_: string, row: OrderFull) => (
                    <div className="flex justify-center ">
                        <StateChange type={type} data={row} afterChange={afterChange} />
                    </div>
                ),
            }
        ] : [],
        {
            title: <HeaderCell ellipsis={true} title="State" />,
            dataIndex: "state",
            key: "state",
            render: (_: string, row: OrderFull) => (
                <div className="flex justify-center ">
                    <StateChange data={row} afterChange={afterChange} readOnly={type != "default"} />
                </div>
            ),
        },
        {
            title: <HeaderCell ellipsis={true} title="Date" />,
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at: string) => (
                <Text className="whitespace-nowrap   flex flex-col items-center">
                    <span className="text-[12px] font-bold">{moment(created_at).format("YYYY-MM-DD")}</span>
                    <span className="text-[12px] ">{moment(created_at,).fromNow()}</span>
                </Text>

            ),
        },
    ]
}


export default getColumns