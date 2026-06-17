import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Planner.css';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../footer/Footer';
import { Hearts } from 'react-loader-spinner';

const Planner = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planner, setPlanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');


  const [reviews, setReviews] = useState([
    { id: 1, name: 'Gana Mohamed', text: 'Everything was perfectly organized — you made our day unforgettable!', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150' },
    { id: 2, name: 'Maryam Ali', text: 'Amazing attention to detail. Highly recommended for elite events!', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150' },
    { id: 3, name: 'Nadine Ahmed', text: 'Very professional behavior and creative design concepts.', rating: '4.7', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150' }
  ]);

  useEffect(() => {
    if (!id) return;
    const fetchPlannerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://faiyum-venues-backend-production.up.railway.app/api/planners/${id}`);
        if (response.data) {
          setPlanner(response.data);
        }
      } catch (err) {
        console.error("Error fetching planner data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlannerData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    setSubmitting(true);
    setSubmitMessage('');


    const newReview = {
      id: Date.now(),
      name: 'You (Visitor)',
      text: reviewText,
      rating: parseFloat(rating).toFixed(1),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150'
    };
    setReviews(prev => [newReview, ...prev]);

    try {

      await axios.post('https://faiyum-venues-backend-production.up.railway.app/api/planners/add-review', {
        customerName: 'Test User',
        comment: reviewText,
        userRating: Number(rating),
        plannerId: id
      });
      setSubmitMessage('Review submitted successfully!');
    } catch (err) {
      console.error("Sent to backend, tracked in logs:", err);
    } finally {
      setReviewText('');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="loading-spinner">
          <Hearts
            height="80"
            width="80"
            color="#fd3df0"
            ariaLabel="hearts-loading"
            visible={true}
          />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="planner-container" style={{ direction: 'ltr', textAlign: 'left', padding: '20px' }}>
        <button onClick={() => navigate('/palnners')} className="back-btn">← Back to Planners</button>

        <div className="planner-profile-card">
          <h2 className="section-title">PLANNER</h2>
          <div className="profile-main-info">
            <div className="profile-avatar-block">
              <div className="avatar-circle">
                {planner?.image ? (
                  <img src={planner.image} alt={planner.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </div>
              <h3 className="planner-name">{planner?.name || "Sara Ahmed"}</h3>
              <div className="rating-stars">
                <span className="stars">★★★★★</span>
                <span className="rating-value">{planner?.rate || "4.9"}</span>
              </div>
            </div>
            <div className="profile-description-block">
              <p className="bio-text">
                {planner?.specialization || "Wedding & Birthday Specialist"} - Certified event planner dedicated to crafting unforgettable, seamless, and elegant celebrations tailored perfectly to your unique story.
              </p>
              <div className="planner-meta-info">
                {planner?.pricePerHour && <p className="meta-item">💰 <strong>Price:</strong> ${planner.pricePerHour}/hr</p>}
                {planner?.workingHours && <p className="meta-item">🕐 <strong>Hours:</strong> {planner.workingHours}</p>}
                {planner?.phone && <p className="meta-item">📞 <strong>Phone:</strong> {planner.phone}</p>}
                {planner?.email && <p className="meta-item">✉️ <strong>Email:</strong> {planner.email}</p>}
              </div>
            </div>
          </div>

          <div className="portfolio-section">
            <h4 className="portfolio-title">Recent Projects</h4>
            <div className="portfolio-grid">
              <div className="wedding-project-card">
                <div className="project-image-wrapper"><img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=400" alt="Project 1" /></div>
                <div className="project-card-details">
                  <p className="detail-item">👤 <strong>Client:</strong> Jana Mohamed</p>
                  <p className="detail-item">📅 <strong>Date:</strong> 10-05-2026</p>
                  <p className="detail-item">⭐ <strong>Rating:</strong> 4.5 / 5</p>
                </div>
              </div>
              <div className="wedding-project-card">
                <div className="project-image-wrapper"><img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=400" alt="Project 2" /></div>
                <div className="project-card-details">
                  <p className="detail-item">👤 <strong>Client:</strong> Maryam Ali</p>
                  <p className="detail-item">📅 <strong>Date:</strong> 24-05-2026</p>
                  <p className="detail-item">⭐ <strong>Rating:</strong> 4.8 / 5</p>
                </div>
              </div>
              <div className="wedding-project-card">
                <div className="project-image-wrapper"><img src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400" alt="Project 3" /></div>
                <div className="project-card-details">
                  <p className="detail-item">👤 <strong>Client:</strong> Nadine Ahmed</p>
                  <p className="detail-item">📅 <strong>Date:</strong> 12-06-2026</p>
                  <p className="detail-item">⭐ <strong>Rating:</strong> 4.7 / 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-card">
          <form onSubmit={handleReviewSubmit} className="add-review-form">
            <div className="form-row">
              <input
                type="text"
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="review-input-field"
                required
              />
              <div className="star-rating-selector">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star-clickable ${star <= rating ? 'active' : ''}`} onClick={() => setRating(star)}>★</span>
                ))}
              </div>
              <button type="submit" disabled={submitting} className="submit-review-btn">
                {submitting ? '...' : 'Submit'}
              </button>
            </div>
          </form>

          {submitMessage && <p className="status-message" style={{ color: '#16a34a', fontWeight: '500', marginTop: '10px' }}>{submitMessage}</p>}

          <div className="reviews-list">
            {reviews.map((review) => (
              <div key={review.id} className="review-item-row">
                <div className="review-user-avatar">
                  <img src={review.avatar} alt={review.name} className="review-avatar-img" />
                </div>
                <div className="review-content-body">
                  <h5 className="review-user-name">{review.name}</h5>
                  <p className="review-text-message">{review.text}</p>
                </div>
                <div className="review-item-rating">
                  <span className="mini-star">★</span>
                  <span className="mini-rating-val">{review.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </>
  );
};

export default Planner;