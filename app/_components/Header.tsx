'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Header = () => {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [headerBgColor, setHeaderBgColor] = useState('transparent')

    const router = useRouter()

    console.log(scrollPosition);


    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
            if (window.scrollY > 100) {
                setHeaderBgColor('#fff')
            } else {
                setHeaderBgColor('transparent')
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header className={`fixed top-0 z-50 left-0 w-full py-4 transition-all duration-300 ${headerBgColor === 'transparent' ? 'bg-transparent' : 'bg-[#1a1d21] shadow-md opacity-80'} h-[80px]`}>
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo">
                    <Link href="/">
                        <Image className="animate-pulse" src="/assets/icons/logo.png" alt="Logo" width={80} height={80} />
                    </Link>
                </div>
                <div className="flex items-center gap-4 cursor-pointer">
                    <nav className={`nav-links text-xs ${headerBgColor === 'transparent' ? 'text-white' : ' font-bold'}`}>
                        <ul className="flex items-center">
                            <li className="mr-6">
                                <Link href="/">
                                    <p>Home</p>
                                </Link>
                            </li>
                            <li className="mr-6">
                                <Link href="#about">
                                    <p>About</p>
                                </Link>
                            </li>
                            <li className="mr-6">
                                <Link href="#services">
                                    <p>Services</p>
                                </Link>
                            </li>
                            <li className="mr-6">
                                <Link href="#clinics">
                                    <p>Clinics</p>
                                </Link>
                            </li>
                            <li className="mr-6">
                                <Link href="#contact">
                                    <p>Contact</p>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Button
                            onClick={() => router.push('/login')}
                            variant={'outline'} className='hover:bg-slate-700'>
                            <p className="">Login</p>
                        </Button>
                        <Button
                            onClick={() => router.push('/register')}
                            variant="outline"
                            className='hover:bg-slate-900'
                        >
                            <p>Register</p>
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header