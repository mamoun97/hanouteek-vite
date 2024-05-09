const productLoading = <div className={`flex flex-col gap-3 animate-pulse items-center`}>
    <div className={`pt-[100%] bg-gray-200 w-full`}> </div>
    <div className={`h-5 rounded-lg bg-gray-200 min-w-[60%]`}> </div>
    <div className={`h-8 rounded-lg bg-gray-200 w-full`}> </div>
</div>

export default {
    cateroriesHanouteek: <>
        <div className={`col-span-1 relative pt-[70%] group animate-pulse`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 bg-gray-300`}> </div>
        </div>
        <div className={`col-span-1 relative pt-[70%] group animate-pulse`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 bg-gray-300`}> </div>
        </div>
        <div className={`col-span-1 relative pt-[70%] group animate-pulse`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 bg-gray-300`}> </div>
        </div>
        <div className={`col-span-1 relative pt-[70%] group animate-pulse`}>
            <div className={`absolute top-0 left-0 right-0 bottom-0 bg-gray-300`}> </div>
        </div>
    </>,
    categoriesMenu: <div className={` flex animate-pulse gap-3 flex-col`}>
        <div className={`h-3 rounded-lg bg-gray-200`}> </div>
        <div className={`h-5 rounded-lg bg-gray-200`}> </div>
        <div className={`h-5 rounded-lg bg-gray-200`}> </div>
        <div className={`h-5 rounded-lg bg-gray-200`}> </div>
        <div className={`h-5 rounded-lg bg-gray-200`}> </div>
        <div className={`h-5 rounded-lg bg-gray-200`}> </div>
        <div className={`h-5 rounded-lg bg-gray-200`}> </div>
    </div>,
    categoriesProducts: <div className="grid grid-cols-3 gap-3 max-md:grid-cols-2">
        {
            [1, 2, 3, 4, 5, 6].map((el, k) => {
                if (el) { }
                return <div className="col-span-1" key={k}>
                    {productLoading}
                </div>
            })
        }

    </div>,
    productPage: <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1 animate-pulse">
        <div className="col-span-1">
            <div className="pt-[100%] bg-gray-200 w-full"></div>
        </div>
        <div className="col-span-1 flex flex-col gap-3">
            <div className={`h-10 rounded-lg bg-gray-200`}> </div>
            <div className={`h-5 rounded-lg bg-gray-200 max-w-[120px]`}> </div>
            <div className={`h-5 rounded-lg bg-gray-200 max-w-[100px]`}> </div>
            <div className="flex gap-2 items-center">
                <div className="w-14 rounded-md h-8 bg-gray-200"></div>
                <div className="  rounded-md h-14 bg-gray-200 grow"></div>
            </div>
           
        </div>
    </div>


}