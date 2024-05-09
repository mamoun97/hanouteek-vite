import {  HTMLAttributes, ReactNode } from "react";

interface InputProps extends HTMLAttributes<HTMLDivElement> {
  className?:string,
  children:ReactNode
}

export default function Container({className="",children}:InputProps) {
  return (
    <div   className={"mx-auto container px-2 max-w-[1080px] max-md:max-w-[980px] "+className }>
      {children}
    </div>
  )
}
