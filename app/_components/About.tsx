import React from 'react'
import Title from './Title'
import Image from 'next/image'

const About = () => {
    return (
        <section id='about' className="py-12">
            <div className="container mx-auto">
                <Title
                    title='About Us'
                    subtitle='We are a dedicated team of healthcare professionals'
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="md:order-2">
                        <p className=" mb-4">Our medical center is dedicated to providing high-quality medical care to our patients with compassion and dedication. We have a team of experienced doctors and nurses who are committed to helping our patients achieve their best health.</p>
                        <p className=" mb-4">We offer a wide range of medical services, including primary care, specialty care, and surgical services. We also have state-of-the-art equipment and facilities to ensure that our patients receive the best possible care.</p>
                        <p className=" mb-4">At our medical center, we believe in patient-centered care and strive to provide personalized treatment plans that meet the unique needs of each patient. We also prioritize patient education and empowerment, so that our patients can make informed decisions about their health.</p>
                    </div>
                    <div className="md:order-1 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-48 h-48 bg-blue-500 rounded-full animate-pulse"></div>
                        </div>
                        <Image className="w-full h-auto rounded-lg " src="/assets/images/doctors.jpg" alt="Medical Team" width={1000} height={1000} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About