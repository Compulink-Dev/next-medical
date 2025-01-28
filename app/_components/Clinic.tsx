'use client'
import React, { useState } from 'react'
import Title from './Title';
import Image from 'next/image';

const Clinics = () => {
    const [activeClinic, setActiveClinic] = useState<number | null>(null);
    const clinics = [
        {
            id: 1,
            image: '/clinic1.jpg',
            name: 'Clinic 1',
            address: '123 Main St, Anytown, USA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 2,
            image: '/clinic2.jpg',
            name: 'Clinic 2',
            address: '456 Elm St, Anytown, USA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 3,
            image: '/clinic3.jpg',
            name: 'Clinic 3',
            address: '789 Oak St, Anytown, USA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 4,
            image: '/clinic3.jpg',
            name: 'Clinic 3',
            address: '789 Oak St, Anytown, USA',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        }

    ]

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <Title
                    title='Our Clinics'
                    subtitle='We have multiple clinics to serve our patients'
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4  gap-8">
                    {clinics.map((clinic) => (
                        <div
                            key={clinic.id}
                            className="bg-white shadow-md rounded-lg p-4 cursor-pointer"

                            onClick={() => setActiveClinic(clinic.id)}
                        >
                            <Image width={80} height={80} className="w-full h-48 object-cover rounded-t-lg" src={clinic.image} alt={clinic.name} />
                            <div className="p-4">
                                <h4 className="text-lg font-bold mb-2">{clinic.name}</h4>
                                <p className="text-lg">{clinic.address}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {activeClinic && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <Image width={80} height={80} className="w-full h-48 object-cover rounded-t-lg mb-4" src={`${clinics.find((clinic) => clinic.id === activeClinic)?.image}`} alt={`${clinics.find((clinic) => clinic.id === activeClinic)?.name}`} />
                            <h3 className="text-2xl font-bold mb-4">{clinics.find((clinic) => clinic.id === activeClinic)?.name}</h3>
                            <p className="text-lg mb-4">{clinics.find((clinic) => clinic.id === activeClinic)?.description}</p>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setActiveClinic(null)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Clinics