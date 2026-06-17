import React from 'react'
import './Home.css'
import Header from '../Header/Header'
import About from '../About/About'
import Footer from '../footer/Footer'
import Categories from '../Categories/Categories'
import Portfolio from '../Portfolio/Portfolio'
import Testimonials from '../Testimonials/Testimonials'
import Expertise from '../Expertise/Expertise'

export default function Home() {
  return (
    <>
      <Header />
      <section className="home-hero">
        <img
          src="/src/assets/home-img.png"
          alt="Aura Planner hero section"
          className="home-hero-img"
        />
      </section>
      <About />
      <Portfolio />
      <Expertise />
      <Testimonials />
      <Categories />

      <Footer />
    </>
  )
}
