import { useState ,useEffect,useRef} from "react";
import { IoIosArrowDown } from "react-icons/io";
import styled from "styled-components";


const DivC = styled.div<{ h: number }>`

.children{
    overflow: hidden;
   
    max-height: 0;
    transition: max-height .3s;
}
.open{
    max-height: ${props=>props.h}px;
}
@keyframes fadeIn {
  from {
    max-height: 0;
  }
  to {
    max-height: ${props=>props.h}px;
  }
}
.close{
    max-height: 0;
}
@keyframes fadeOut {
  from {
    max-height: ${props=>props.h}px;
  }
  to {
    max-height: 0;
  }
}
`
export default function Collapse({
    title,
    children,
    childClassName="",
    className="",
    defaultOpen=false,
}:{
    title:any,
    children?:any,
    childClassName?:string,
    className?:string,
    defaultOpen?:boolean
}) {

    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [height,setHeight]=useState(200)
    const refH=useRef<HTMLDivElement>(null)
    const calcHeight=()=>{
     
      let h=refH.current?.clientHeight??height
      if(h>height)
      setHeight(
        h
      )
    }
    useEffect(()=>{
      calcHeight()
    },[isOpen])
    return <DivC h={height}>
        <div className={"border overflow-hidden rounded-md bg-gray-100 "+className}>
            <div onClick={() => {setIsOpen(!isOpen);calcHeight()}} className="p-3 ps-4 pe-4   cursor-pointer flex items-center  hover:bg-gray-200">
                {title}
                <div className="grow"></div>
                <IoIosArrowDown className={" " + (isOpen ? "rotate-[-180deg]" : "")} />
            </div>
            <div className={` children ${isOpen ? '  open' : 'close'} `+childClassName}>
                <div className="ps-4 pe-4 pb-2" ref={refH}>
                {children}
                </div>
            </div>
        </div>
    </DivC>

}
