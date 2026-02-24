import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page" id="about">

      <div className="about-content">

        {/* صورة واحدة */}
        <div className="about-hero">
          <img src="/src/assets/about-img.jpg" alt="about us" />
        </div>

        {/* النص */}
        <div className="about-text">
          <h2>ABOUT US</h2>

          <p>
            At <strong>AURA PLANNER</strong>, we turn your special moments into
            unforgettable memories.
          </p>

          <p>
            We specialize in creating stunning weddings, engagements, birthdays,
            and all kinds of celebrations — tailored to reflect your unique style
            and vision.
          </p>

          <p>
            From elegant décor and lighting to entertainment, photography,
            and event coordination, our dedicated team ensures every detail is
            flawlessly executed.
          </p>

          <p>
            Because for us, it’s not just an event — it’s your story,
            beautifully celebrated.
          </p>
        </div>

      </div>

    </div>
  );
}

export default About;
