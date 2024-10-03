

import LoginForm from '../components/LoginForm'
import LangButton from '../../Admin/components/LangButton'
import ContainerAuth from '../../Admin/components/ContainerAuth'
import PassToDashboard from '../../hoock/usePassToDashboard'

export default function Login() {
    return (
        <PassToDashboard authType='supplier' navUrl='/joomla-admin/dashboard'>
            <ContainerAuth type='joomla'>
                <>
                    <div className="grow"></div>
                    <div className='max-w-lg w-full'>
                        <LoginForm />
                    </div>
                    <div className="grow"></div>
                    <div className="my-2">
                        <LangButton />
                    </div>
                    <div className="text-sm mb-3" dir="ltr">
                        All rights reserved by <a href="https://devgate.net/" target="_blank" className="ms-1"> Devgate</a> © 2024..
                    </div>
                </>
            </ContainerAuth>
        </PassToDashboard>
    )
}