import React, { useEffect, useState } from "react";
import axios from "axios";
import "./planner.css";
import Header from '../Header/Header'
import Footer from "../Footer/Footer";
import { Hearts } from 'react-loader-spinner';


export default function Planners() {
    const [planners, setPlanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/api/planners")
            .then((res) => {
                setPlanners(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
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
        <div className="planners-page">
            <h1 className="venues-title">Planners</h1>

            <div className="planners-grid">
                {planners.map((planner) => (
                    <div className="planner-card" key={planner._id}>
                        <div className="card-top">
                            <div className="avatar-box">
                                {planner.image ? (
                                    <img
                                        src={planner.image}
                                        alt={planner.name}
                                        className="avatar-img"
                                    />
                                ) : (
                                    <div className="avatar-placeholder">
                                        <i className="fa-regular fa-user"></i>
                                    </div>
                                )}
                            </div>

                            <div className="rating">
                                ⭐ {planner.rate}
                            </div>
                        </div>

                        <h3 className="planner-name">{planner.name}</h3>
                        <p className="planner-role">{planner.specialization}</p>

                        <div className="card-bottom">
                            <div>
                                <p className="price">
                                    ${planner.pricePerHour}/hr
                                </p>
                                <p className="availability">
                                    {planner.workingHours}
                                </p>
                            </div>

                            <button className="more-btn">More</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
        </>
    );
}

