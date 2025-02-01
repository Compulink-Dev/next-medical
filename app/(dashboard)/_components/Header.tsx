"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Activity, CalendarCheck, ClipboardPlus, Hospital, Pill, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/providers/AuthProvider";
import { usePathname } from "next/navigation";

function Header() {
    const { user, logout } = useAuth(); // Get user and logout function
    const pathname = usePathname();


    // Check if the current pathname starts with the given path
    const isActive = (path: string) => pathname.startsWith(path);

    // Extract initials from user's name
    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    // Check if the user's label is either "nurse" or "doctor"
    //@ts-ignore
    const isHealthcareProvider = user?.label === "nurse" || user?.label === "doctor";

    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14 pt-8">
            <header className="admin-header flex justify-between items-center px-4">
                <Link href="/dashboard" className="cursor-pointer">
                    <Image
                        src="/assets/icons/healthcare_logo.png"
                        height={32}
                        width={162}
                        alt="logo"
                        className="h-14 w-fit animate-pulse"
                    />
                </Link>

                <div className="flex gap-10 items-center">

                    {/* Conditionally render the Medicines Management link for nurse or doctor */}
                    {isHealthcareProvider && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={'/dashboard/patients'} className="cursor-pointer">
                                        <Users
                                            className={
                                                isActive('/dashboard/patients') ? 'text-slate-900' : 'text-slate-300'
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
                    )}

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/dashboard/appointments'} className="cursor-pointer">
                                    <CalendarCheck
                                        className={
                                            isActive('/dashboard/appointments')
                                                ? 'text-slate-900' : 'text-slate-300'
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
                                <Link href={'/dashboard/health'} className="cursor-pointer">
                                    <Activity
                                        className={
                                            isActive('/dashboard/health') ? 'text-slate-900' : 'text-slate-300'
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

                    {/* Conditionally render the Medicines Management link for nurse or doctor */}
                    {isHealthcareProvider && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={'/dashboard/medicines'} className="cursor-pointer">
                                        <Pill
                                            className={
                                                isActive('/dashboard/medicines') ? 'text-slate-900' : 'text-slate-300'
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
                    )}

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/dashboard/clinics'} className="cursor-pointer">
                                    <Hospital
                                        className={
                                            isActive('/dashboard/clinics') ? 'text-slate-900' : 'text-slate-300'
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

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link href={'/dashboard/reports'} className="cursor-pointer">
                                    <ClipboardPlus
                                        className={
                                            isActive('/dashboard/reports') ? 'text-slate-900' : 'text-slate-300'
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

                    {/* Conditionally render the Medicines Management link for nurse or doctor */}
                    {!isHealthcareProvider && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Link href={'/dashboard/patients'} className="cursor-pointer">
                                        <Users
                                            className={
                                                isActive('/dashboard/patients') ? 'text-slate-900' : 'text-slate-300'
                                            }
                                            size={20}
                                        />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-white">Profile</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}

                    {/* User Avatar */}
                    {user && (
                        <div className="flex items-center gap-4 cursor-pointer">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="bg-dark-400 font-bold cursor-pointer">
                                        <AvatarImage src={``} alt={user.name} />
                                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-dark-400">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="cursor-pointer">
                                            Profile
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer">
                                            Settings
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    )}
                </div>
            </header>
        </div>
    );
}

export default Header;
