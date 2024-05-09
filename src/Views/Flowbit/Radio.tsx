import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string,
    type?: "radio" | "checkbox"
}
const cRadio = "w-4 h-4 border-gray-300 checked:bg-primary  focus:ring-primary focus:bg-primary "
const cCheck = "w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary"
const Radio: FC<InputProps> = ({ id, type = "radio", ...att }) => {
    return (
        <input
            id={id}
            name={id}
            type={type}
            className={type == "radio" ? cRadio : cCheck}
            {...att}

        />
    )
}
export default Radio



