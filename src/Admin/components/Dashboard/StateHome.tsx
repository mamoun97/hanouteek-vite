
export default function StateHome({title,subTitle,icon,iconClassName=""}:{
    title:string,subTitle:string,icon:any,iconClassName:string
}) {
  return (
    <div className='flex gap-2'>
      <div className={"h-12 w-12 min-w-[48px] rounded-full text-3xl flex items-center justify-center "+iconClassName}>
      {icon}
      </div>
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm font-semibold">{subTitle}</p>
      </div>
    </div>
  )
}
