import React, { useState } from "react";
import { Star, MoreHorizontal, Trash2, Eye } from "lucide-react";
import "./AdminReviews.css";

const reviews = [
  { id: 1, user: "Sarah Johnson", vendor: "Beauty Pro Studio", service: "Hair Styling", rating: 5, comment: "Absolutely amazing experience! The stylist was very professional and the result exceeded my expectations.", date: "Dec 15, 2024" },
  { id: 2, user: "Mike Chen", vendor: "FitLife Training", service: "Personal Training", rating: 4, comment: "Great trainer, very knowledgeable. Would recommend to anyone looking to get fit.", date: "Dec 14, 2024" },
  { id: 3, user: "Emma Wilson", vendor: "Zen Spa & Wellness", service: "Deep Tissue Massage", rating: 5, comment: "Best massage I've ever had. The ambiance was perfect and the therapist was skilled.", date: "Dec 13, 2024" },
  { id: 4, user: "James Brown", vendor: "Code Academy Plus", service: "Web Dev Course", rating: 3, comment: "Good content but could use more practical exercises.", date: "Dec 12, 2024" },
  { id: 5, user: "Lisa Davis", vendor: "Chef's Table", service: "Private Dinner", rating: 5, comment: "Incredible culinary experience!", date: "Dec 11, 2024" },
  { id: 6, user: "Tom Anderson", vendor: "Snap Photography", service: "Wedding Photography", rating: 5, comment: "Captured every moment beautifully.", date: "Dec 10, 2024" },
];

const getInitials = (name) =>
  name.split(" ").map((n) => n[0]).join("");

const AdminReviews = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="arv-wrapper">

      {/* Header */}
      <div className="arv-header">
        <h2>Reviews & Ratings</h2>
        <p>Manage user reviews across the platform</p>
      </div>

      {/* Grid */}
      <div className="arv-grid">
        {reviews.map((review, i) => (
          <div className="arv-card" key={review.id}>

            {/* Top */}
            <div className="arv-top">
              
              <div className="arv-user">
                <div className="arv-avatar">
                  {getInitials(review.user)}
                </div>

                <div>
                  <p className="arv-name">{review.user}</p>
                  <p className="arv-date">{review.date}</p>
                </div>
              </div>

              {/* Dropdown */}
              <div className="arv-menu">
                <button onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                  <MoreHorizontal />
                </button>

                {openIndex === i && (
                  <div className="arv-dropdown">
                    <p><Eye /> View</p>
                    <p className="arv-danger"><Trash2 /> Remove</p>
                  </div>
                )}
              </div>

            </div>

            {/* Vendor Info */}
            <div className="arv-meta">
              {review.vendor} · {review.service}
            </div>

            {/* Rating */}
            <div className="arv-stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={
                    index < review.rating
                      ? "arv-star-filled"
                      : "arv-star-empty"
                  }
                />
              ))}
            </div>

            {/* Comment */}
            <p className="arv-comment">{review.comment}</p>

          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminReviews;