import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Store'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from "next-themes";
import { ThemeProvider } from '../utils/ThemeProvider'
import { useThemeService } from '../Api/Services'
import { changeTheme } from '../Store/themeSlice'
import { LuArrowLeftToLine, LuArrowRightFromLine } from 'react-icons/lu'
import Navbar from './components/Navbar'
import Drower from './components/Drower';
import useGlobal from '../hoock/useGlobal';
import useSessionMiddleware from '../hoock/useSessionMiddleware';
export default function LayoutAdminJoomla({contentClassName="", children }: {
  children: React.ReactNode,contentClassName?:string
}) {

  useSessionMiddleware({navUrl:"/joomla-auth"})
  const [open, setOpen] = useState(false)
  const [openPos, setOpenPos] = useState(true)
  const navigate = useNavigate()

  const location = useLocation()
  const {  i18n } = useTranslation();
  const client = useSelector((state:RootState) => state.user) 
 
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!client?.id||client?.authType!="supplier") {
      navigate("/joomla-auth")
    }
  }, [])
  



  const global = useGlobal("?")
  const { data } = useThemeService(global)
  useEffect(() => {
    if (data) {
      dispatch(changeTheme(data))
      document.documentElement.style.setProperty('--primary-color', data.theme.Primary);
      document.documentElement.style.setProperty('--secondary-color', data.theme.Secondary);
    }
  }, [data])

  return (
    !(!client?.id||client?.authType!="supplier")? <ThemeProvider
    // key={global?.platform??'4'}
    >
      <TH >
        {
          client?.id ?
            <div className={(location.pathname.includes("order/edit") ? "" : "") + ' flex min-h-screen  '} dir={i18n.language == "ar" ? "rtl" : 'ltr'}>
              {openPos && <div className="w-64 min-w-[256px] max-sm:w-0 max-sm:min-w-0 ">
                <Drower {...{ open, setOpen }} />
              </div>}
              <div className='grow h-screen overflow-auto  bg-background dark:bg-[#202124]'>
                <Navbar {...{ open, setOpen }}
                  btnClose={
                    <button onClick={() => {
                      setOpenPos(!openPos)
                    }} className=" p-2 mr-3 max-sm:hidden text-gray-600 rounded cursor-pointer  hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                      {
                        (i18n.language != "ar" ? openPos : !openPos) ? <LuArrowLeftToLine className="w-5 h-5" /> :
                          <LuArrowRightFromLine className="w-5 h-5" />
                      }
                    </button>
                  } />
                <div className={"p-5 relative max-md:p-3 "+contentClassName}>
                  {children}
                </div>
              </div>
            </div>
            : ""
        }
      </TH>
    </ThemeProvider>:""
  )
}
function TH({ children }: {
  children: React.ReactNode
}) {
  const { theme, } = useTheme();
  useEffect(() => {

    document.getElementById("html")?.classList.remove("dark")
    document.getElementById("html")?.classList.remove("light")

    document.getElementById("html")?.classList.add(theme ?? "light")


  }, [theme])

  return <div className={theme ?? "light"} >
    {children}
  </div>
}
