import { useEffect, useState } from "react";
import axios from "axios";
import "./Indoor.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



export default function Indoor() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios
            .get("https://vxgw8lkl-5000.uks1.devtunnels.ms/api/venues")
            .then((res) => {
                setVenues(res.data.data || res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="venues-loading">Loading venues...</p>;
    }

    return (
    <>
        <Header />
        <section className="venues-section">
            <h2 className="venues-title">INDOOR</h2>

            <div className="venues-grid">
                {venues.map((venue) => (
                    <div className="venue-card" key={venue._id}>
                        <img
                            src={venue.image}
                            alt={venue.name}
                            className="venue-img"
                        />

                        <div className="venue-body">
                            <h3 className="venue-name">{venue.name}</h3>
                            <p className="venue-desc">{venue.description}</p>

                            <div className="venue-footer">
                                <span className="venue-price">${venue.price}</span>
                                <button className="venue-btn">Book Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>

        <Footer/>
    </>
    );
}
