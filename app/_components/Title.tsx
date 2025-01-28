import Image from 'next/image'
import React from 'react'

function Title({ title, subtitle, textColor }: { title: string, subtitle: string, textColor?: string }) {
    return (
        <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold ${textColor}`}>{title}</h2>
            <div className="flex justify-center items-center mt-4">
                <div className="h-1 bg-gray-300 w-20"></div>
                <div className="mx-2">
                    <Image width={50} height={50} src="assets/icons/healthcare_logo.png" alt="icon" className="h-10 animate-pulse" />
                </div>
                <div className="h-1 bg-gray-300 w-20"></div>
            </div>
            <p className="mt-4 text-gray-600">
                {subtitle}
            </p>
        </div>
    )
}

export default Title