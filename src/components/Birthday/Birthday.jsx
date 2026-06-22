import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../footer/Footer";
import { Hearts } from "react-loader-spinner";
import { Link } from "react-router-dom";
import "../indoor/indoor.css";

const API_BASE = "https://faiyum-venues-backend-production.up.railway.app";

const emptyForm = {
    name: "",
    description: "",
    price: "",
    image: "",
    location: "",
    capacity: "",
};

export default function Birthday() {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [formData, setFormData] = useState(emptyForm);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    useEffect(() => {
        const role = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        setIsAdmin(role === "admin" && !!token);
        fetchVenues();
    }, []);

    const fetchVenues = () => {
        setLoading(true);
        axios.get(`${API_BASE}/api/birthdays`)
            .then((res) => {
                setVenues(res.data.data || res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    };

    const getAuthHeaders = () => ({
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const openAddModal = () => {
        setFormData(emptyForm);
        setFormError("");
        setShowAddModal(true);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setFormError("");
        if (!formData.name || !formData.price) { setFormError("Name and Price are required."); return; }
        setSubmitting(true);
        try {
            await axios.post(`${API_BASE}/api/birthdays`, { ...formData, type: "birthday" }, getAuthHeaders());
            setShowAddModal(false);
            fetchVenues();
        } catch (err) {
            setFormError(err.response?.data?.message || "Failed to add item.");
        } finally {
            setSubmitting(false);
        }
    };

    const openEditModal = (venue) => {
        setSelectedVenue(venue);
        setFormData({ name: venue.name || "", description: venue.description || "", price: venue.price || "", image: venue.image || "", location: venue.location || "", capacity: venue.capacity || "" });
        setFormError("");
        setShowEditModal(true);
    };

    const handleEdit = async (e) => {
        e.preventDefault();
        setFormError("");
        if (!formData.name || !formData.price) { setFormError("Name and Price are required."); return; }
        setSubmitting(true);
        try {
            await axios.put(`${API_BASE}/api/birthdays/${selectedVenue._id}`, { ...formData, type: "birthday" }, getAuthHeaders());
            setShowEditModal(false);
            fetchVenues();
        } catch (err) {
            setFormError(err.response?.data?.message || "Failed to update item.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (venueId, venueName) => {
        if (!window.confirm(`Are you sure you want to delete "${venueName}"?`)) return;
        try {
            await axios.delete(`${API_BASE}/api/birthdays/${venueId}`, getAuthHeaders());
            fetchVenues();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete item.");
        }
    };

    const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    if (loading) {
        return <Hearts height="80" width="80" color="#fd3df0" ariaLabel="hearts-loading" wrapperStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '200px' }} wrapperClass="" visible={true} />;
    }

    return (
        <>
            <Header />
            <section className="venues-section">
                <div className="venues-title-row">
                    <h1 className="venues-title">Birthday Parties Ideas</h1>
                    {isAdmin && (
                        <button className="admin-add-btn" onClick={openAddModal}>
                            <span className="admin-add-icon">＋</span> Add New Venue
                        </button>
                    )}
                </div>

                <div className="venues-grid">
                    {venues.map((venue) => (
                        <div className="venue-card" key={venue._id}>
                            <img src={venue.image} alt={venue.name} className="venue-img" />
                            <div className="venue-body">
                                <h3 className="venue-name">{venue.name}</h3>
                                <p className="venue-desc">{venue.description}</p>
                                <div className="venue-footer">
                                    <span className="venue-price">${venue.price}</span>
                                    <Link to={`/venues/birthdays/${venue._id}`} className="venue-btn">Book Now</Link>
                                </div>
                                {isAdmin && (
                                    <div className="admin-card-actions">
                                        <button className="admin-btn admin-btn-edit" onClick={() => openEditModal(venue)}>✏️ Edit</button>
                                        <button className="admin-btn admin-btn-delete" onClick={() => handleDelete(venue._id, venue.name)}>🗑️ Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />

            {showAddModal && (
                <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">➕ Add Birthday Party Idea</h2>
                            <button className="modal-close" onClick={() => setShowAddModal(false)}>✕</button>
                        </div>
                        <form className="modal-form" onSubmit={handleAdd}>
                            <VenueFormFields formData={formData} handleChange={handleChange} />
                            {formError && <p className="modal-error">{formError}</p>}
                            <div className="modal-actions">
                                <button type="button" className="modal-btn modal-btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
                                <button type="submit" className="modal-btn modal-btn-submit" disabled={submitting}>{submitting ? "Saving…" : "Add Item"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
                    <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">✏️ Edit Item</h2>
                            <button className="modal-close" onClick={() => setShowEditModal(false)}>✕</button>
                        </div>
                        <form className="modal-form" onSubmit={handleEdit}>
                            <VenueFormFields formData={formData} handleChange={handleChange} />
                            {formError && <p className="modal-error">{formError}</p>}
                            <div className="modal-actions">
                                <button type="button" className="modal-btn modal-btn-cancel" onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type="submit" className="modal-btn modal-btn-submit" disabled={submitting}>{submitting ? "Updating…" : "Save Changes"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

function VenueFormFields({ formData, handleChange }) {
    return (
        <>
            <div className="form-group">
                <label className="form-label">Name <span className="required">*</span></label>
                <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Balloon Fantasy Party" required />
            </div>
            <div className="form-group">
                <label className="form-label">Description</label>
                <textarea className="form-input form-textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Brief description…" rows={3} />
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Price (EGP) <span className="required">*</span></label>
                    <input className="form-input" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g. 5000" min="0" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Capacity</label>
                    <input className="form-input" type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="e.g. 200" min="0" />
                </div>
            </div>
            <div className="form-group">
                <label className="form-label">Location</label>
                <input className="form-input" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. El Fayoum City Center" />
            </div>
            <div className="form-group">
                <label className="form-label">Image URL</label>
                <input className="form-input" type="text" name="image" value={formData.image} onChange={handleChange} placeholder="https://…" />
                {formData.image && (
                    <img src={formData.image} alt="preview" className="image-preview" onError={(e) => e.target.style.display = 'none'} />
                )}
            </div>
        </>
    );
}
