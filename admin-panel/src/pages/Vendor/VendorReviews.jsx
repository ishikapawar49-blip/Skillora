import "./VendorReviews.css";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";


export default function VendorReviews() {

const [reviews, setReviews] = useState([]);
const [stats, setStats] = useState({
  avg: 0,
  total: 0,
  breakdown: []
});

useEffect(() => {
  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("vendorToken");

      const res = await fetch("http://localhost:5000/api/vendor/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     const data = await res.json();

if (!Array.isArray(data)) {
  console.log("❌ API ERROR:", data);
  setReviews([]);   // fallback
  return;
}

setReviews(data);

      // 🔥 CALCULATE STATS
      const total = Array.isArray(data) ? data.length : 0;
      const avg =
        total > 0
          ? (data.reduce((acc, r) => acc + r.rating, 0) / total).toFixed(1)
          : 0;

      const breakdown = [5,4,3,2,1].map(star => {
        const count = data.filter(r => r.rating === star).length;
        return {
          stars: star,
          count,
          pct: total ? (count / total) * 100 : 0
        };
      });

      setStats({ avg, total, breakdown });

    } catch (err) {
      console.log(err);
    }
  };

  fetchReviews();
}, []);


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

          <h2 className="rating">{stats.avg}</h2>

          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="star-filled" />
            ))}
          </div>

          <p className="sub">Based on {stats.total} reviews</p>

        {stats.breakdown.map((r) => (
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

        {/* RIGHT REVIEWS */}
        <div className="ven-rev-list">
          {Array.isArray(reviews) && reviews.map((r) => (
  <div key={r._id} className="ven-rev-card review">

    <div className="top">
      <div className="avatar">
        {r.user?.name?.split(" ").map(n => n[0]).join("")}
      </div>

      <div className="info">
        <p className="name">{r.user?.name}</p>
        <p className="meta">
          {r.service?.title} · {new Date(r.createdAt).toDateString()}
        </p>
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