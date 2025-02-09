'use client'
import React from 'react'
import { redirect } from 'next/navigation'

function SelectCard({ children, name, userId, type }: any) {
    const handleSelection = (role: any) => {
        if (userId) {
            redirect(`/${role}/${userId}/register`);
        } else {
            alert("User ID is missing.");
        }
    };
    return (
        <div
            onClick={() => handleSelection(`${type}`)}
            className="cursor-pointer border w-[300px] h-[300px] rounded flex flex-col items-center justify-center"
        >
            {children}
            <p className="">{name}</p>
        </div>
    )
}

export default SelectCard