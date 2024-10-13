import { useSelector } from "react-redux"
import { RootState } from "../../Store"
import imgSrc from "../../utils/imgSrc"
import { useState } from 'react';
import { Button, Input, Loader, Password, Select } from 'rizzui';
import { useFormik } from 'formik';
import alertError from '../../hoock/alertError';
import { IoMdSave } from 'react-icons/io';
import UploadImageSingle from '../../Admin/components/UploadImageSingle';
import { useGetWilayasService } from '../../Api/Services';
import ProductApi from '../../Api/ProductApi';
import useSWR from 'swr';
import { ThemeSetting } from '../../Types/ThemeSetting';
import JoomlaApi from '../../Api/JoomlaApi';
import { useNavigate } from 'react-router-dom';
import useValidation from '../../hoock/Validation';
import useLang from '../../hoock/useLang';
import Container from "../../Views/Container";


type JoomlaUserInput = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  wilaya: { label: string, value: string, item?: Wilaya } | null,
  commune: { label: string, value: string, item?: Commune } | null,
  role: string,
  avatar: string,
  banner: string,
  password: string
};



export default function Profile() {
  const user = useSelector((state: RootState) => state.user) as SupplierAuth
  const [isLoading, setLoading] = useState(false);
  const theme = useSelector<ThemeSetting>(state => state.theme) as ThemeSetting
  const navigate = useNavigate()
  const { tr, t } = useLang()
  const validationSchema = useValidation({
    firstName: true,
    lastName: true,
    email: true,
    phone: true,
    wilaya: true,
    commune: true,
    password: true
  })
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      wilaya: { "label": user?.wilaya ?? "", "value": user?.wilaya ?? "" },
      commune: { label: user.commune, value: user.commune },
      role: "",
      avatar: "",
      password: "",
      banner: ""
    },
    validationSchema,
    onSubmit: async (values: JoomlaUserInput) => {
      setLoading(true);
      const { wilaya, commune, ...rest } = values;
      const payload = { ...rest, wilaya: wilaya?.value ?? "", commune: commune?.value ?? "" };
      try {
        let data = await JoomlaApi.signUpSaller(payload);

        navigate("/joomla-auth")
      } catch (error) {
        alertError(error);
      } finally {
        setLoading(false);
        // setModalState(false);
      }
    }
  });

  const register = (name: "email" | "firstName" | "lastName" | "phone" | "password" | "email" | "avatar" | "banner", label: string) => ({
    label,
    // suffix: formik.touched[name] ? (
    //     !!formik.errors[name] ? <IoIosInformationCircleOutline className='text-lg' /> : <IoMdCheckmark className='text-lg' />
    // ) : null,
    error: formik.touched[name] ? formik.errors[name] : "",
    value: formik.values[name],
    onChange: (e: any) => formik.setFieldValue(name, e.target.value),
    onBlur: (_: any) => {
      formik.setTouched({
        ...formik.touched,
        [name]: true
      })
    }
  });


  const { data: wilayas, isLoading: lodingWilaya } = useGetWilayasService();
  const { data: communes, isLoading: communeLoading } = useSWR(
    `/tenant/city-delivery/${formik.values.wilaya?.item?.id ?? 0}`,
    () => ProductApi.getCityDelivery(formik.values.wilaya?.item?.id ?? 0),
    {
      keepPreviousData: true,
    }
  )
  return (
    <div>
      <div className="relative bg-image h-44" style={{
        backgroundImage: "url('" + imgSrc(user.banner, true) + "')"
      }}>

      </div>
      <div className="flex items-end -translate-y-1/2 px-4 gap-4 max-[528px]:-translate-y-[56px] max-[528px]:flex-col max-[528px]:items-start">
        <div className=" border-white dark:border-[#202124]  bg-image border-4 h-32 w-32 max-[528px]:w-28 max-[528px]:h-28 rounded-full shadow-lg "
          style={{
            backgroundImage: "url('" + imgSrc(user.avatar, true) + "')"
          }}>
        </div>
        <div>
          <h1 className="rizzui-title-h2 capitalize mb-2 inline-flex items-center gap-3 text-xl font-bold ">
            {user.firstName +" "+user.lastName}
          </h1>
          <p className="rizzui-text-p font-normal text-sm ">Update your photo and personal details.</p>
        </div>
      </div>
      <div className=" -mt-12 grid-cols-3 p-4 ps-52 max-md:p-4">

        <div className="grid grid-cols-2 gap-2 mt-4 col-span-2">

          <Input
            placeholder={tr.auth.enter_first_name}
            className='col-span-1'
            {...register("firstName", tr.auth.first_name)} />
          <Input
            placeholder={tr.auth.enter_last_name}
            className='col-span-1'
            {...register("lastName", tr.auth.last_name)} />
          <Input
            placeholder={tr.auth.enter_email}
            className='col-span-1 max-sm:col-span-full'
            {...register("email", tr.auth.email)} type='email' />
          <Input
            placeholder={tr.auth.phone}
            className='col-span-1 max-sm:col-span-full'
            {...register("phone", tr.auth.phone)} />
          {/* <Password
            placeholder={tr.auth.enter_password}
            className='col-span-full'
            {...register("password", tr.auth.password)} /> */}
          <Select
            label={t.wilaya}
            error={formik.touched.wilaya ? formik.errors.wilaya : ""}
            value={formik.values.wilaya}
            onChange={(e: any) => {
              console.log(JSON.stringify(e))
              formik.setFieldValue("wilaya", e)
            }}
            className='col-span-1 max-sm:col-span-full'
            options={
              wilayas?.data.map((el, k) => ({ label: (k + 1) + " - " + el.name, value: el.name, item: el })) ?? []
            }
            onBlur={(_: any) => {
              formik.setTouched({
                ...formik.touched,
                wilaya: true
              })
            }}
            suffix={
              lodingWilaya ? <Loader /> : null
            }
          />
          <Select
            label={t.commune}
            error={formik.touched.commune ? formik.errors.commune : ""}
            value={formik.values.commune}
            onChange={(e: any) => formik.setFieldValue("commune", e)}
            className='col-span-1 max-sm:col-span-full'
            options={
              communes?.communes.map(el => ({ label: el.name, value: el.name })) ?? []
            }
            onBlur={(_: any) => {
              formik.setTouched({
                ...formik.touched,
                commune: true
              })
            }}
            suffix={
              communeLoading ? <Loader /> : null
            }
          />
          <div className="col-span-full flex justify-end">
            <Button disabled className="gap-2 min-w-[160px]">
              <IoMdSave className="text-lg "/>
              Save
            </Button>
          </div>


        </div>
      </div>

    </div >
  )
}
