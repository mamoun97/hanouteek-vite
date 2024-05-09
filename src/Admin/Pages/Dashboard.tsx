// import { MdGroups } from "react-icons/md"
// import StateHome from "../components/Dashboard/StateHome"
// import { FaMoneyBills } from "react-icons/fa6";
// import { IoCart } from "react-icons/io5";
// import { LuPackage } from "react-icons/lu";
import StatHomeCards from "../components/Dashboard/StateHomeCards";
import SalesReport from "../components/Dashboard/SalesReport";
// const items = [
//   {
//     title: "Bénéfices",
//     subTitle: "509,300.00 DZD",
//     icon: <MdGroups />,
//     iconClassName: "bg-orange-100 text-orange-500"
//   },
//   {
//     title: "Chiffre d’affaire",
//     subTitle: "2,904,050.00 DZD",
//     icon: <FaMoneyBills />,
//     iconClassName: "bg-green-100 text-green-500"
//   },
//   {
//     title: "All orders",
//     subTitle: "18906",
//     icon: <IoCart />,
//     iconClassName: "bg-blue-100 text-blue-500"
//   },
//   {
//     title: "All products",
//     subTitle: "37",
//     icon: <LuPackage />,
//     iconClassName: "bg-green-100 text-green-500"
//   },
// ]
export default function Dashboard() {
  return (
    <div className="">
      <h1 className="text-2xl font-medium">Dashboard</h1>
      <div className="my-4">
      <StatHomeCards />
      </div>
      <div className="my-2">
      <SalesReport className="dark:bg-[#000] dark:border-[#222]"/>
      </div>
      {/* <div className="grid  grid-cols-4 max-[900px]:grid-cols-2 max-[400px]:grid-cols-1 gap-2 mt-4">
        {
          items.map((el, k) => {
            return <StateHome {...el} key={k} />
          })
        }
      </div> */}
    </div>
  )
}
