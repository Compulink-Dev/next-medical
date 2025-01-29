'use client'
import React, { useState } from 'react'
import Title from './Title'
import Image from 'next/image'

const Services = () => {
    const [activeCard, setActiveCard] = useState(null)

    const cards = [
        {
            id: 1,
            image: '/assets/icons/crutches.svg',
            title: 'Crutches',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 2,
            image: '/assets/icons/patient.svg',
            title: 'X-ray',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 3,
            image: '/assets/icons/lungs.svg',
            title: 'Pulmonary',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 4,
            image: '/assets/icons/cardio.svg',
            title: 'Cardiology',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 5,
            image: '/assets/icons/dental.svg',
            title: 'Dental care',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 6,
            image: '/assets/icons/brain.svg',
            title: 'Neurology',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        }
    ]

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <Title
                    title='Our Services'
                    subtitle='We offer a wide range of services to meet your healthcare needs'
                />
                <div className="grid grid-cols-1 md:grid-cols-6 gap-8 justify-center">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`w-full p-4 rounded cursor-pointer ${activeCard === card.id ? 'bg-dark-400 text-white' : 'rounded shadow-xl'
                                }`}
                            //@ts-ignore
                            onClick={() => setActiveCard(card.id)}
                        >
                            <Image width={100} height={100} className="w-20 h-20 mr-4" src={card.image} alt={card.title} />
                            <h4 className="text-lg font-bold mb-2">{card.title}</h4>
                        </div>
                    ))}
                </div>
                {activeCard && (
                    <div className="mt-8">
                        {cards.map((card) => (
                            <div key={card.id}>
                                {activeCard === card.id && (
                                    <div className="flex items-center shadow-lg rounded-lg p-6 border border-dashed border-dark-400">
                                        <Image width={100} height={100} className="w-24 h-24 mr-4" src={card.image} alt={card.title} />
                                        <div>
                                            <h4 className="text-lg font-bold mb-2">{card.title}</h4>
                                            <p className="text-gray-400">{card.description}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Services