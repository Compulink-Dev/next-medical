import React from 'react'
import Title from './Title'
import Image from 'next/image'


const TestimonialCard = ({ imageUrl, name, role, description }: any) => {
    return (
        <div className="bg-dark-700 shadow-lg rounded-lg p-6 flex flex-col text-center w-80">
            <div className="flex justify-center">
                <Image width={100} height={100} src={`${imageUrl}` || '/'} alt={name} className="rounded-full w-20 h-20 mb-4" />
            </div>
            <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
            <p className="mt-4 text-gray-600">
                {description}
            </p>
            <div className="text-blue-500 mt-4">
                <i className="fas fa-quote-right"></i>
            </div>
        </div>
    )
}

function Testimonials() {
    return (
        <div>
            <section>
                <div className="py-24 lg:py-20 bg-gray-100">
                    <div className="container mx-auto px-4">

                        <Title
                            textColor='text-gray-800'
                            title='What people say?'
                            subtitle='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
                        />
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-center space-x-4 overflow-hidden">
                            <TestimonialCard
                                imageUrl="/assets/icons/avatar1.png"
                                name="Ralph Jones"
                                role="UX Designer"
                                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            />
                            <TestimonialCard
                                imageUrl="/assets/icons/avatar1.png"
                                name="Francis Jara"
                                role="Biographer"
                                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            />
                            <TestimonialCard
                                imageUrl="/assets/icons/avatar1.png"
                                name="David Baer"
                                role="Executive"
                                description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                            />
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Testimonials