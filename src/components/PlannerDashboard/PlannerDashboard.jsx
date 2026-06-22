import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlannerDashboard.css';
import { Hearts } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

const PlannerDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const plannerName = localStorage.getItem('userName') || 'Planner';

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://faiyum-venues-backend-production.up.railway.app/api/event-options', {
        headers: { Authorization: `Bearer ${token}` }
      });
      let allBookings = [];

      if (response.data && Array.isArray(response.data.data)) {
        allBookings = response.data.data;
      } else if (Array.isArray(response.data)) {
        allBookings = response.data;
      } else {
        setError('Data format is not compatible.');
        setLoading(false);
        return;
      }

      const filtered = allBookings.filter((item) => {
        return (item.status || '').toLowerCase() === 'accepted';
      });

      setBookings(filtered);
      setLoading(false);
    } catch (err) {
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not Specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB');
    } catch (e) {
      return dateString.substring(0, 10);
    }
  };

  if (loading) return (
    <>
      <Header />
      <Hearts
        height="80"
        width="80"
        color="#fd3df0"
        ariaLabel="hearts-loading"
        wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px' }}
        wrapperClass=""
        visible={true}
      />
    </>
  );

  if (error) return (
    <>
      <Header />
      <div className="planner-dashboard-wrapper" dir="ltr"><p>{error}</p></div>
    </>
  );

  return (
    <>
      <Header />
      <div className="planner-dashboard-wrapper" dir="ltr">
        <div className="planner-dashboard-container">

          <div className="planner-dashboard-header">
            <h2 className="planner-header-title">Welcome back, {plannerName}</h2>
            <p className="planner-header-subtitle">Your accepted bookings</p>
          </div>

          <div className="planner-table-card">
            {bookings.length === 0 ? (
              <div className="planner-empty-state">
                <div className="planner-empty-icon">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="planner-empty-title">No Events Yet</h3>
                <p className="planner-empty-text">
                  You don't have any accepted bookings at the moment.<br />
                  Once a client books an event with you, it will appear here.
                </p>
                <button className="planner-empty-btn" onClick={() => navigate('/')}>
                  Back to Home
                </button>
              </div>
            ) : (
              <div className="planner-table-responsive">
                <table className="planner-table">
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer Name</th>
                      <th>Venue Name</th>
                      <th>Event Type</th>
                      <th>Date</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((item, index) => {
                      const displayId = item._id || item.id || index;
                      const customerName = item.customerName || (item.customer && item.customer.name) || (item.userId && item.userId.name) || item.name || 'Client';
                      const venueName = item.venueName || (item.venue && item.venue.name) || item.venue || 'Main Venue';
                      const eventType = item.type || item.cakeType || item.menuType || 'Event';
                      const eventDate = item.date || item.eventDate || item.createdAt;
                      const notes = item.notes || item.specialRequests || item.description || '—';

                      return (
                        <tr key={displayId} className="planner-table-row">
                          <td><span className="planner-id-cell" title={displayId}>#{displayId}</span></td>
                          <td className="planner-customer-cell">{customerName}</td>
                          <td><span className="planner-venue-badge" title={venueName}>{venueName}</span></td>
                          <td><span className="planner-event-type-text" title={eventType}>{eventType}</span></td>
                          <td className="planner-date-cell">{formatDate(eventDate)}</td>
                          <td className="planner-notes-cell">{notes}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default PlannerDashboard;
