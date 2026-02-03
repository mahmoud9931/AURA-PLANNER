import React from "react";
import "./Footer.css";
import { Link } from 'react-router-dom';


function Footer() {
    return (
        <div className="footer-container">

            <div className="footer-box">

                <div className="footer-section">
                    <h3>Get Started</h3>
                    <Link to="/indoor" className="footer-link">Find a Venue</Link>
                    <Link to="/palnners" className="footer-link">Find a Planner</Link>
                </div>

                <div className="footer-section">
                    <h3>Browse by Event</h3>

                    <Link to="/wedding" className="footer-link">Wedding & Engagements Ideas</Link>
                    <Link to="/graduation" className="footer-link">Graduation Ideas</Link>
                    <Link to="/birthday" className="footer-link">Birthday parties Ideas</Link>
                    <Link to="/special" className="footer-link">Special events Ideas</Link>
                </div>

                <div className="footer-section">
                    <h3>The Company</h3>
                    <a href="#about" className="footer-link">About Us</a>
                    <a href="https://wa.me/201098491014" className="footer-link" target="_blank">Contact AURA</a>
                </div>

            </div>

            <a href="#" className="footer-copy">© AURA PLANNER 2025</a>

        </div>
    );
}

export default Footer;
