
import * as Yup from 'yup';
import useLang from './useLang';

type PropsType = {
    firstName?: boolean,
    lastName?: boolean,
    email?: boolean,
    phone?: boolean,
    phoneNumber?: boolean,
    address?: boolean,
    password?: boolean,
    wilaya?: boolean,
    commune?: boolean,
}
export default function useValidation(data: PropsType) {
    const { tr} = useLang()
    const t=tr.global.validation
    return Yup.object ({
        ...!!data.firstName ? { firstName: Yup.string().required(t.fname_req) } : {},
        ...!!data.lastName ? { lastName: Yup.string().required(t.lname_req) } : {},
        ...!!data.email ? { email: Yup.string().email(t.email_err).required(t.email_req) } : {},
        ...!!data.phone ? { phone: Yup.string().matches(/^0[567][0-9]{8}$/, t.phone_err).required(t.phone_req) } : {},
        ...!!data.address ? { address: Yup.string().required(t.address_req) } : {},
        ...!!data.password ? { password: Yup.string().required(t.password_req) } : {},
        ...!!data.wilaya ? { wilaya: Yup.object().nullable().required(t.wilaya_req) } : {},
        ...!!data.commune ? { commune: Yup.object().nullable().required(t.commune_req) } : {},
    })
}
