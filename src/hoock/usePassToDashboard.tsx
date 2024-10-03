import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from '../Store'
import { SHA256 } from 'crypto-js'

type PropsType={
    children:React.ReactNode,
    authType:"supplier"|"user"|"client",
    navUrl:string
}
export default function PassToDashboard(
    props:PropsType
) {
    const userS = useSelector<RootState>((state) => state.user) as UserAuth
    const navigate=useNavigate()
    const [open,setOpen]=useState(false)
    useEffect(() => {
        let d = { ...userS }
        if (!!d.md5 && d.authType == props.authType) {
            let oldMd5 = d.md5
            delete d.md5
            let newMd5 = SHA256(JSON.stringify(d) + import.meta.env.VITE_SEC_KEY).toString()
            if (newMd5 == oldMd5) {
                navigate(props.navUrl)
            }else{
                setOpen(true)
            }
        }
        setOpen(true)

    }, [])
  return open?<div>
      {props.children}
    </div>:""
}
