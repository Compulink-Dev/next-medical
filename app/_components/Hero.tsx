import { Button } from '@/components/ui/button'
import React from 'react'

const Hero = () => {
    return (
        <div id='#hero' className="h-screen w-full bg-cover bg-top bg-no-repeat" style={{ backgroundImage: `url('/assets/images/onboarding-img.png')` }}>
            <div className="bg-black bg-opacity-50 h-screen flex items-center">
                <div className=" text-white grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="container px-4 py-8">
                        <h1 className="text-4xl font-bold mb-4">Welcome to Our Medical Center</h1>
                        <p className="text-lg mb-8">We provide high-quality medical care to our patients with compassion and dedication.</p>
                        <Button variant={'outline'}>Learn More</Button>
                    </div>
                    <div className=""></div>
                </div>
            </div>
        </div>
    )
}

export default Hero