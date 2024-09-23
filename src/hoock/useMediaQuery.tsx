import { useEffect, useState } from 'react'

export default function useMediaQuery() {
    const [width, setWidth] = useState(window.innerWidth)
    function handleResize() {
        setWidth(window.innerWidth)
        // console.log(window.innerWidth)
    }
    useEffect(() => {


        window.addEventListener('resize', handleResize)
        return ()=>{
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    return { width }
}
