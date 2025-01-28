import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <footer className=" py-12" style={{ backgroundImage: "url('assets/img/footer-bg.png')" }}>
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="st-footer-widget">
                        <div className="st-text-field">
                            <Image src="assets/icons/healthcare_logo.png" alt="Nischinto" className="w-32 h-32 mb-4 animate-pulse" width={100} height={100} />
                            <div className="text-gray-600 mb-4">Lorem ipsum dolor sit consectet adipisicing sed do eiusmod temp incididunt ut labore. Lorem Ipsum is simply dummy.</div>
                            <ul className="flex justify-start space-x-4">
                                <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fab fa-facebook-square"></i></a></li>
                                <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fab fa-linkedin"></i></a></li>
                                <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fab fa-pinterest-square"></i></a></li>
                                <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fab fa-twitter-square"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="st-footer-widget">
                        <h2 className="text-lg font-bold mb-4">Useful Links</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-chevron-right"></i>FAQs</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-chevron-right"></i>Blog</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-chevron-right"></i>Weekly timetable</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-chevron-right"></i>Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="st-footer-widget">
                        <h2 className="text-lg font-bold mb-4">Departments</h2>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-chevron-right"></i>Rehabilitation</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-chevron-right"></i>Laboratory Analysis</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-chevron-right"></i>Face Lift Surgery</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900"><i className="fas fa-chevron-right"></i>Liposuction</a></li>
                        </ul>
                    </div>
                    <div className="st-footer-widget">
                        <h2 className="text-lg font-bold mb-4">Contacts</h2>
                        <ul className="space-y-2">
                            <li><span className="text-gray-600">Address:</span> Harare</li>
                            <li><span className="text-gray-600">Email:</span> healthcare@gmail.com</li>
                            <li><span className="text-gray-600">Phone:</span> (+263) - 778 191 278 </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-gray-300 py-4 mt-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between">
                    <div className="">Copyright 2025. Design by Techtrain</div>
                    <div className=""><i className="fas fa-angle-up"></i></div>
                </div>
            </div>
        </footer>
    )
}

export default Footer