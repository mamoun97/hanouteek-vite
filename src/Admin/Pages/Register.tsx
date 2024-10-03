import RegisterForm from '../components/RegisterForm'
import ContainerAuth from '../components/ContainerAuth'

export default function Register() {

    return <ContainerAuth>
        <div className='max-w-lg w-full bg-card p-4'>
            <RegisterForm />
        </div>
    </ContainerAuth>
}
