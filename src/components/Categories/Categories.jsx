import React from 'react'
import { Link } from 'react-router-dom'
import './Categories.css'

const categories = [
  {
    title: 'Wedding',
    description: 'Elegant weddings with full planning and decor.',
    path: '/wedding',
    image: '/src/assets/w0.jpg',
  },
  {
    title: 'Graduation',
    description: 'Memorable graduation parties for every class.',
    path: '/graduation',
    image: '/src/assets/g0.jpg',
  },
  {
    title: 'Birthday',
    description: 'Creative birthday setups for all ages.',
    path: '/birthday',
    image: '/src/assets/p1.jpg',
  },
  {
    title: 'Special Events',
    description: 'Custom concepts for your unique celebrations.',
    path: '/special',
    image: '/src/assets/s0.jpg',
  },
]

export default function Categories() {
  return (
    <section className="categories-section" id="categories">
      <div className="categories-container">
        <div className="categories-heading">
          <h2>Our Event Categories</h2>
          <p>Choose the category that matches your occasion and let us handle every detail.</p>
        </div>

        <div className="categories-grid">
          {categories.map((item) => (
            <article className="category-card" key={item.title}>
              <img src={item.image} alt={item.title} className="category-image" />
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link to={item.path}>Explore</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
