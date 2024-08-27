import React from 'react'

export default function TableSimple({
    thead, tbody
}: {
    thead: React.ReactElement, tbody: React.ReactElement
}) {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full relative text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs !sticky top-0 text-gray-700 uppercase bg-transparent dark:text-gray-400">
                    {thead}
                </thead>
                <tbody className='relative'>
                    {tbody}
                </tbody>
            </table>
        </div>
    )
}
