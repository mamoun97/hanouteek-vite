import { FC, InputHTMLAttributes } from "react";
import { Classes } from "../../Constants";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, CustomInput {

}
const TextEditor: FC<InputProps> = ({ id,type="text",inputClassName="", label, isValid = false, isError = null, ...att }) => {
    
    return (
        <div className="mt-2 w-full">
            <label  className="block mb-2 text-base font-semibold" id={id+"-label"}>
                {label}
            </label>
            <input

                className={`${Classes.input} h-12
                ${inputClassName}
                ${isValid ? " focus:!border-green-500 border-green-500 text-green-600 placeholder-green-400" : ""}
                ${isError ? " focus:!border-red-500 border-red-500 text-red-600 placeholder-red-400" : ""}`}
                id={id}
                name={id}
                {...att}
            />
            {isError ? <label className="block  text-sm font-normal text-red-600">
                {isError}
            </label> : ""}

        </div>
    )
}
export default TextEditor
