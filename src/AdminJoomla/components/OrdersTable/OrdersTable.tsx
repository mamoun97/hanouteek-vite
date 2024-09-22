import React, { useEffect, useMemo } from "react";
import { Select } from "rizzui";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../Store";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import getColumns, { ColumnTypeReturn } from "./Columns";
import Table from "../../../Admin/components/Table";
import useLang from "../../../hoock/useLang";
import Pagination from "../../../Admin/components/Pagination";
type OC = {
  label: string,
  value: string,
  check: boolean
}[]
export default function OrdersTable({ data, option, showCols, setOption, isLoading, afterChange = () => { }, type = "default" }:
  { data: OrdersResponse, option: OrderOptionRequest, setOption: any, afterChange: any, showCols: OC, isLoading: boolean, type?: OrderProsType }) {
  const { tr ,lang} = useLang()
  const [order, _] = React.useState<string>("desc");
  const [count, setCount] = React.useState<number>(0);
  const [column, setColumn] = React.useState<string>("");
  const onHeaderClick = (value: string) => ({
    onClick: () => {
      setColumn(value);
    },
  });
  const changeFilter = (e: any) => {
    setOption(e)
  }
  const user = useSelector<RootState>((state) => state.user) as UserAuth
  const columns = useMemo<ColumnTypeReturn[]>(() => getColumns({
    order,
    column,
    onHeaderClick,
    afterChange,
    changeFilter,
    deleteCols: [
    //   ...(user.role == "pos") ? ["actions"] : [],
    //   ...user.role == "vendor" ? ["platform", "associate", "subState"] : []
    ],
    isPos:false,
    type
  }), [order, column, onHeaderClick, afterChange, changeFilter, type,])



  useEffect(() => {
    setCount(count + 1)
  }, [option])
  return <div>
    {/* <div className="max-sm:hidden"> */}
      <Table variant="modern"
        data={data.data}
        columns={
          columns.filter(el => showCols.find(t => t.value == el.key)?.check ?? el)
        }


        className="text-sm"
        isLoading={isLoading} />
    {/* </div> */}
    {/* <div className=" max-sm:flex  flex-col hidden gap-2 mt-2">

      {
        data.data.map((el, k) => {
          return <MobileCardRow data={el} key={k} afterChange={afterChange}/>
        })
      }
    </div> */}
    <div className="flex justify-end p-2 max-sm:flex-col gap-2">
      <Pagination
        total={data.totalCount}
        defaultCurrent={data.page}
        nextIcon={<div className="flex items-center gap-1"> <span className="max-sm:hidden text-xs font-semibold">{tr.global.next}</span> <IoArrowForward className={lang=="ar"?"rotate-180":""}/></div>}
        prevIcon={<div className="flex items-center gap-1"><IoArrowBack className={lang=="ar"?"rotate-180":""}/> <span className="max-sm:hidden text-xs font-semibold">{tr.global.previous}</span> </div>}
        pageSize={option.limit}
        onChange={(page) => {
          setOption({
            ...option,
            page
          })
        }}
        className="font-gilroy"


        prevIconClassName="py-0 text-foreground !leading-[26px] font-gilroy"
        nextIconClassName="py-0 text-foreground !leading-[26px] font-gilroy"
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

    <Toaster position="top-center" />
  </div>;
}