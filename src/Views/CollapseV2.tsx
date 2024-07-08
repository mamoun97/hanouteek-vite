import React from 'react'

export default function CollapseV2({
    className=""
}:{
    className?:string
}) {
    return (
        <section className={className}>
            <label>
                <input className="peer/showLabel absolute scale-0" type="checkbox" />
                <span className="block max-h-14 max-w-xs overflow-hidden rounded-lg bg-emerald-100 px-4 py-0 text-cyan-800 shadow-lg transition-all duration-300 peer-checked/showLabel:max-h-52">
                    <h3 className="flex h-14 cursor-pointer items-center font-bold">Expand & Collapse Me</h3>
                    <p className="mb-2">You've crafted a sleek collapsible panel using Tailwind CSS without the need for JavaScript. Impressive! 😎</p>
                </span>
            </label>
        </section>
    )
}
