import React from 'react'
import Header from './_components/Header'
import Hero from './_components/Hero'
import About from './_components/About'
import Services from './_components/Services'
import Nurses from './_components/Nurses'
import Clinic from './_components/Clinic'
import Testimonials from './_components/Testimonials'
import Contact from './_components/Contact'
import LatestNews from './_components/LatestNews'
import Footer from './_components/Footer'

function Home() {
  return (
    <div className=''>
      <Header />
      <main className="">
        <Hero />
        <About />
        <Services />
        <Clinic />
        <Nurses />
        <Testimonials />
        <LatestNews />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default Home