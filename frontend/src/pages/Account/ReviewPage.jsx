import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewPage.css";

export default function ReviewPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

 const handleSubmit = async () => {

  if (rating === 0) {
    alert("Please select rating ⭐");
    return;
  }

  if (!comment.trim()) {
    alert("Please write a review");
    return;
  }

  try {
    const token = localStorage.getItem("userToken");

    const res = await fetch("http://localhost:5000/api/users/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        bookingId,
        rating,
        comment,
      }),
    });

    const data = await res.json();

    console.log("RESPONSE:", data);

    if (res.ok) {
      alert("Review submitted ✅");
      navigate("/account");
    } else {
      alert(data.message || "Failed to submit review");
    }

  } catch (err) {
    console.log(err);
    alert("Server error");
  }
};


  return (
    <div className="review-wrapper">

      <div className="review-box">

        <h2 className="review-title">Share Your Experience</h2>
        <p className="review-subtitle">
          Your feedback helps others choose better services
        </p>

        <svg width="0" height="0">
  <defs>
    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#7C6BFF" />
      <stop offset="100%" stopColor="#FF6A6A" />
    </linearGradient>
  </defs>
</svg>

        {/* ⭐ STARS */}
<div className="review-stars-ui">
  {[1,2,3,4,5].map((star) => (
    <FaStar
      key={star}
      className="review-star-icon"
      onClick={() => setRating(star)}
      onMouseEnter={() => setHover(star)}
      onMouseLeave={() => setHover(0)}
      style={{
        fill: (hover || rating) >= star
          ? "url(#starGradient)"   // 🔥 gradient apply
          : "#d1d5db"
      }}
    />
  ))}
</div>

        {/* TEXTAREA */}
        <textarea
          className="review-input"
          placeholder="Tell us about your experience..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* BUTTON */}
        <button className="review-btn" onClick={handleSubmit}>
          Submit Review
        </button>

      </div>

    </div>
  );
}