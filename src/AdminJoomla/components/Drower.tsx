
import {
    LuLogOut,
    // LuUsers 
} from "react-icons/lu";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsBoxFill } from "react-icons/bs";
import { IoBarChartSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Store";
import { changeUser } from "../../Store/authSlice";
import ApiConfig from "../../Api/ApiConfig";
import AuthApi from "../../Api/Auth";
// import { TbShoppingCartPlus } from "react-icons/tb";
import { FaList } from "react-icons/fa";
// import { HiPhoneIncoming } from "react-icons/hi";
// import { PiKeyReturnFill } from "react-icons/pi";
import useLang from "../../hoock/useLang";
import { Button } from "rizzui";
import { changeClient } from "../../Store/authSliceClient";

const items = () => {
    const { tr } = useLang()

    return [
        {
            link: "/joomla-admin/dashboard",
            text: tr.drower.dashboard,
            role: [],
            icon: IoBarChartSharp
        },

        {
            link: "/joomla-admin/orders",
            text: tr.drower.orders,
            role: [],
            icon: BsBoxFill
        },

        {
            link: "/joomla-admin/products",
            text: tr.drower.prods,
            role: [],
            icon: FaList
        },


    ]
}
export default function Drower({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: any,
}) {
    const { tr } = useLang()

    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector<RootState>((state) => state.client) as ClientAuth
    const dispatch: AppDispatch = useDispatch();

    return (
        <aside id="logo-sidebar" className={"fixed top-0 ltr:left-0 rtl:right-0 bottom-0 z-40 w-64 min-w-[256px] h-full min-h-screen transition-transform  " + (open ? "max-sm:!fixed" : "max-sm:!hidden")} aria-label="Sidebar">
            <div className={'fixed hidden max-sm:block top-0 left-0 right-0 bottom-0 bg-[#0003] cursor-pointer'} onClick={() => {
                setOpen(false)
            }}></div>
            <div className={"h-full px-3 py-4 overflow-y-auto bg-[#181818] dark:bg-[#111] text-gray-100 relative max-sm:ltr:animate-cart_rtl max-sm:rtl:animate-cart"}>
                <div className='flex flex-col items-center'>

                    <div className="w-20 h-20 rounded-full  bg-slate-300 border-2 border-white bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: "url('" + ApiConfig.rootUrl + "/" + user.avatar + "')" }}></div>
                    <h1 className='text-lg font-bold capitalize mt-2   max-w-[80%]  truncate ...'>
                        {user.firstName + " " + user.lastName}
                    </h1>
                    <p className='text-sm'>{user.email}</p>

                    {/* <Link to={"/joomla-auth"}> */}
                        <Button className="mt-4 bg-red-800"  onClick={() => {
                            
                            dispatch(changeClient(null))
                            navigate("/joomla-auth")
                        }}>
                             <LuLogOut className="text-lg" />
                             <div className="me-2"></div>
                            Logout
                        </Button>
                    {/* </Link> */}
                </div>
                <div className="border border-gray-700 my-3"></div>
                <ul className="space-y-2 font-medium">
                    {
                        items().map((el, k) => {
                            // if (el.role.find(d => d == user.role))
                            return <li key={k}>
                                <Link to={el.link} onClick={() => setOpen(false)} className={"flex items-center p-2  rounded-lg  hover:text-white  hover:bg-gray-700/25 group " + ((location.pathname == el.link) ? "text-white !bg-gray-700" : "text-gray-300")}>

                                    <el.icon className={"w-5 h-5  transition duration-75 dark:text-gray-400 group-hover:text-gray-100 " + ((location.pathname == el.link) ? "text-gray-100" : "text-gray-500")} />
                                    <span className="ms-3">{el.text}</span>
                                </Link>
                            </li>
                            // return null
                        })
                    }
                </ul>

            </div>
        </aside>
    )
}
