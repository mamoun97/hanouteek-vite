import { Button, Input, Popover, Select, Switch } from "rizzui"
import { useGetAllOrdersService, useGetWilayasService } from "../../Api/Services"
import OrdersTable from "../components/OrdersTable"
import { useEffect, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { Link } from "react-router-dom"
import orderCols from "../Const/order-cols"
import { MdCheck, MdSearch } from "react-icons/md"
import DatePicker from "../components/Datepicker"
import ProductSelect from "../components/ProductSelect"
import moment from "moment"
import { states as associatStates } from "../Const/states"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { GlobalS } from "../../Store/globalSlice"


export default function Orders() {
  const global = useSelector<RootState>((state) => state.global) as GlobalS
  const [option, setOptions] = useState<OrderOptionRequest>({
    limit: 10,
    page: 1,
    startDate: moment().add(-15, "day").startOf("day").format(),
    endDate: moment().endOf("day").format(),
    duplicate: false,
    contact_phone: "",
    id: "0",
    product: null,
    to_wilaya_name: "",
    state: null,

  })

  const [param, setParam] = useState(`?limit=${option.limit}&page=${option.page}`)

  const { data, isLoading, mutate } = useGetAllOrdersService(param,(global?.platform)?"&"+global?.platform:undefined)
  // const [showColumns, setShowColumns] = useState({
  //   checked: true,
  //   id: true,
  //   name: true,
  //   contact_phone: true,
  //   to_wilaya_name: true,
  //   to_commune_name: true,
  //   tracking: true,
  //   products: true,
  //   price_total: true,
  //   created_at: true,
  //   action: true,
  // })
  const [showCols, setShowCols] = useState(orderCols)
  useEffect(() => {

    document.body.dir = "ltr"
  }, [])
  useEffect(() => {
    if (option) {
      let p = `?limit=${option.limit}&page=${option.page}`
      p += !!option.startDate ? `&startDate=${moment(option.startDate).startOf("day").format("yyyy-MM-DD HH:mm")}` : ""
      p += !!option.endDate ? `&endDate=${moment(option.endDate).endOf("day").format("yyyy-MM-DD HH:mm")}` : ""
      p += !!option.duplicate ? `&duplicate=${option.duplicate}` : ""
      p += !!option.contact_phone ? `&contact_phone=${
        parseInt(option.contact_phone)
      }` : ""
      p += (!!option.id && option.id != "0") ? `&id=${option.id}` : ""
      p += !!option.product ? `&productId=${option.product.id}` : ""
      p += !!option.state ? `&state=${option.state}` : ""
      p += !!option.to_wilaya_name ? `&to_wilaya_name=${option.to_wilaya_name}` : ""
      setParam(p)
      console.log(option)
    }
  }, [option])
  const selectS = <Select
    // label="Select state"
    placeholder="Select state"

    className={"w-full max-w-sm"}
    value={option.state ? { label: option.state, value: option.state } : null}
    onChange={(e: typeof associatStates[0]) => {
      setOptions({
        ...option,
        state: e.value
      })
    }}
    clearable
    onClear={() => {
      setOptions({
        ...option,
        state: null
      })
    }}
    options={associatStates}
  />
  return (
    <div dir="ltr">
      <h1 className="text-2xl font-semibold">All Orders</h1>
      <div className="block sm:hidden">
          {selectS}
        </div>
      <div className="flex py-2 items-center gap-2">
        <div className="max-sm:hidden w-full max-w-sm">
          {selectS}
        </div>
        <div className="grow"></div>
        <Searche {...{ option, setOptions }} db={(global?.platform)?"&"+global?.platform:undefined} />
        <Popover >
          <Popover.Trigger>
            <Button variant="flat">
              Colunms
            </Button>
          </Popover.Trigger>
          <Popover.Content className="p-2">
            {({ }) => (
              <div className="w-56">
                {
                  showCols.map((el, k) => {
                    return el.value != "id" && el.value != "checked" ? <div onClick={() => {
                      setShowCols(showCols.map((item, i) => {
                        return { ...item, check: i == k ? !item.check : item.check }
                      }))
                    }} className={"flex items-center p-[5px] mb-1 cursor-pointer text-sm hover:bg-gray-100 rounded-lg " + (el.check ? "" : "")} dir="ltr">
                      {el.label}
                      <div className="grow me-2"></div>
                      <MdCheck className={"text-lg transition-transform text-green-600 " + (el.check ? "" : "scale-0")} />

                    </div> : ""
                  })
                }
              </div>
            )}
          </Popover.Content>
        </Popover>
        <Link to="/order/create">
          <Button>
            <span className="max-sm:hidden">Add New Order</span>
            <span className="me-1"></span>
            <LuPlus className="text-lg" />
          </Button>
        </Link>

      </div>
      <OrdersTable
        afterChange={() => mutate()}
        data={data?.data ? data : {
          data: [],
          ...option,
          totalCount: 0,

        }} showCols={showCols} isLoading={isLoading} option={option} setOption={setOptions} />
    </div>
  )
}



function Searche({ option, setOptions,db }: {db?:string, option: OrderOptionRequest, setOptions: (d: OrderOptionRequest) => void }) {

  const { data: wilayas } = useGetWilayasService(db);
  const [optionV, setOptionsV] = useState<OrderOptionRequest>(option)
  useEffect(() => {
    setOptionsV(option)
  }, [option])
  return <Popover enableOverlay >
    <Popover.Trigger>
      <Button variant="outline">
        Search <MdSearch className="text-lg" />
      </Button>
    </Popover.Trigger>
    <Popover.Content className="p-4">
      {({ setOpen }) => (
        <div className=" flex flex-col gap-2" dir="ltr">
          <h1 className="text-lg font-semibold">Filter options</h1>
          <div className="flex max-md:flex-col gap-2">
            <DatePicker
              inputProps={
                { label: "Start Date" }
              }
              selected={new Date(optionV.startDate ?? "")}
              onChange={(date: Date) => {
                setOptionsV({
                  ...optionV,
                  startDate: date.toDateString()
                })
              }}
              placeholderText="Start Date"
            />
            <DatePicker
              inputProps={
                { label: "End Date" }
              }
              selected={new Date(optionV.endDate ?? "")}
              onChange={(date: Date) => {
                setOptionsV({
                  ...optionV,
                  endDate: date.toDateString()
                })
              }}
              placeholderText="End Date"
            />
          </div>
          <ProductSelect
            isSearch={true}
            nameProduct={option.product?.name ?? ""}
            setValue={(e: any) => {
              setOptionsV({
                ...optionV,
                product: e
              })
            }}
          />

          <Input
            label="Phone"
            value={optionV.contact_phone}
            placeholder="phone"
            onChange={(e) => {
              setOptionsV({
                ...optionV,
                contact_phone: e.target.value
              })
            }}
          />
          <Input
            label="Order Id"
            type="number"
            placeholder="order"
            value={optionV.id}
            onChange={(e) => {
              setOptionsV({
                ...optionV,
                id: e.target.value
              })
            }}
          />
          <Switch variant="outline" label="Show diplicat orders"
            checked={optionV.duplicate} dir="ltr" onChange={(_) => {
              setOptionsV({
                ...optionV,
                duplicate: !optionV.duplicate
              })
            }} />
          <Select
            label="wilaya"
            options={
              wilayas?.data.map(el => {
                return {
                  label: el.id + " - " + el.name,
                  value: el.name
                }
              }) ?? []
            }
            clearable
            onClear={() => {
              setOptionsV({
                ...optionV,
                to_wilaya_name: ""
              })
            }}
            value={!!optionV.to_wilaya_name ? {
              label: optionV.to_wilaya_name,
              value: optionV.to_wilaya_name
            } : null}
            onChange={
              (e: any) => {
                setOptionsV({
                  ...optionV,
                  to_wilaya_name: e.value
                })
              }
            }
          />
          <Button onClick={() => {

            setOptions({
              ...optionV,
              limit: 10,
              page: 1,
            })
            setOpen(false)
          }}>
            Filter
          </Button>
        </div>
      )}
    </Popover.Content>
  </Popover>
}


