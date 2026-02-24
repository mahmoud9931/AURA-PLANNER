import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import { Hearts } from "react-loader-spinner";



export default function Wedding() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/weddings')
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
        return <Hearts
height="80"
width="80"
color="#fd3df0"
ariaLabel="hearts-loading"
wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:'200px' }}
wrapperClass=""
visible={true}
/>;
    }

    return (
        <>
            <Header />
            <section className="venues-section">
                <h1 className="venues-title">Wedding & Engagements Ideas</h1>

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

            <Footer />
        </>
    );
}

