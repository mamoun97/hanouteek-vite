
import { useTranslation } from 'react-i18next'
import { Button, Modal, PinCode } from 'rizzui'
import OrderApi from '../Api/OrderApi'
import { useState } from 'react'
import { IoCheckmarkCircleOutline } from 'react-icons/io5'


type PropsType = {
    open: string,
    setOpen: (e: any) => void
}
export default function OtpModal({ open, setOpen }: PropsType) {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [error, setError] = useState("")

    const [value, setValue] = useState("")
    const confirm = () => {
        setError("")
        setLoading(true)
        OrderApi.confirmOtp(value).then(_ => {
            setIsValid(true)
            setLoading(false)
        }).catch(_ => {
            setLoading(false)
            setError("otp error")
        })
    }
    return (
        <Modal isOpen={!!open} onClose={() => {

        }}>
            {isValid ?
                <div className="m-auto px-7 pt-6 pb-8 flex flex-col items-center gap-6 justify-center">
                    <IoCheckmarkCircleOutline className='text-green-500 w-32 h-32' />
                    <p className='text-center text-lg font-semibold'>
                        {t("otp_msg_success")}
                    </p>
                    <Button  onClick={() => {
                        setOpen("")
                    }}>{t("cancel")} </Button>
                </div>
                : <div className="m-auto px-7 pt-6 pb-8">
                    <p className='text-center text-lg font-semibold'>{(t("otp_msg") as string).replace("%DATA%", open)}</p>
                    <div className='my-9' dir='ltr'>
                        <PinCode size={"lg"}
                            dir="ltr"
                            type='number'
                            setValue={(e) => {
                                setError("")
                                setValue(e as string)
                            }}
                            className='remove-arrow'
                            inputClassName='remove-arrow'
                            error={error}
                            autoFocus
                            length={6}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2 ">
                        <Button onClick={() => {
                            confirm()
                        }} disabled={value.length != 6} isLoading={loading} >{t("confirm")} </Button>
                        <Button disabled={loading} variant='outline' onClick={() => {
                            setOpen("")
                        }}>{t("skip")} </Button>
                    </div>
                </div>}
        </Modal>
    )
}
