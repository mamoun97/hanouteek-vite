
import StatHomeCards from "../components/Dashboard/StateHomeCards";
import SalesReport from "../components/Dashboard/SalesReport";
import { useGetStatisticsService } from "../../Api/Services";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import { GlobalS } from "../../Store/globalSlice";
import statesColor from "../Const/statesColor";
import DatePicker from "../components/Datepicker";
import { useState } from "react";
import moment from "moment";
import Loading from "../../Constants/Loading";
import invertColor from "../../utils/invertColor";

export default function Dashboard() {
  const global = useSelector<RootState>((state) => state.global) as GlobalS


  const [option, setOptions] = useState({
    startDate: moment().add("day").startOf("day").format(),
    endDate: moment().endOf("day").format(),
  })
  const { data, isLoading } = useGetStatisticsService({
    startDate: moment(option.startDate).startOf("day").format("yyyy-MM-DD HH:mm"),
    endDate: moment(option.endDate).endOf("day").format("yyyy-MM-DD HH:mm")
  }, (global?.platform) ? "&" + global?.platform : undefined)
  return (
    <div className="">
      <h1 className="text-2xl font-medium">Dashboard</h1>

      <div className="flex justify-center max-md:flex-col gap-2">
        <DatePicker
          inputProps={
            { label: "" }
          }
          selected={new Date(option.startDate ?? "")}
          onChange={(date: Date) => {
            setOptions({
              ...option,
              startDate: date.toDateString()
            })
          }}
          maxDate={new Date(option.endDate ?? "")}
          placeholderText="Start Date"
        />
        <DatePicker
          inputProps={
            { label: "" }
          }
          selected={new Date(option.endDate ?? "")}
          onChange={(date: Date) => {
            setOptions({
              ...option,
              endDate: date.toDateString()
            })
          }}
          minDate={new Date(option.startDate ?? "")}
          placeholderText="End Date"
        />
      </div>

      <div className="my-4 grid grid-cols-4 max-sm:grid-cols-2 gap-2">
        {data && <div className={`p-2  h-28   rounded-md flex flex-col justify-center items-center `+(data.length==0?"col-span-full":"")}
        >
          <p className="text-lg font-semibold  text-center line-clamp-2">
            All Orders
          </p>
          <span className="font-bold text-2xl">
            {data.reduce((a, b) => {
              return a + b.count;
            }, 0)}
          </span>
        </div>}
        {
          data?.map((el, k) => {
            return <div className={`p-2 h-28 border  rounded-md flex flex-col justify-center items-center `}
              style={{
                backgroundColor: statesColor[el.state],
                color: invertColor(statesColor[el.state])
              }} key={k}>
              <p className="text-lg font-semibold  text-center line-clamp-2">
                {el.state}
              </p>
              <span className="font-bold text-2xl">{el.count}</span>
            </div>
          })
        }
        
        {
          isLoading && <div className="flex justify-center col-span-full">
            <svg aria-hidden="true" role="status" className="inline w-16 h-16 me-3 text-primary animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
          </div>
        }

      </div>
      {/* <div className="my-4">
      <StatHomeCards />
      </div> */}
      <div className="my-2">
        <SalesReport className="dark:bg-[#000] dark:border-[#222]" />
      </div>

    </div>
  )
}
