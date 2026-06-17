import React from 'react'
import './Expertise.css'

const projects = [
  {
    title: 'Luxury Wedding at Nile View',
    category: 'Wedding',
    client: 'For: Ahmed & Sara Family',
    description: 'A full-service wedding setup with floral decoration, lighting, and live entertainment.',
  },
  {
    title: 'University Graduation Gala',
    category: 'Graduation',
    client: 'For: Faculty of Engineering',
    description: 'A modern graduation celebration with stage design, photography zones, and premium seating.',
  },
  {
    title: 'Royal Birthday Experience',
    category: 'Birthday',
    client: 'For: Omar Hassan',
    description: 'A custom birthday event with themed decor, kids activities, and complete coordination.',
  },
]

const stats = [
  { label: 'Events Delivered', value: '250+' },
  { label: 'Happy Clients', value: '180+' },
  { label: 'Expert Team Members', value: '35+' },
  { label: 'Years of Experience', value: '8+' },
]

export default function Expertise() {
  return (
    <section className="expertise-section" id="expertise">
      <div className="expertise-container">
        <div className="expertise-heading">
          <h2>Our Work & Expertise</h2>
          <p>
            A quick look at some of our previous projects and the numbers that reflect our
            commitment to quality events.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span className="project-category">{project.category}</span>
              <h3>{project.title}</h3>
              <p className="project-client">{project.client}</p>
              <p>{project.description}</p>
            </article>
          ))}
        </div>

        <div className="stats-grid">
          {stats.map((item) => (
            <div className="stat-card" key={item.label}>
              <h3>{item.value}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
