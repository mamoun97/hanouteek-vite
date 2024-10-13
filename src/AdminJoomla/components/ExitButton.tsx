import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../Store';
import { ActionIcon } from 'rizzui';
import { changeUser } from '../../Store/authSlice';
import { LuLogOut } from 'react-icons/lu';

export default function ExitButton() {
    const navigate = useNavigate()


    const dispatch: AppDispatch = useDispatch();
    return (
        <>
            <ActionIcon variant='text' onClick={() => {

                dispatch(changeUser(null))
                navigate("/joomla-auth")
            }}>
                <LuLogOut className="text-lg" />
               
            </ActionIcon>
        </>
    )
}
