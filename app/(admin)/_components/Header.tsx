import { Activity, CalendarCheck, ClipboardPlus, Hospital, Mail, Pill, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14 pt-8'>
            <header className="admin-header">
                <Link href="/admin" className="cursor-pointer">
                    <Image
                        src="/assets/icons/healthcare_logo.png"
                        height={32}
                        width={162}
                        alt="logo"
                        className="h-14 w-fit"
                    />
                </Link>

                <div className="flex gap-10">
                    <Link href={'/admin/patients'} className="cursor-pointer">
                        <Users size={20} />
                    </Link>
                    <Link href={'/admin/appointments'} className="cursor-pointer">
                        <CalendarCheck size={20} />
                    </Link>
                    <Link href={'/admin/health'} className="cursor-pointer">
                        <Activity size={20} />
                    </Link>
                    <Link href={'/admin/medicines'} className="cursor-pointer">
                        <Pill size={20} />
                    </Link>
                    <Link href={'/admin/reports'} className="cursor-pointer">
                        <ClipboardPlus size={20} />
                    </Link>
                    <Link href={'/admin/clinics'} className="cursor-pointer">
                        <Hospital size={20} />
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header