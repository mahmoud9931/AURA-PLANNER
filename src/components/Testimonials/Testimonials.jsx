import React from 'react'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Mona Adel',
    event: 'Wedding Client',
    comment:
      'Everything was perfect from planning to execution. The team understood our vision and delivered beyond expectations.',
  },
  {
    name: 'Karim Soliman',
    event: 'Graduation Event',
    comment:
      'Very professional and organized team. Guests loved the setup, and every detail was handled smoothly.',
  },
  {
    name: 'Nour Hany',
    event: 'Birthday Party',
    comment:
      'Beautiful design, great coordination, and excellent communication throughout the whole event.',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="testimonials-container">
        <div className="testimonials-heading">
          <h2>What Our Clients Say</h2>
          <p>Real feedback that reflects the quality and care we put into every event.</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.name}>
              <p className="testimonial-comment">"{item.comment}"</p>
              <h3>{item.name}</h3>
              <span>{item.event}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
