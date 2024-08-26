import { useState } from 'react'
import { Input, Loader } from "rizzui";
import { useGetAllProductsByNameServiceAssociate } from '../../Api/Services';
import ApiConfig from '../../Api/ApiConfig';
import useClickOutside from '../../hoock/ClickOutSide';
import { MdSearch } from 'react-icons/md';
import useGlobal from '../../hoock/useGlobal';
import imgSrc from '../../utils/imgSrc';



export default function ProductSelect({ setValue = () => { }, nameProduct = "", isSearch = false }: { isSearch?: boolean, nameProduct?: string, setValue?: any }) {
    const [name, setName] = useState(nameProduct);
    
    const global=useGlobal("&")
    const [open, setOpen] = useState(false);
    const clickOutsideRef = useClickOutside({
        onOutsideClick: () => {
            setOpen(false)
        }
    });
    const { data, isLoading, error: _ } = useGetAllProductsByNameServiceAssociate(name,global)
    return (
        <div className={"w-full"} ref={clickOutsideRef}>

            <Input
                label="Select Product"
                value={name}
                type='text'
                {...isSearch ? {
                    clearable: true,
                    onClear: () => {
                        setName("")
                        setValue(null)
                    }
                } : {}}

                prefix={<MdSearch className="w-5 h-5" />}
                onFocus={() => setOpen(true)}
                placeholder='Select product'
                onChange={(e) => { setName(e.target.value) }}
            />

            {open && <div className='relative z-20'>
                <div className="p-4 max-h-60 overflow-auto absolute top-1 left-0 right-0 rounded-md bg-white dark:bg-[#222]  shadow dark:shadow-gray-500">

                    {
                        data?.data.map((el, k) => {
                            return <div key={k} className="flex items-center cursor-pointer p-1" onClick={() => {
                                setOpen(false)
                                // setValue(null)
                                setName(el.name)
                                setValue(el)
                            }}>
                                <div className="h-7 w-7 min-w-[28px] rounded-full bg-center bg-cover bg-no-repeat"
                                    style={{ backgroundImage: "url('" + imgSrc(el.images[0],true) + "')" }}></div>
                                <div className="me-2"></div>
                                <h1 className='text-sm font-semibold'>{el.name}</h1>
                            </div>

                        })
                    }
                    {
                        data?.data.length === 0 && <div className='flex justify-center items-center h-24'>
                            No Product
                        </div>
                    }
                    {
                        isLoading && <div className='flex justify-center items-center h-24'>
                            <Loader size="lg" variant="spinner" color="primary" />
                        </div>
                    }

                </div>
            </div>}
        </div>
    );
}

