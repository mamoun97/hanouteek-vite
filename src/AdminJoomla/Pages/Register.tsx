
import RegisterForm from '../components/RegisterForm'
import ContainerAuth from '../../Admin/components/ContainerAuth'

export default function Register() {
   
    return <ContainerAuth type='joomla'>
        <div className='max-w-lg w-full'>
            <RegisterForm />
        </div>
    </ContainerAuth>
}
