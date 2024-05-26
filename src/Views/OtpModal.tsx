
import { useTranslation } from 'react-i18next'
import { ActionIcon, Button, Modal, PinCode } from 'rizzui'
import OrderApi from '../Api/OrderApi'
import { useEffect, useState } from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'
import OtpTimer from './OtpTimer'
import { MdRestartAlt } from 'react-icons/md'
import ApiConfig from '../Api/ApiConfig'
import { RootState } from '../Store'
import { ThemeSetting } from '../Types/ThemeSetting'
import { useSelector } from 'react-redux'



type PropsType = {
    open: OtpModalOpen,
    setOpen: (e: any) => void,
    afterCahnge?: () => void
}

export default function OtpModal({ open, setOpen, afterCahnge = () => { } }: PropsType) {
    const { t } = useTranslation()
    const theme = useSelector<RootState>(state => state.theme) as ThemeSetting
    const [loading, setLoading] = useState(false)
    const [loadingSendOtp, setLoadingSendOtp] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [resend, setResend] = useState(false)
    const [piCokeKey, setPiCokeKey] = useState(1)
    const [error, setError] = useState("")
    const [errorSendOtp, setErrorSendOtp] = useState("")

    const [value, setValue] = useState<string>("")
    const confirm = () => {
        setError("")
        setLoading(true)
        OrderApi.confirmOtp(value).then(_ => {
            setIsValid(true)
            setLoading(false)

            afterCahnge()
        }).catch(err => {
            setLoading(false)
            setError((err.response ? err.response.data.message : err.message) || "something went wrong")
        })
    }
    const sendOtp = () => {

        // setLoadingSendOtp(true)
        // setErrorSendOtp("")
        // setTimeout(()=>{
        //     setResend(false)
        //     setLoadingSendOtp(false)
        // },2000)
        OrderApi.sendOtp(open.id).then(_ => {
            setResend(false)
            setLoadingSendOtp(false)
        }).catch(err => {
            setErrorSendOtp((err.response ? err.response.data.message : err.message) || "something went wrong")
            setLoadingSendOtp(false)
        })
    }
    useEffect(() => {
        sendOtp()
    }, [])


    return (
        <Modal isOpen={!!open} onClose={() => {

        }}>
            {isValid ?
                <div className="m-auto px-7 pt-6 pb-8 flex flex-col items-center gap-6 justify-center">
                    <IoCheckmarkCircleOutline className='text-green-500 w-32 h-32' />
                    <p className='text-center text-lg font-semibold'>
                        {t("otp_msg_success")}
                    </p>
                    <Button onClick={() => {
                        setOpen(null)
                    }}>{t("ok")} </Button>
                </div>
                : <div className="m-auto px-7 pt-6 pb-8">
                    <div className="flex justify-center flex-col items-center my-6 gap-4">
                        <img src={ApiConfig.rootUrl + "/" + theme.theme.Logo} alt="" className='h-6' />
                        <h1 className='text-4xl text-primary font-bold my-2'>OTP Verification</h1>
                        <p className='text-center text-lg font-medium leading-5  max-w-sm '>{(t("otp_msg") as string).replace("%DATA%", open.phone)}</p>
                    </div>
                    <div className='my-9 mb-0 max-sm:hidden' dir='ltr' key={piCokeKey}>
                        <PinCode size={"lg"}
                            dir="ltr"
                            type='number'
                            disabled={!!resend}
                            setValue={(e) => {
                                setError("")
                                setValue(e as string)
                            }}
                            variant='outline'
                            className='remove-arrow'
                            inputClassName='remove-arrow'
                            error={error}
                            autoFocus
                            length={6}
                        />
                    </div>
                    <div className='my-9 mb-0 hidden max-sm:block' dir='ltr' key={piCokeKey+1000}>
                        <PinCode size={"md"}
                            dir="ltr"
                            variant='outline'
                            type='number'
                            disabled={!!resend}
                            onFocusCapture={(e)=>{
                                console.log(e)
                            }}
                            setValue={(e) => {
                                setError("")
                                setValue(e as string)
                            }}
                            className='remove-arrow '
                            inputClassName='remove-arrow'
                            error={error}
                            autoFocus

                            length={6}
                        />
                    </div>

                    <div className="flex flex-col items-center text-base font-semibold my-9">

                        {
                            resend ?
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    <ActionIcon
                                        size='lg'
                                        isLoading={loadingSendOtp}
                                        rounded='full'
                                        variant="outline"
                                        onClick={() => {
                                            setError("")
                                            setPiCokeKey(piCokeKey+1)
                                            setValue("")
                                            sendOtp()
                                        }}>
                                        <MdRestartAlt className="w-5 h-5" />
                                    </ActionIcon>
                                    <span className='text-sm font-semibold'>{t("resend")}</span>
                                </div>
                                :
                                <OtpTimer duration={60} onExpire={() => {
                                    setError(t("timeout_resend"))
                                    setResend(true)
                                }} />
                        }
                        {
                            errorSendOtp != "" && <p className='text-red-700 text-center mt-2 text-sm font-medium'>
                                {errorSendOtp}
                            </p>
                        }

                    </div>
                    <div className="grid grid-cols-2 gap-2 ">
                        <Button onClick={() => {
                            confirm()
                        }} disabled={value.length != 6||!!resend} isLoading={loading} >{t("confirm")} </Button>
                        <Button disabled={loading} variant='outline' onClick={() => {
                            setOpen(null)
                        }}>{t("skip")} </Button>
                    </div>
                </div>}
        </Modal>
    )
}
