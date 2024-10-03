import React from 'react'
import { ActionIcon, Input, Loader, NumberInput, Select, Text } from 'rizzui'
import { useGetWilayasService } from '../Api/Services';
import { MdClear } from 'react-icons/md';
import useLang from '../hoock/useLang';

type PropsType = {
    options: OptionsFilter,
    setOptions: (e: OptionsFilter) => void,
    setOpen:(e:boolean) => void
}
export default function JoomlaCategFilter({ options,setOpen, setOptions }: PropsType) {
    const { data: wilayas, isLoading: lodingWilaya } = useGetWilayasService();
    const { t } = useLang();
    return (
        <div className='py-4 px-5 flex flex-col gap-2'>
            <header className="flex items-center justify-between mb-6">
                <Text className='rizzui-title-h4 text-xl font-bold'>Filter</Text>
                <ActionIcon
                    size="sm"
                    variant="outline"
                    onClick={() => setOpen(false)}
                >
                    <MdClear
                        className="h-auto w-5"
                    />
                </ActionIcon>
            </header>
            <Select
                // label={t.wilaya}
                value={options.willaya}
                onChange={(e: any) => setOptions({ ...options, willaya: e })}
                placeholder={t.wilaya}
                options={
                    wilayas?.data.map((el, k) => ({ label: (k + 1) + " - " + el.name, value: el.name, item: el })) ?? []
                }
                {
                ...lodingWilaya ? {
                    suffix: <Loader />
                } :
                    options.willaya ? {
                        suffix: <MdClear onClick={(_) => setOptions({ ...options, willaya: null })} />
                    } : {}
                }


            />

            <NumberInput
                formatType="numeric"
                value={options.minPrice}
                onChange={(e) => {
                    setOptions({
                        ...options,
                        minPrice: parseInt(e.target.value.replace(/,/g, ""))
                    })
                }}
                displayType="input"
                placeholder={t.minPrice}
                customInput={Input as React.ComponentType<unknown>}
                thousandSeparator=","
                suffix="DZD"

            />


            <NumberInput
                className="grow"
                formatType="numeric"
                value={options.maxPrice}
                onChange={(e) => {
                    setOptions({
                        ...options,
                        maxPrice: parseInt(e.target.value.replace(/,/g, ""))
                    })
                }}
                placeholder={t.maxPrice}
                displayType="input"
                customInput={Input as React.ComponentType<unknown>}
                thousandSeparator=","

            />
            <Input
                className="grow"
                value={options.name??""}
                onChange={(e) => {
                    setOptions({
                        ...options,
                        name: e.target.value
                    })
                }}
                placeholder={"Supplier"}

            />
        </div>
    )
}
