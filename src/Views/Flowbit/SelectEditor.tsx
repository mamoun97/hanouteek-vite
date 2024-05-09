
import { FC, ReactNode, SelectHTMLAttributes } from "react";
import { Classes } from "../../Constants";

interface InputProps extends SelectHTMLAttributes<HTMLSelectElement>,CustomInput {
    children:ReactNode
}
const SelectEditor: FC<InputProps> = ({children, label,value, isValid = false, isError = null, id, ...att }) => {
    return (
        <div className="mt-2 w-full" >
            <label  className="block mb-2 text-base font-semibold" id={id+"-label"}>
                {label}
            </label>

            <select className={`${Classes.input} h-12 group
                ${isValid ? " focus:!border-green-500 border-green-500 text-green-600" : ""}
                ${isError ? " focus:!border-red-500 border-red-500 text-red-600" : ""}
                ${value==""?"!text-gray-500":""}
                `}
                id={id}
                value={value}
                name={id}
                {...att}>

                {children}
            </select>
            {isError?<label className="block  text-sm font-normal text-red-600">
                {isError}
            </label>:""}
        </div>
    )
}
export default SelectEditor
