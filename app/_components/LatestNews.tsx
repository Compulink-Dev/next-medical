import React from 'react'
import Title from './Title'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

const LatestNews = () => {
    const newsArticles = [
        {
            id: 1,
            title: 'Article Title 1',
            date: '2023-02-20',
            image: '/article1.jpg',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 2,
            title: 'Article Title 2',
            date: '2023-02-15',
            image: '/article2.jpg',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        },
        {
            id: 3,
            title: 'Article Title 3',
            date: '2023-02-10',
            image: '/article3.jpg',
            excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
        }
    ]

    return (
        <section className="py-12">
            <div className="container mx-auto">
                <Title
                    title='Latest News'
                    subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor, vestibulum magna sed, convallis ex.'
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {newsArticles.map((article) => (
                        <div key={article.id} className="bg-dark-400 shadow-md rounded-lg p-4">
                            <Image className="w-full h-48 object-cover rounded-t-lg mb-4" src={article.image} alt={article.title} width={100} height={100} />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{article.date}</p>
                                <p className="text-lg">{article.excerpt}</p>
                                <Button variant={'outline'} className="mt-4 ">Read More</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default LatestNews