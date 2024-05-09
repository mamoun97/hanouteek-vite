import { FC, TextareaHTMLAttributes } from "react";
import { Classes } from "../../Constants";

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> ,CustomInput{
    
}
const Textarea: FC<InputProps> = ({ label, id,isError=null,isValid=false, ...att }) => {
    return (
        <div className="mt-2 w-full">
            <label  className="block mb-2 text-base font-semibold" id={id+"-label"}>
                {label}
            </label>

            <textarea
                rows={4}
                id={id}
                className={`${Classes.input}
                ${isValid?" focus:!border-green-500 border-green-500 text-green-600":""}
                ${isError?" focus:!border-red-500 border-red-500 text-red-600":""}`}
                name={id}
                {...att}
            ></textarea>
            {isError?<label className="block  text-sm font-normal text-red-600">
                {isError}
            </label>:""}


        </div>
    )
}


export default Textarea
