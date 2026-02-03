
import React from 'react';
import { useState } from "react";
import './Header.css';
import { Link } from 'react-router-dom';



export default function Header() {





    const [openMenu, setOpenMenu] = useState(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };





    return (
        <>        <header className="header-container">
            {/* Logo */}
            <div className="logo-wrapper">
                <img
                    src="/src/assets/logo.png"
                    alt="Logo"
                    className="logo-img"
                />
            </div>

            {/* Search */}
            <div className="search-wrapper">
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                />
            </div>

            {/* Buttons */}
            <div className="buttons-wrapper">
                <Link to='/signup'><button className="button signup-button">SIGN UP</button></Link>
                <Link to='/login'><button className="button login-button">LOG IN</button></Link>
            </div>


        </header>
            <div className="navbar-section">

                <hr className="line" />

                <div className="navbar-container">

                    <Link to='/' className="brand">
                        <span className="bold">AURA</span><span className='light'>PLANNER</span>
                    </Link>

                    <div className="fav-icon">♡</div>
                </div>

                <hr className="line" />

            </div>





            {/* <Dropdown /> */}
            <nav className="navbar">
                {/* VENUES */}
                <div className="menu-container">
                    <div className="menu-item" onClick={() => toggleMenu("venues")}>
                        VENUES <span className="arrow">▾</span>
                    </div>

                    {openMenu === "venues" && (
                        <div className="dropdown-box">
                            <Link to="/indoor" className="dropdown-link">● INDOOR</Link>
                            <Link to="/outdoor" className="dropdown-link">● OUTDOOR</Link>
                        </div>
                    )}
                </div>

                {/* PLANNER */}
                <div className="menu-container">
                    <div className="menu-item" onClick={() => toggleMenu("planner")}>
                        PLANNER <span className="arrow">▾</span>
                    </div>

                    {openMenu === "planner" && (
                        <div className="dropdown-box">
                            <a href="..." className="dropdown-link">● Mahmoud Mohamed</a>
                            <a href="..." className="dropdown-link">● Yomna Mustafa</a>
                            <a href="..." className="dropdown-link">● Mariam Seif</a>
                            <a href="..." className="dropdown-link">● Mayar Ahmed</a>
                            <Link to="/palnners" className="dropdown-link">● All Planners</Link>
                        </div>
                    )}
                </div>

                {/* IDEAS */}
                <div className="menu-container">
                    <div className="menu-item" onClick={() => toggleMenu("ideas")}>
                        IDEAS <span className="arrow">▾</span>
                    </div>

                    {openMenu === "ideas" && (
                        <div className="dropdown-box dropdown-box1 ">
                            <Link to="/wedding" className="dropdown-link">● Wedding & Engagements</Link>
                            <Link to="/graduation" className="dropdown-link">● Graduation Ideas</Link>
                            <Link to="/birthday" className="dropdown-link">● Birthday parties Ideas</Link>
                            <Link to="/special" className="dropdown-link">● Special events Ideas</Link>
                        </div>
                    )}
                </div>
            </nav>


        </>
    );
}