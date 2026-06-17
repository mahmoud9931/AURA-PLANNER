import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./VenuesDetails.css";
import { Hearts } from "react-loader-spinner";
import Header from "../Header/Header";
import Swal from "sweetalert2";
import OnlinePaymentModal from "./OnlinePaymentModal";

import musicImg from "../../assets/Frame 148.png";
import foodImg from "../../assets/Frame 150.png";

const DETAILS_ENDPOINT_BY_TYPE = {
    indoor: "venues",
    outdoor: "outdoors",
    weddings: "weddings",
    birthdays: "birthdays",
    graduations: "graduations",
    "special-events": "special-events",
};

const EVENT_TYPE_LABELS = {
    indoor: "Indoor",
    outdoor: "Outdoor",
    weddings: "Wedding",
    birthdays: "Birthday",
    graduations: "Graduation",
    "special-events": "Special Event",
};

function VenueDetails() {
    const { type, id } = useParams();
    const navigate = useNavigate();
    const [venue, setVenue] = useState(null);
    const [loading, setLoading] = useState(true);

    const [musicType, setMusicType] = useState([]);
    const [drinks, setDrinks] = useState(false);
    const [meals, setMeals] = useState(false);
    const [dessert, setDessert] = useState(false);
    const [date, setDate] = useState("");
    const [planners, setPlanners] = useState([]);
    const [selectedPlanner, setSelectedPlanner] = useState("");
    const [customName, setCustomName] = useState("");

    const [showPayment, setShowPayment] = useState(false);

    const baseURL = "/api";
    const today = new Date().toISOString().split("T")[0];
    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const resource = DETAILS_ENDPOINT_BY_TYPE[type] || type;
                let endpoint = `${baseURL}/${resource}/${id}`;
                const res = await axios.get(endpoint);
                setVenue(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchVenue();
    }, [type, id]);

    useEffect(() => {
        const fetchPlanners = async () => {
            try {
                const res = await axios.get(`${baseURL}/planners`);
                const data = Array.isArray(res.data) ? res.data : res.data?.data || [];
                setPlanners(data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchPlanners();
    }, []);

    const eventTypeLabel = EVENT_TYPE_LABELS[type] || type;

    const musicOptions = useMemo(() => {
        const apiMusicOptions =
            venue?.musicTypes ||
            venue?.musicOptions ||
            venue?.musicMenu ||
            [];

        if (Array.isArray(apiMusicOptions) && apiMusicOptions.length > 0) {
            return apiMusicOptions;
        }

        return ["DJ", "Romantic", "Classic", "Pop", "Jazz", "Rock"];
    }, [venue]);

    const handleMusic = (m) => {
        setMusicType(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
    };

    const handleBook = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            Swal.fire({
                icon: "warning",
                title: "Login required",
                text: "You need to login first before booking.",
                confirmButtonColor: "#fd3df0",
            }).then(() => navigate("/login"));
            return;
        }

        if (!date) return alert("Please select a date");
        if (!selectedPlanner) return alert("Please select a planner");
        if (!customName.trim()) return alert("Please enter a customer name");
        setShowPayment(true);
    };

    const handleConfirmPayment = async (paymentData) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                Swal.fire({
                    icon: "warning",
                    title: "Login required",
                    text: "You need to login first before booking.",
                    confirmButtonColor: "#fd3df0",
                }).then(() => navigate("/login"));
                return;
            }

            const resourceType = DETAILS_ENDPOINT_BY_TYPE[type] || type;
            await axios.post(
                `${baseURL}/event-options`,
                {
                    venueId: id,
                    venueName: venue?.name,
                    type: resourceType,
                    originalType: type,
                    eventType: eventTypeLabel,
                    musicType,
                    drinks,
                    meals,
                    dessert,
                    eventDate: date,
                    planner: selectedPlanner,
                    customerName: customName.trim(),
                    payment: paymentData,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            await Swal.fire({
                icon: "success",
                title: "Booking Confirmed 🎉",
                text: "Your reservation has been saved successfully",
                confirmButtonColor: "#fd3df0",
            });

            setShowPayment(false);
            setMusicType([]);
            setDrinks(false);
            setMeals(false);
            setDessert(false);
            setDate("");
            setSelectedPlanner("");
            setCustomName("");
            navigate("/");

        } catch (err) {
            console.log("Booking error:", err?.response?.data || err.message);
            Swal.fire({
                icon: "error",
                title: "Booking failed",
                text: err?.response?.data?.message || "Error while booking. Please try again.",
                confirmButtonColor: "#fd3df0",
            });
        }
    };

    if (loading) return <Hearts height="80" width="80" color="#fd3df0" wrapperStyle={{ display: "flex", justifyContent: "center", marginTop: "200px" }} />;
    if (!venue) return <h2>Venue not found</h2>;

    return (
        <>
            <Header />
            <div className="venue-details-container">
                <div className="venue-details-card">
                    <div className="venue-image">
                        <img src={venue.image} alt={venue.name} />
                    </div>
                    <div className="venue-info">
                        <h2>{venue.name}</h2>
                        <p>{venue.description}</p>
                        <div className="venue-meta">
                            <div>👤 {venue.capacity}</div>
                            <div>📍 {venue.location}</div>
                            <div>⭐ {venue.rating}</div>
                        </div>
                    </div>
                </div>

                <div className="section">
                    <div className="section-image"><img src={musicImg} alt="" /></div>
                    <div className="section-content">
                        <h2>🎵 YOU LIKE MUSIC TYPE...?</h2>
                        {musicOptions.map((m) => (
                            <label key={m}>
                                <input type="checkbox" onChange={() => handleMusic(m)} checked={musicType.includes(m)} />
                                {m}
                            </label>
                        ))}
                    </div>
                </div>

                <div className="section">
                    <div className="section-image"><img src={foodImg} alt="" /></div>
                    <div className="section-content">
                        <h2>🍽 Food & Drinks</h2>
                        <label><input type="checkbox" onChange={() => setDrinks(!drinks)} checked={drinks} /> DRINKS</label>
                        <label><input type="checkbox" onChange={() => setMeals(!meals)} checked={meals} /> MEALS</label>
                        <label><input type="checkbox" onChange={() => setDessert(!dessert)} checked={dessert} /> DESSERT</label>
                    </div>
                </div>

                <div className="date-section">
                    <h3>Date & Planner</h3>
                    <div className="date-planner-row">
                        <div className="date-planner-field">
                            <label htmlFor="event-date">Select Date</label>
                            <input
                                id="event-date"
                                type="date"
                                min={today}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <div className="date-planner-field">
                            <label htmlFor="planner-select">Select Planner</label>
                            <select
                                id="planner-select"
                                value={selectedPlanner}
                                onChange={(e) => setSelectedPlanner(e.target.value)}
                            >
                                <option value="">Choose a planner</option>
                                {planners.map((planner) => (
                                    <option key={planner._id} value={planner.name}>
                                        {planner.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="date-planner-field">
                            <label htmlFor="customer-name">Customer Name</label>
                            <input
                                id="customer-name"
                                type="text"
                                placeholder="Enter customer name"
                                value={customName}
                                onChange={(e) => setCustomName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <button className="book-btn" onClick={handleBook}>Book Now</button>

                {showPayment && (
                    <OnlinePaymentModal
                        onCancel={() => setShowPayment(false)}
                        onConfirm={handleConfirmPayment}
                    />
                )}
            </div>
        </>
    );
}

export default VenueDetails;