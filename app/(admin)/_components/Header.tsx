'use client';

import {
    Activity,
    CalendarCheck,
    ClipboardPlus,
    Hospital,
    Pill,
    Users,
} from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

function Header() {
    const pathname = usePathname();

    // Check if the current pathname starts with the given path
    const isActive = (path: string) => pathname.startsWith(path);

    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14 pt-8">
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
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/admin/patients'} className="cursor-pointer">
                                    <Users
                                        className={
                                            isActive('/admin/patients') ? 'text-white' : 'text-slate-900'
                                        }
                                        size={20}
                                    />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-white">Patients</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/admin/appointments'} className="cursor-pointer">
                                    <CalendarCheck
                                        className={
                                            isActive('/admin/appointments')
                                                ? 'text-white'
                                                : 'text-slate-900'
                                        }
                                        size={20}
                                    />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-white">Appointments</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/admin/health'} className="cursor-pointer">
                                    <Activity
                                        className={
                                            isActive('/admin/health') ? 'text-white' : 'text-slate-900'
                                        }
                                        size={20}
                                    />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-white">Health Surveillance</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/admin/medicines'} className="cursor-pointer">
                                    <Pill
                                        className={
                                            isActive('/admin/medicines') ? 'text-white' : 'text-slate-900'
                                        }
                                        size={20}
                                    />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-white">Medicines Management</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/admin/reports'} className="cursor-pointer">
                                    <ClipboardPlus
                                        className={
                                            isActive('/admin/reports') ? 'text-white' : 'text-slate-900'
                                        }
                                        size={20}
                                    />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-white">Reports</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/admin/clinics'} className="cursor-pointer">
                                    <Hospital
                                        className={
                                            isActive('/admin/clinics') ? 'text-white' : 'text-slate-900'
                                        }
                                        size={20}
                                    />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-white">Clinics Synergy</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </header>
        </div>
    );
}

export default Header;
