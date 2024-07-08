import { useSelector } from "react-redux"
import { RootState } from "../Store"
import { GlobalS } from "../Store/globalSlice"

export default function(op:"&"|"?"){
    const global = useSelector<RootState>((state) => state.global) as GlobalS
    return (global?.platform) ? op + global.platform : undefined
}