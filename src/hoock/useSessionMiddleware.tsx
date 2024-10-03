import { useEffect } from 'react'
import { AppDispatch } from '../Store'
import { useDispatch } from 'react-redux'
import { loadData } from '../Store/localStorage'
import { SHA256 } from 'crypto-js'
import { useNavigate } from 'react-router-dom'
import { changeUser } from '../Store/authSlice'
type PropsType = {
    navUrl: string
}
export default function useSessionMiddleware(props: PropsType) {
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        let d = loadData("user")
        if (!d) return
        let oldMd5 = d?.md5

        delete d?.md5
        let newMd5 = SHA256(JSON.stringify(d) + import.meta.env.VITE_SEC_KEY).toString()
        if (newMd5 != oldMd5) {
            dispatch(changeUser(null))
            navigate(props.navUrl)
        }
    })
    return null
}
