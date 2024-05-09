
export default function IconButton({ onClick=null, children,className="" }:
 { onClick?: any, children:any,className?:string }) {
  return (
    <div className={"p-2 cursor-pointer flex items-center justify-center rounded-full bg-transparent hover:bg-gray-100 "+className} onClick={onClick}>
      {children}
    </div>
  )
}
