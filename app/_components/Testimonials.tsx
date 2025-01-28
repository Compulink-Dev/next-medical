import React from 'react'
import Title from './Title'
import Image from 'next/image'

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
                        <div className="flex space-x-4 overflow-hidden">


                            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col text-center w-80">
                                <div className="flex justify-center">
                                    <Image width={100} height={100} src="assets/icons/avatar2.png" alt="Ralph Jones" className="rounded-full w-20 h-20 mb-4" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">Ralph Jones</h4>
                                <p className="text-sm text-gray-500">UX Designer</p>
                                <p className="mt-4 text-gray-600">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </p>
                                <div className="text-blue-500 mt-4">
                                    <i className="fas fa-quote-right"></i>
                                </div>
                            </div>


                            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col text-center w-80">
                                <div className="flex justify-center">
                                    <Image width={100} height={100} src="assets/icons/avatar3.png" alt="Francis Jara" className="rounded-full w-20 h-20 mb-4" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">Francis Jara</h4>
                                <p className="text-sm text-gray-500">Biographer</p>
                                <p className="mt-4 text-gray-600">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </p>
                                <div className="text-blue-500 mt-4">
                                    <i className="fas fa-quote-right"></i>
                                </div>
                            </div>

                            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col text-center w-80">
                                <div className="flex justify-center">
                                    <Image width={100} height={100} src="assets/icons/avatar4.png" alt="David Baer" className="rounded-full w-20 h-20 mb-4" />
                                </div>
                                <h4 className="text-lg font-semibold text-gray-800">David Baer</h4>
                                <p className="text-sm text-gray-500">Executive</p>
                                <p className="mt-4 text-gray-600">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </p>
                                <div className="text-blue-500 mt-4">
                                    <i className="fas fa-quote-right"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Testimonials