import React, { useEffect, useState } from "react";
import Table from "./Table";
import HeaderCell from "./HeaderCell";
import { ActionIcon, Checkbox, Select, Text, Tooltip } from "rizzui";
import { FiEdit, FiPrinter } from "react-icons/fi";
import { MdContentCopy, MdLocalPhone } from "react-icons/md";
import Pagination from "./Pagination";
// import { IoEyeOutline } from "react-icons/io5";
import moment from "moment";
import 'moment/locale/fr';
import CopyText from "../../Constants/CopyText";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import TimeLine from "./TimeLine";
import StateChange from "./StateChangeButton";
import orderCols from "../Const/order-cols";
import ItemsProductModal from "./ItemsProductModal";
moment.locale('fr')
const getColumns = (
  order: string,
  column: string,
  onHeaderClick: (value: string) => any,
  showCols: typeof orderCols,
  afterChange: any
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
    ...showCols.find(el => el.value == "name")?.check ?? true ? [{
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
    }] : [],
    ...showCols.find(el => el.value == "contact_phone")?.check ?? true ? [{
      title: <HeaderCell title="Phone number" />,
      dataIndex: "contact_phone",
      key: "contact_phone",

      render: (phone: string) => (
        <div className="flex items-center">
          <Text onClick={() => { CopyText(phone); toast.success("Texte copié") }} className="mb-0.5 whitespace-nowrap !text-sm font-medium bg-blue-100 leading-3 rounded-full text-blue-700 p-2 py-1 cursor-pointer flex items-center">
            <MdLocalPhone />
            <div className="me-1"></div>
            {phone}
            <div className="me-1"></div>
            <MdContentCopy />
          </Text>
        </div>
      ),
    }] : [],
    ...showCols.find(el => el.value == "to_wilaya_name")?.check ?? true ? [{
      title: <HeaderCell title="Wilaya" />,
      dataIndex: "to_wilaya_name",
      key: "to_wilaya_name",
    }] : [],
    ...showCols.find(el => el.value == "to_commune_name")?.check ?? true ? [{
      title: <HeaderCell title="Commune" />,
      dataIndex: "to_commune_name",
      key: "to_commune_name",
    }] : [],
    ...showCols.find(el => el.value == "tracking")?.check ?? true ? [{
      title: <HeaderCell title="tracking" />,
      dataIndex: "tracking",
      key: "tracking",
      render: (tracking: string | null) => (
        <div className="flex items-center">
          {tracking ? <Text className="mb-0.5 whitespace-nowrap !text-sm font-medium bg-green-100 leading-3 rounded-full text-green-700 p-2 py-1 cursor-pointer flex items-center"
            onClick={() => { CopyText(tracking); toast.success("Texte copié") }}>
            {tracking}
            <div className="me-1"></div>
            <MdContentCopy />
          </Text> : <Text className=" !text-sm whitespace-nowrap font-medium bg-red-100  rounded-full text-red-700 p-2 py-1">
            Not exist
          </Text>}
        </div>
      ),
    }] : [],
    ...showCols.find(el => el.value == "products")?.check ?? true ? [{
      title: <HeaderCell ellipsis={true} title="Products" />,
      dataIndex: "products",
      key: "products",
      render: (_: string, row: OrderFull) => <ItemsProductModal data={row} />
    }] : [],
    ...showCols.find(el => el.value == "price_total")?.check ?? true ? [{
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
    }] : [],
    ...showCols.find(el => el.value == "state")?.check ?? true ? [{
      title: <HeaderCell ellipsis={true} title="State" />,
      dataIndex: "state",
      key: "state",
      render: (_: string, row: OrderFull) => (
        <div className="flex justify-center ">
          <StateChange data={row} afterChange={afterChange} />
        </div>
      ),
    }] : [],
    ...showCols.find(el => el.value == "created_at")?.check ?? true ? [{
      title: <HeaderCell ellipsis={true} title="Date" />,
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => (
        <Text className="whitespace-nowrap   flex flex-col items-center">
          <span className="text-[12px] font-bold">{moment(created_at).format("YYYY-MM-DD")}</span>
          <span className="text-[12px] ">{moment(created_at,).fromNow()}</span>
        </Text>

      ),
    }] : [],


    ...showCols.find(el => el.value == "action")?.check ?? true ? [{
      title: <></>,
      dataIndex: "action",
      key: "action",
      width: 120,

      render: (_: string, row: OrderFull) => (
        <div className="flex items-center gap-2">
          <Tooltip content={"Order update"} color="invert" placement="top">
            <Link to={"/order/edit/"+row.id}>
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


        </div>
      ),
    }] : [],
  ];

export default function OrdersTable({ data, option, showCols, setOption, isLoading, afterChange = () => { } }:
  { data: OrdersResponse, option: OrderOptionRequest, setOption: any, afterChange: any, showCols: typeof orderCols, isLoading: boolean }) {
  const [order, _] = React.useState<string>("desc");
  const [count, setCount] = React.useState<number>(0);
  const [column, setColumn] = React.useState<string>("");
  // const [data, setData] = React.useState<typeof initialData>(initialData);
  const onHeaderClick = (value: string) => ({
    onClick: () => {
      setColumn(value);
      // setOrder(order === "desc" ? "asc" : "desc");
      // if (order === "desc") {
      //   // @ts-ignore
      //   setData([...data.sort((a, b) => (a[value] > b[value] ? -1 : 1))]);
      // } else {
      //   // @ts-ignore
      //   setData([...data.sort((a, b) => (a[value] > b[value] ? 1 : -1))]);
      // }
    },
  });

  const [columns, setColumns] = useState<any>(getColumns(order, column, onHeaderClick, showCols, afterChange))
  useEffect(
    () => {
      setColumns(getColumns(order, column, onHeaderClick, showCols, afterChange))
    }
    ,
    [order, column, onHeaderClick, showCols]
  );

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