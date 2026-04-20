import "./VendorReviews.css";
import { Star } from "lucide-react";

const reviews = [
  { id: 1, user: "Sarah Johnson", rating: 5, comment: "Absolutely amazing! The best hair styling I've ever had. Will definitely come back.", date: "Dec 15, 2024", service: "Hair Styling" },
  { id: 2, user: "Mike Chen", rating: 4, comment: "Great makeup session. Very professional and friendly staff.", date: "Dec 14, 2024", service: "Makeup Session" },
  { id: 3, user: "Emma Wilson", rating: 5, comment: "Loved the hair coloring! Exactly what I wanted. Highly recommend!", date: "Dec 13, 2024", service: "Hair Coloring" },
  { id: 4, user: "James Brown", rating: 5, comment: "The bridal package was worth every penny. Made my special day perfect.", date: "Dec 12, 2024", service: "Bridal Package" },
  { id: 5, user: "Lisa Davis", rating: 3, comment: "Good service but had to wait a bit. The result was nice though.", date: "Dec 11, 2024", service: "Hair Styling" },
  { id: 6, user: "Tom Anderson", rating: 5, comment: "Incredible facial treatment. My skin has never felt better!", date: "Dec 10, 2024", service: "Facial Treatment" },
];

const ratingBreakdown = [
  { stars: 5, count: 98, pct: 63 },
  { stars: 4, count: 35, pct: 22 },
  { stars: 3, count: 15, pct: 10 },
  { stars: 2, count: 5, pct: 3 },
  { stars: 1, count: 3, pct: 2 },
];

export default function VendorReviews() {
  return (
    <div className="ven-rev-container">

      {/* HEADER */}
      <div className="ven-rev-header">
        <h1>Reviews & Ratings</h1>
        <p>See what your customers are saying</p>
      </div>

      <div className="ven-rev-grid">

        {/* LEFT SUMMARY */}
        <div className="ven-rev-card summary">

          <h2 className="rating">4.8</h2>

          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="star-filled" />
            ))}
          </div>

          <p className="sub">Based on 156 reviews</p>

          <div className="breakdown">
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="row">
                <span>{r.stars}</span>
                <Star size={12} className="star-filled" />

                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{ width: `${r.pct}%` }}
                  ></div>
                </div>

                <span className="count">{r.count}</span>
              </div>
            ))}
          </div>

        </div>

        {/* RIGHT REVIEWS */}
        <div className="ven-rev-list">
          {reviews.map((r) => (
            <div key={r.id} className="ven-rev-card review">

              <div className="top">
                <div className="avatar">
                  {r.user.split(" ").map(n => n[0]).join("")}
                </div>

                <div className="info">
                  <p className="name">{r.user}</p>
                  <p className="meta">{r.service} · {r.date}</p>
                </div>

                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < r.rating ? "star-filled" : "star-empty"}
                    />
                  ))}
                </div>
              </div>

              <p className="comment">{r.comment}</p>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
}