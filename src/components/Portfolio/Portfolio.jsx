import React from 'react'
import './Portfolio.css'

const projects = [
  {
    title: 'Garden Wedding Setup',
    image: '/src/assets/w1.jpg',
    caption: 'Luxury wedding concept with floral stage and romantic lighting.',
  },
  {
    title: 'Graduation Celebration',
    image: '/src/assets/g1.jpg',
    caption: 'Modern graduation event with custom stage and photo corner.',
  },
  {
    title: 'Birthday Theme Party',
    image: '/src/assets/p1.jpg',
    caption: 'Colorful birthday setup designed around a unique party theme.',
  },
]

export default function Portfolio() {
  return (
    <section className="portfolio-section" id="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-heading">
          <h2>Portfolio / Gallery</h2>
          <p>Take a look at a few highlights from our previous events.</p>
        </div>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <article className="portfolio-card" key={project.title}>
              <img src={project.image} alt={project.title} />
              <div className="portfolio-content">
                <h3>{project.title}</h3>
                <p>{project.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
