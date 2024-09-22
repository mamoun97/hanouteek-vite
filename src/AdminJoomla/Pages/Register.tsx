
import { Toaster } from 'react-hot-toast'
import images from '../../assets'
import useLang from '../../hoock/useLang'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
    const { lang } = useLang()
    return (
        <div className="flex min-h-[100vh]" dir={lang == "ar" ? "rtl" : "ltr"}>
            <div className="h-full w-full max-w-md flex  py-10 items-center flex-col px-6 max-sm:px-4" >
                <div className='max-w-lg w-full'>
                    <RegisterForm />
                </div>
            </div>
            <div className='min-h-full  grow relative'>
                <div
                    className="bg-image sticky top-0 w-full   h-screen scale-95 rounded-3xl shadow-md"
                    style={{ backgroundImage: "url('" + images.bg_auth + "')" }}></div>
            </div>
            <Toaster position="bottom-center" />
        </div>
    )
}
