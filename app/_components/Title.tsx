import Image from 'next/image'
import React from 'react'

function Title({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold text-slate-900`}>{title}</h2>
            <div className="flex justify-center items-center mt-4">
                <div className="h-1 bg-gray-500 w-20"></div>
                <div className="mx-2">
                    <Image width={70} height={70} src="/assets/icons/logo.png" alt="icon" className="h-10 animate-pulse" />
                </div>
                <div className="h-1 bg-gray-500 w-20"></div>
            </div>
            <p className="mt-4 text-color">
                {subtitle}
            </p>
        </div>
    )
}

export default Title