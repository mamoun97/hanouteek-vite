
import moment from "moment";
import { MdHistory } from "react-icons/md";
import { ActionIcon, Popover } from "rizzui";
import statesColor from "../Const/statesColor";




export default function TimeLine({ data }: { data: OrderFull }) {

    return (
        <Popover placement="left" >
            <Popover.Trigger>

                <ActionIcon variant="text" className="text-green-500">

                    <MdHistory className="w-5 h-5 min-w-[20px]" />

                </ActionIcon>

            </Popover.Trigger>
            <Popover.Content className="p-4 max-h-60 overflow-auto" >
                {({ }) => (
                    <div className=" flex flex-col gap-2 w-full" dir="ltr">
                        <h1 className="text-sm font-semibold">Order (#{data.id}) History</h1>
                      
                        <ol className="relative border-s border-gray-200 dark:border-gray-700">

                            {
                                data.states.map((el, i) => {
                                    return <li className="mb-10 ms-4" key={i}>
                                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                        <time className="mb-2 text-sm  leading-none text-gray-400 dark:text-gray-500 font-semibold">{moment(el.created_at).format("yyyy-MM-DD HH:mm")}</time>
                                        <div className="mt-2">
                                            <span
                                                className={" whitespace-nowrap text-center capitalize rounded-full p-1 px-2 cursor-pointer w-auto  text-[13px] font-semibold border py-1 !text-[" + statesColor[el?.state ?? ""] + "]"}
                                                style={{
                                                    color: statesColor[el?.state ?? ""],
                                                    borderColor: statesColor[el?.state ?? ""] + "26",
                                                    backgroundColor: statesColor[el?.state ?? ""] + "22"
                                                }} >
                                                {el.state}
                                            </span>
                                        </div>

                                    </li>
                                })
                            }

                        </ol>
                    </div>
                )}
            </Popover.Content>
        </Popover>
    );
}

