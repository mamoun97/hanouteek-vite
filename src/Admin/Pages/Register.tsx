
import { Toaster } from 'react-hot-toast'
import images from '../../assets'
import useLang from '../../hoock/useLang'
import RegisterForm from '../components/RegisterForm'

export default function Register() {
    const { lang } = useLang()
    return (
        <div className="flex min-h-[100vh]" dir={lang == "ar" ? "rtl" : "ltr"}>
            <div className="h-full w-full max-w-md flex  py-10 items-center flex-col px-6 max-sm:px-4" >
                <div className='max-w-lg w-full bg-card p-4'>
                    <RegisterForm />
                </div>
            </div>
            <div className='min-h-full  grow relative'>
                <div
                    className="bg-image sticky top-0 w-full   h-screen  shadow-md"
                    style={{ backgroundImage: "url('" + images.loginBackground + "')" }}></div>
            </div>
            <Toaster position="bottom-center" />
        </div>
    )
}
