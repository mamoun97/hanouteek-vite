import { Badge, Button, Input, Popover, Select, Switch } from "rizzui"
import { useGetAllOrdersService, useGetWilayasService } from "../../Api/Services"
import OrdersTable from "../components/OrdersTable"
import { useEffect, useMemo, useState } from "react"
import { LuPlus } from "react-icons/lu"
import { Link, useParams } from "react-router-dom"
// import orderCols from "../Const/order-cols"
import { MdCheck, MdSearch } from "react-icons/md"
import DatePicker from "../components/Datepicker"
import ProductSelect from "../components/ProductSelect"
import moment from "moment"
import { states as associatStates, GestionStatus, returnStates, Substates } from "../Const/states"
import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import { GlobalS } from "../../Store/globalSlice"
import useLang from "../../hoock/useLang"
import OrderCols from "../Const/order-cols"

function getState({
  type,
  role,
  defaultValue
}: {
  type: OrderProsType,
  role: RoleAssociate,
  defaultValue?: string | null
}) {
  if (type == "return")
    return "Retourné au vendeur"
  switch (role) {
    case "pos": return "soldFromTheStore";
    case "associate_stock": return "prepared";
    default: return defaultValue
  }
}
export default function Orders({ type = "default" }: { type?: OrderProsType }) {
  const failed = type == "failed"
  const global = useSelector<RootState>((state) => state.global) as GlobalS
  const user = useSelector<RootState>((state) => state.user) as UserAuth
  const paramSlugState = useParams()
  const { tr, t: t1, lang } = useLang()
  const t = tr.order
  const [option, setOptions] = useState<OrderOptionRequest>({
    limit: 10,
    page: 1,
    startDate: moment().add(-15, "day").startOf("day").format(),
    endDate: moment().endOf("day").format(),
    duplicate: false,
    contact_phone: "",
    id: "0",
    statuses: user.role == "associate_sav" ? ["not Answered - 1st Attempt", "not Answered - 2nd Attempt", "not Answered - 3rd Attempt"] : [],
    subStatus: null,
    product: null,
    to_wilaya_name: "",
    state: getState({ role: user.role, type, defaultValue: paramSlugState.state ?? null })
  })

  const [param, setParam] = useState(`?limit=${option.limit}&page=${option.page}`)

  const { data, isLoading, mutate } = useGetAllOrdersService(param, (global?.platform) ? "&" + global?.platform : undefined)
 
const deleteCols=["associate"]
  const [showCols, setShowCols] = useState(OrderCols(t1,deleteCols))
  useEffect(() => {
    let f=OrderCols(t1,deleteCols)
    setShowCols(showCols.map((el,k)=>({...el,label:f[k].label})))
  }, [lang])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  useEffect(() => {
    if (option) {
      let p = `?limit=${option.limit}&page=${option.page}`
      p += !!option.startDate ? `&startDate=${moment(option.startDate).startOf("day").format("yyyy-MM-DD HH:mm")}` : ""
      p += !!option.endDate ? `&endDate=${moment(option.endDate).endOf("day").format("yyyy-MM-DD HH:mm")}` : ""
      p += !!option.duplicate ? `&duplicate=${option.duplicate}` : ""
      p += !!option.contact_phone ? `&contact_phone=${parseInt(option.contact_phone)}` : ""
      p += option.statuses?.length ? `&statuses=${option.statuses.join(",")}` : ""
      p += (!!option.id && option.id != "0") ? `&id=${option.id}` : ""
      p += !!option.product ? `&productId=${option.product.id}` : ""
      p += !!option.state ? `&state=${option.state}` : ""
      p += !!option.subStatus ? `&subStatus=${option.subStatus}` : ""
      p += !!option.to_wilaya_name ? `&to_wilaya_name=${option.to_wilaya_name}` : ""
      setParam(p)
    }
  }, [option])
  const selectS = <Select
    // label="Select state"

    placeholder="Select state"
    {...failed ? { multiple: true } : {}}
    className={"w-full max-w-sm overflow-auto"}


    value={
      failed ? (option.statuses?.map(el => ({ label: el, value: el })) ?? null) :
        option.state ? { label: option.state, value: option.state } : null
    }
    onChange={(e: any) => {
      setOptions({
        ...option,
        state: failed ? option.state : e.value,
        statuses: failed ? (
          e.filter((item: any, index: number, self: any) =>
            index === self.findIndex((t: any) => t.value === item.value)
          ).map((el: any) => el.value)
        ) : option.statuses
      })
    }}
    clearable
    onClear={() => {
      setOptions({
        ...option,
        state: failed ? option.state : null,
        statuses: failed ? [] : option.statuses
      })
    }}

    options={failed == true ? GestionStatus : associatStates}
    {...failed ? {
      displayValue: (_) => <div className="!flex w-full gap-1 flex-row">
        {option.statuses?.map((el) => {
          return <Badge variant="flat" color="info" key={el}>{el}</Badge>
        })}
      </div>,
      getOptionDisplayValue: (el) => {
        return <div className={" w-full " + (option.statuses?.find(item => item == el.value) ? "font-bold" : "")} >
          {el.value}
        </div>
      }
    } : {}}


  />
  // const s:RoleAssociate
  const selectSubState = <Select
    // label="Select state"
    className={"w-auto"}
    placeholder="Select substate"
    value={
      option.subStatus ? { label: option.subStatus, value: option.subStatus } : null
    }
    onChange={(e: any) => {
      setOptions({
        ...option,
        subStatus: e.value
      })
    }}
    clearable
    onClear={() => {
      setOptions({
        ...option,
        subStatus: null
      })
    }}

    options={type == "return" ? returnStates : Substates}

  />
  return (
    <div >

      <h1 className="text-2xl font-semibold max-sm:mb-4">

        {
          type == "default" && tr.dashboard.all_orders ||
          type == "failed" && "Gestion des échecs" ||
          type == "return" && "Gestion des retours"
        }


      </h1>
      {
        user.role == "associate" && type != "return" &&
        <div className="block sm:hidden">
          {selectS}
        </div>
      }
      <div className="flex py-2 items-center gap-2">
        {
          user.role == "associate" && type != "return" &&
          <div className="max-sm:hidden w-full max-w-xs">
            {selectS}

          </div>

        }
        {type != "default" && selectSubState}
        <div className="grow"></div>
        <Searche {...{ option, setOptions }} db={(global?.platform) ? "&" + global?.platform : undefined} />
        <Popover  >
          <Popover.Trigger>
            <Button variant="flat" className="dark:hover:bg-muted/75 max-sm:hidden">
              {tr.order.cols}
            </Button>
          </Popover.Trigger>
          <Popover.Content className="p-2">
            {({ }) => (
              <div className="w-56" key={lang+"444"}>
                {
                  showCols.map((el, k) => {
                    return el.value != "id" && el.value != "checked" ? <div key={k} onClick={() => {
                      setShowCols(showCols.map((item, i) => {
                        return { ...item, check: i == k ? !item.check : item.check }
                      }))
                    }} className={"flex items-center p-[5px] mb-1 cursor-pointer text-sm hover:bg-gray-100 dark:hover:bg-black rounded-lg " + (el.check ? "" : "")} >
                      {el.label}
                      <div className="grow me-2"></div>
                      <MdCheck className={"text-lg transition-transform text-green-600 dark:text-white/75 " + (el.check ? "" : "scale-0")} />

                    </div> : ""
                  })
                }
              </div>
            )}
          </Popover.Content>
        </Popover>
        <Link to={user.role == "pos" && "/pos/order/create" ||
          user.role == "vendor" && "/order/create-drop" || "/order/create"}>
          <Button>
            <span className="">{tr.order.add_order}</span>
            <span className="me-1"></span>
            <LuPlus className="text-lg" />
          </Button>
        </Link>

      </div>
      <OrdersTable
        afterChange={() => mutate()}
        type={type}
        data={data?.data ? data : {
          data: [],
          totalCount: 0,
          limit: option.limit,
          hasMore: true,
          page: option.page

        }}
        showCols={showCols}
        isLoading={isLoading}
        option={option}
        setOption={setOptions} />
    </div>
  )
}



