'use client'
import React, { useState } from 'react'
import Title from './Title';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

const Nurses = () => {
    const [activeNurse, setActiveNurse] = useState<{
        id: number;
        image: string;
        name: string;
        description: string;
    } | null>(null);

    const nurses = [
        {
            id: 1,
            image: '/nurse1.jpg',
            name: 'Nurse 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 2,
            image: '/nurse2.jpg',
            name: 'Nurse 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 3,
            image: '/nurse3.jpg',
            name: 'Nurse 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 4,
            image: '/nurse4.jpg',
            name: 'Nurse 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ];

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <Title title="Our Nurses" subtitle="We have a dedicated team of nurses to care for our patients" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {nurses.map((nurse) => (
                        <div
                            key={nurse.id}
                            className="bg-dark-400 shadow-md rounded-lg p-4 cursor-pointer"
                            onClick={() => setActiveNurse(nurse)}
                        >
                            <Image width={100} height={100} className="w-full h-48 object-cover rounded-t-lg mb-4" src={nurse.image} alt={nurse.name} />
                            <div className="p-4">
                                <h4 className="text-lg font-bold mb-2">{nurse.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal using shadcn UI */}
                <Dialog open={!!activeNurse} onOpenChange={() => setActiveNurse(null)}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{activeNurse?.name}</DialogTitle>
                            <DialogDescription>{activeNurse?.description}</DialogDescription>
                        </DialogHeader>
                        <Image width={100} height={100} className="w-full h-48 object-cover rounded-t-lg mb-4" src={activeNurse?.image ?? "/fallback.jpg"} alt={activeNurse?.name ?? "Nurse"} />
                        <Button variant="outline" onClick={() => setActiveNurse(null)}>Close</Button>
                    </DialogContent>
                </Dialog>
            </div>
        </section>
    )
}

export default Nurses;
