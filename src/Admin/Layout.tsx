import React, { useEffect, useState } from 'react'
import Drower from './components/Drower'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../Store'
import { useLocation, useNavigate } from 'react-router-dom'
import sha256 from 'crypto-js/sha256';
import { changeUser } from '../Store/authSlice'
import { loadData } from '../Store/localStorage'
import { useTranslation } from 'react-i18next'
import { useTheme } from "next-themes";
import { ThemeProvider } from '../utils/ThemeProvider'
import { GlobalS } from '../Store/globalSlice'
import { useThemeService } from '../Api/Services'
import { changeTheme } from '../Store/themeSlice'
export default function LayoutAdmin({ children }: {
  children: React.ReactNode
}) {

  const global = useSelector<RootState>((state) => state.global) as GlobalS

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const location = useLocation()
  const { t: _, i18n } = useTranslation();
  const user = useSelector<RootState>((state) => state.user) as UserAuth
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (!user?.id) {
      navigate("/admin")
    }
    setTimeout(() => {
      document.body.dir = "ltr"

      i18n.changeLanguage("fr")
    }, 3000)
  }, [])
  useEffect(() => {
    let d = loadData("user")
    let oldMd5 = d.md5

    delete d.md5
    let newMd5 = sha256(JSON.stringify(d) + import.meta.env.VITE_SEC_KEY).toString()
    if (newMd5 != oldMd5) {
      dispatch(changeUser(null))
      navigate("/admin")
    }
  })




  const { data } = useThemeService(global?.platform?"?"+global?.platform:undefined)
  useEffect(()=>{
    if (data) {
      console.log(data)
      dispatch(changeTheme(data))
      document.documentElement.style.setProperty('--primary-color', data.theme.Primary);
      document.documentElement.style.setProperty('--secondary-color', data.theme.Secondary);
    }
  },[data])

  return (
    <ThemeProvider
    // key={global?.platform??'4'}
    >
      <TH >
        {
          user?.id ?
            <div className={(location.pathname.includes("order/edit") ? "" : "") + ' flex min-h-screen  '} dir='ltr'>
              <div className="w-64 min-w-[256px] max-sm:w-0 max-sm:min-w-0 ">
                <Drower {...{ open, setOpen }} />
              </div>
              <div className='grow h-screen overflow-auto'>
                <Navbar {...{ open, setOpen }} />
                <div className="p-5 relative max-md:p-3">
                  {children}
                </div>
              </div>
            </div>
            : ""
        }
      </TH>
    </ThemeProvider>
  )
}
function TH({ children }: {
  children: React.ReactNode
}) {
  const { theme, } = useTheme();
  useEffect(() => {


    let th = getMode()
    document.getElementById("html")?.classList.remove("dark")
    document.getElementById("html")?.classList.remove("light")
    document.getElementById("html")?.classList.add(th)

  }, [theme])
  const getMode = () => {
    let i = window.matchMedia("(prefers-color-scheme: dark)").matches
    let th = theme == "system" ? (i ? "dark" : "light") : theme ?? ""
    return th
  }
  return <div className={getMode() == "dark" ? 'dark' : ""} key={getMode()}>
    {children}
  </div>
}
