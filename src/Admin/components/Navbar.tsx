
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../../Store'
import { ThemeSetting } from '../../Types/ThemeSetting'
import ApiConfig from '../../Api/ApiConfig'
import { IoIosNotifications } from "react-icons/io";
import ModeThemeButton from './ModeThemeButton'
import SelectPlatform from './SelectPlatform'
export default function Navbar({
    open,
    setOpen
}: {
    open: boolean,
    setOpen: any,
}) {
    const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
    const location=useLocation()

    if (open) { }
    return (
        <header className=" w-full bg-[#FFFc] dark:bg-[#111] shadow-gray-100 dark:shadow-[#0008] backdrop-blur-md h-14 flex items-center sticky top-0 z-10 shadow-md  ">
            <nav className=" border-gray-200 px-4 lg:px-6 py-2.5  w-full">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center w-full gap-2">
                        <button  onClick={()=>setOpen(!open)}  className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer max-sm:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h14M1 6h14M1 11h7" /> </svg>
                        </button>
                        <Link to="/dashboard" className="flex mr-4">
                            <img src={ApiConfig.rootUrl + "/" + theme.theme.Logo} className="mr-3 h-5" alt="" />
                        </Link>
                        <div className="grow">

                        </div>
                        {

                            ["/dashboard","/orders"].includes(location.pathname)&&
                            <SelectPlatform/>
                            }
                        <ModeThemeButton/>
                        <button   className="text-2xl p-2 mr-2 text-gray-600 rounded cursor-pointer max-sm:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                            <IoIosNotifications />
                        </button>
                    </div>

                </div>
            </nav>
        </header>
    )
}
