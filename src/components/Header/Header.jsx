
import React, { useEffect, useMemo, useRef, useState } from 'react';
import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ROOM_SOURCES = [
    { type: 'indoor', endpoint: '/api/venues', label: 'Indoor' },
    { type: 'outdoor', endpoint: '/api/outdoors', label: 'Outdoor' },
    { type: 'weddings', endpoint: '/api/weddings', label: 'Wedding' },
    { type: 'special-events', endpoint: '/api/special-events', label: 'Special Event' },
    { type: 'birthdays', endpoint: '/api/birthdays', label: 'Birthday' },
    { type: 'graduations', endpoint: '/api/graduations', label: 'Graduation' }
];

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [openMenu, setOpenMenu] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('token')));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'admin');
    const [isPlanner, setIsPlanner] = useState(localStorage.getItem('role') === 'planner');
    const [searchTerm, setSearchTerm] = useState('');
    const [allRooms, setAllRooms] = useState([]);
    const [plannersList, setPlannersList] = useState([]);
    const [isLoadingRooms, setIsLoadingRooms] = useState(false);
    const [searchStatus, setSearchStatus] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchInputRef = useRef(null);
    const searchBoxRef = useRef(null);

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? null : menu);
    };

    useEffect(() => {
        setIsLoggedIn(Boolean(localStorage.getItem('token')));
        setIsAdmin(localStorage.getItem('role') === 'admin');
        setIsPlanner(localStorage.getItem('role') === 'planner');
    }, [location.pathname]);

    useEffect(() => {
        const fetchAllRooms = async () => {
            setIsLoadingRooms(true);
            try {
                const responses = await Promise.all(
                    ROOM_SOURCES.map(({ endpoint, type, label }) =>
                        axios.get(endpoint).then((res) => {
                            const data = res.data?.data || res.data || [];
                            return data.map((room) => ({
                                _id: room._id,
                                name: room.name || '',
                                type,
                                categoryLabel: label
                            }));
                        })
                    )
                );
                setAllRooms(responses.flat());
            } catch (error) {
                console.error(error);
                setSearchStatus('Unable to load venues now.');
            } finally {
                setIsLoadingRooms(false);
            }
        };

        fetchAllRooms();
    }, []);

    useEffect(() => {
        axios.get('/api/planners')
            .then((res) => {
                const data = res.data?.data || res.data || [];
                setPlannersList(Array.isArray(data) ? data : []);
            })
            .catch(() => setPlannersList([]));
    }, []);

    useEffect(() => {
        if (location.pathname === '/' && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userName');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsPlanner(false);
        navigate('/');
    };

    const suggestions = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return [];

        const startsWithMatches = allRooms.filter((room) =>
            room.name.toLowerCase().startsWith(query)
        );
        const includesMatches = allRooms.filter(
            (room) =>
                !room.name.toLowerCase().startsWith(query) &&
                room.name.toLowerCase().includes(query)
        );

        return [...startsWithMatches, ...includesMatches].slice(0, 8);
    }, [allRooms, searchTerm]);

    const goToRoomDetails = (room) => {
        if (!room?._id || !room?.type) return;
        setSearchTerm(room.name);
        setShowSuggestions(false);
        setSearchStatus('');
        navigate(`/venues/${room.type}/${room._id}`);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (!searchTerm.trim()) {
            setSearchStatus('Type a venue name first.');
            return;
        }

        if (suggestions.length > 0) {
            goToRoomDetails(suggestions[0]);
            return;
        }

        // setSearchStatus('No similar halls found.');
    };

    return (
        <>
            <header className="header-container">
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
                    <form className="search-box" onSubmit={handleSearchSubmit} ref={searchBoxRef}>
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search by venue name"
                            className="search-input"
                            value={searchTerm}
                            onFocus={() => setShowSuggestions(true)}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowSuggestions(true);
                                setSearchStatus('');
                            }}
                        />
                        {showSuggestions && searchTerm.trim() ? (
                            <ul className="search-suggestions">
                                {suggestions.length > 0 ? (
                                    suggestions.map((room) => (
                                        <li
                                            key={`${room.type}-${room._id}`}
                                            className="suggestion-item"
                                            onClick={() => goToRoomDetails(room)}
                                        >
                                            <span className="suggestion-name">{room.name}</span>
                                            <span className="suggestion-category">{room.categoryLabel}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="suggestion-empty">
                                        {isLoadingRooms ? 'Loading venues...' : 'No similar venues found.'}
                                    </li>
                                )}
                            </ul>
                        ) : null}
                    </form>
                    {searchStatus ? <p className="search-status">{searchStatus}</p> : null}
                </div>

                {/* Buttons */}
                <div className="buttons-wrapper">
                    {isLoggedIn ? (
                        <button className="button logout-button" onClick={handleLogout}>LOG OUT</button>
                    ) : (
                        <>
                            <Link to='/signup'><button className="button signup-button">SIGN UP</button></Link>
                            <Link to='/login'><button className="button login-button">LOG IN</button></Link>
                        </>
                    )}
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
                            {plannersList.slice(0, 4).map((p) => (
                                <Link key={p._id} to={`/palnners/${p._id}`} className="dropdown-link">● {p.name}</Link>
                            ))}
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

                {/* DASHBOARD - Admin Only */}
                {isAdmin && (
                    <div className="menu-container" >
                        <Link to="/dashboard" className="menu-item" style={{ textDecoration: 'none' }}>
                            DASHBOARD
                        </Link>
                    </div>
                )}

                {/* DASHBOARD - Planner Only */}
                {isPlanner && (
                    <div className="menu-container" >
                        <Link to="/planner-dashboard" className="menu-item" style={{ textDecoration: 'none' }}>
                            DASHBOARD
                        </Link>
                    </div>
                )}
            </nav>


        </>
    );
}