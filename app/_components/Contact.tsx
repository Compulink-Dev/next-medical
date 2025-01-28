import Image from 'next/image';
import Title from './Title';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
    return (
        <section className="relative" id="contact">
            {/* Shape Backgrounds */}
            <div className="absolute bottom-5 left-5">
                <Image className='animate-bounce' src="/assets/icons/medical.svg" alt="shape1" width={50} height={50} />
            </div>
            <div className="absolute top-8 right-8">
                <Image className='animate-bounce' src="/assets/icons/medicalkit.svg" alt="shape2" width={50} height={50} />
            </div>

            {/* Section Container */}
            <div className="container mx-auto py-20">
                {/* Section Heading */}
                <Title
                    title='Stay Connected With Us'
                    subtitle="Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum the industry's standard dummy text."
                />

                {/* Contact Form */}
                <div className="max-w-4xl mx-auto">
                    <form
                        action="/assets/php/mail.php"
                        method="POST"
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                        id="contact-form"
                    >
                        <div>
                            <label className="block text-sm font-medium mb-2">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="John Doe"
                                required
                                className="w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="example@gmail.com"
                                required
                                className="w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                placeholder="Write subject"
                                required
                                className="w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                placeholder="+00 376 12 465"
                                required
                                className="w-full p-3 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium mb-2">Your Message</label>
                            <textarea
                                id="msg"
                                name="msg"
                                rows={4}
                                placeholder="Write something here..."
                                required
                                className="w-full p-3 border border-gray-300 rounded-md"
                            ></textarea>
                        </div>
                        <div className="sm:col-span-2 w-full">
                            <Button
                                variant={'outline'}
                                type="submit"
                                id="submit"
                                name="submit"
                                className="text-white font-medium rounded-md hover:bg-blue-600"
                            >
                                Send Message
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