function Searche({ option, setOptions, db }: { db?: string, option: OrderOptionRequest, setOptions: (d: OrderOptionRequest) => void }) {
  const { tr, t } = useLang()
  const { data: wilayas } = useGetWilayasService(db);
  const [optionV, setOptionsV] = useState<OrderOptionRequest>(option)
  useEffect(() => {
    setOptionsV(option)
  }, [option])
  return <Popover enableOverlay >
    <Popover.Trigger>
      <Button variant="outline">
        {tr.order.search} <MdSearch className="text-lg" />
      </Button>
    </Popover.Trigger>
    <Popover.Content className="p-4">
      {({ setOpen }) => (
        <div className=" flex flex-col gap-2" >
          <h1 className="text-lg font-semibold">{tr.order.filter_ops}</h1>
          <div className="flex max-md:flex-col gap-2">
            <DatePicker
              inputProps={
                { label: tr.order.start_date }
              }
              selected={new Date(optionV.startDate ?? "")}
              onChange={(date: Date) => {
                setOptionsV({
                  ...optionV,
                  startDate: date.toDateString()
                })
              }}
              placeholderText={tr.order.start_date}
            />
            <DatePicker
              inputProps={
                { label: tr.order.end_date }
              }
              selected={new Date(optionV.endDate ?? "")}
              onChange={(date: Date) => {
                setOptionsV({
                  ...optionV,
                  endDate: date.toDateString()
                })
              }}
              placeholderText={tr.order.end_date}
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
            label={t.phone}
            value={optionV.contact_phone}
            placeholder={t.phone}
            onChange={(e) => {
              setOptionsV({
                ...optionV,
                contact_phone: e.target.value
              })
            }}
          />
          <Input
            label={tr.order.order_id}
            type="number"
            placeholder={tr.order.order_id}
            value={optionV.id}
            onChange={(e) => {
              setOptionsV({
                ...optionV,
                id: e.target.value
              })
            }}
          />
          <Switch variant="outline" label={tr.order.show_dep_orders}
            checked={optionV.duplicate} onChange={(_) => {
              setOptionsV({
                ...optionV,
                duplicate: !optionV.duplicate
              })
            }} />
          <Select
            label={t.wilaya}
            placeholder={"- " + t.wilaya + " -"}
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
            {tr.order.filter}
          </Button>
        </div>
      )}
    </Popover.Content>
  </Popover>
}


