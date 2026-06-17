import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingsTable.css';
import { Hearts } from 'react-loader-spinner';
import Header from '../Header/Header';

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://faiyum-venues-backend-production.up.railway.app/api/event-options', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data && Array.isArray(response.data.data)) {
        setBookings(response.data.data);
      } else if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        setError('Data format is not compatible.');
      }
      setLoading(false);
    } catch (err) {
      setError('An error occurred while fetching data.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (bookingId, choice) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`https://faiyum-venues-backend-production.up.railway.app/api/event-options/${bookingId}/status`, {
        status: choice
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200 || response.status === 201 || response.data) {
        alert(`Successfully updated in database to: ${choice}`);
        fetchBookings();
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

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
  if (error) return <><Header /><div className="dashboard-wrapper" dir="ltr"><p>{error}</p></div></>;

  return (
    <>
    <Header />
    <div className="dashboard-wrapper" dir="ltr">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h2 className="header-title">Admin Dashboard & Order Management</h2>
          <p className="header-subtitle">View booking details, venues, planners, and take immediate action</p>
        </div>

        <div className="table-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Customer Name</th>
                  <th className="text-center-column">Venue Name</th>
                  <th className="text-center-column">Event Type</th>
                  <th>Planner Name</th>
                  <th className="text-date-column">Date</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item, index) => {
                  const displayId = item._id || item.id || index;

                  const customerName = item.customerName || (item.customer && item.customer.name) || (item.userId && item.userId.name) || item.name || 'Client';
                  const plannerName = item.plannerName || (item.planner && item.planner.name) || item.planner || 'Not Assigned';
                  const eventDate = item.date || item.eventDate || item.createdAt;

                  const venueName = item.venueName || (item.venue && item.venue.name) || item.venue || 'Main Venue';


                  const eventType = item.type || item.cakeType || item.menuType || 'Wedding Event';

                  const currentStatus = item.status?.toLowerCase();

                  return (
                    <tr key={displayId} className="table-row">
                      <td><span className="id-cell" title={displayId}>#{displayId}</span></td>
                      <td className="customer-cell">{customerName}</td>
                      <td><span className="venue-badge" title={venueName}>{venueName}</span></td>
                      <td><span className="event-type-text" title={eventType}>{eventType}</span></td>
                      <td><span className="planner-text">{plannerName}</span></td>
                      <td className="date-cell">{formatDate(eventDate)}</td>

                      <td className="text-center">
                        <div className="status-container">
                          <span className={`status-badge ${currentStatus === 'accepted' ? 'status-accepted' :
                              currentStatus === 'cancelled' || currentStatus === 'rejected' ? 'status-rejected' : 'status-pending'
                            }`}>
                            {currentStatus === 'accepted' ? 'Accepted' : currentStatus === 'cancelled' || currentStatus === 'rejected' ? 'Rejected' : 'Pending'}
                          </span>
                        </div>
                      </td>

                      <td className="text-center">
                        <div className="actions-container">
                          <button
                            onClick={() => updateBookingStatus(displayId, 'accepted')}
                            disabled={currentStatus === 'accepted'}
                            className="btn-action btn-accept"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to reject this booking?')) {
                                updateBookingStatus(displayId, 'cancelled');
                              }
                            }}
                            disabled={currentStatus === 'cancelled' || currentStatus === 'rejected'}
                            className="btn-action btn-reject"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
    </>
  );
};

export default BookingsTable;