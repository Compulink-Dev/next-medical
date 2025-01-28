'use client'
import React, { useState } from 'react'
import Title from './Title';
import Image from 'next/image';

const Nurses = () => {
    const [activeNurse, setActiveNurse] = useState<number | null>(null);

    const nurses = [
        {
            id: 1,
            image: '/nurse1.jpg',
            name: 'Nurse 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 2,
            image: '/nurse2.jpg',
            name: 'Nurse 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 3,
            image: '/nurse3.jpg',
            name: 'Nurse 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 4,
            image: '/nurse3.jpg',
            name: 'Nurse 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        }
    ]

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <Title
                    title='Our Nurses'
                    subtitle='We have a dedicated team of nurses to care for our patients'
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {nurses.map((nurse) => (
                        <div
                            key={nurse.id}
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"
                            onClick={() => setActiveNurse(nurse.id)}
                        >
                            <Image width={100} height={100} className="w-full h-48 object-cover rounded-t-lg mb-4" src={nurse.image} alt={nurse.name} />
                            <div className="p-4">
                                <h4 className="text-lg font-bold mb-2">{nurse.name}</h4>
                            </div>
                        </div>
                    ))}
                </div>
                {activeNurse && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <Image width={100} height={100} className="w-full h-48 object-cover rounded-t-lg mb-4" src={`${nurses.find((nurse) => nurse.id === activeNurse)?.image}`} alt={`${nurses.find((nurse) => nurse.id === activeNurse)?.name}`} />
                            <h3 className="text-2xl font-bold mb-4">{nurses.find((nurse) => nurse.id === activeNurse)?.name}</h3>
                            <p className="text-lg mb-4">{nurses.find((nurse) => nurse.id === activeNurse)?.description}</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setActiveNurse(null)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Nurses