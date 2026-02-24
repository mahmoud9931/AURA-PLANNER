import React from 'react'
import Header from '../Header/Header'
import About from '../About/About'
import Footer from '../footer/Footer'

export default function Home() {
    return (
        <><Header/>
        <img src="/src/assets/home-img.png" alt="" />
        <About/>
        <Footer/>
        </>
    )
}
