import React from 'react'
import { Toaster } from 'react-hot-toast'
import useLang from '../../hoock/useLang'
import images from '../../assets'

type PropsType={
    type?:"associate"|"joomla",
    children:React.ReactNode
}
export default function ContainerAuth({type="associate",children}:PropsType) {
    const img=type=="joomla"?images.bg_auth:images.loginBackground
    const { lang } = useLang()
    return (
        <div className="flex min-h-[100vh]" dir={lang == "ar" ? "rtl" : "ltr"}>
            <div className="h-full w-full  min-h-screen max-w-md flex  py-10 items-center flex-col px-6 max-sm:px-4" >
                {children}
            </div>
            <div className='min-h-full  grow relative'>
                <div
                    className="bg-image sticky top-0 w-full   h-screen  shadow-md"
                    style={{ backgroundImage: "url('" + img + "')" }}></div>
            </div>
            <Toaster position="bottom-center" />
        </div>
    )
}
