import React, { useEffect, useMemo } from "react";
import Table from "./Table";
import { Select } from "rizzui";
import Pagination from "./Pagination";
import { Toaster } from "react-hot-toast";
import orderCols from "../Const/order-cols";
import { useSelector } from "react-redux";
import { RootState } from "../../Store";
import getColumns, { ColumnTypeReturn } from "./OrderTableOptions/Columns";


export default function OrdersTable({ data, option, showCols, setOption, isLoading, afterChange = () => { }, type = "default" }:
  { data: OrdersResponse, option: OrderOptionRequest, setOption: any, afterChange: any, showCols: typeof orderCols, isLoading: boolean, type?: OrderProsType }) {

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
    isPos: user.role == "pos",

    type
  }), [order, column, onHeaderClick, afterChange, changeFilter, type,])



  useEffect(() => {
    setCount(count + 1)
  }, [option])
  return <div>
    <Table variant="modern"
      data={data.data}
      columns={
        columns.filter(el => showCols.find(t => t.value == el.key)?.check ?? el)
      }
      className="text-sm"
      isLoading={isLoading} />
    <div className="flex justify-end p-2">
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

    <Toaster position="top-center" />
  </div>;
}