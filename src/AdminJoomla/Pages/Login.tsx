
import { Toaster } from 'react-hot-toast'
import images from '../../assets'
import useLang from '../../hoock/useLang'
import LoginForm from '../components/LoginForm'

export default function Login() {
    const { lang } = useLang()
    return (
        <div className="flex h-[100vh]" dir={lang == "ar" ? "rtl" : "ltr"}>
            <div className="h-full w-full max-w-md flex justify-center items-center flex-col px-6 max-sm:px-4" >
                <div className='max-w-lg w-full'>
                    <LoginForm />
                </div>
            </div>
            <div
                className="bg-cover bg-no-repeat bg-center grow h-full scale-95 rounded-3xl shadow-md"
                style={{ backgroundImage: "url('" + images.bg_auth + "')" }}></div>

            <Toaster position="bottom-center" />
        </div>
    )
}