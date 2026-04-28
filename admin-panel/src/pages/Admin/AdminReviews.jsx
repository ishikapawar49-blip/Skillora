import React, { useEffect, useState } from "react";
import {
  Star,
  MoreHorizontal,
  Trash2,
  Eye
} from "lucide-react";

import "./AdminReviews.css";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const AdminReviews = () => {

  const [reviews, setReviews] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {

    const token = localStorage.getItem("adminToken");

    const res = await fetch(
      "http://localhost:5000/api/admin/reviews",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setReviews(data);
  };


  const deleteReview = async (id) => {

    const ok = window.confirm(
      "Delete this review?"
    );

    if (!ok) return;

    const token = localStorage.getItem("adminToken");

    await fetch(
      `http://localhost:5000/api/admin/reviews/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchReviews();
  };


  const viewReview = (review) => {
    alert(
`User: ${review.user?.name}

Vendor: ${review.vendor?.businessName || review.vendor?.name}

Service: ${review.service?.title}

Rating: ${review.rating}/5

Comment:
${review.comment}`
    );
  };


  return (
    <div className="arv-wrapper">

      {/* Header */}
      <div className="arv-header">
        <h2>Reviews & Ratings</h2>
        <p>Manage user reviews across the platform</p>
      </div>

      {/* Grid */}
      <div className="arv-grid">

        {reviews.length === 0 ? (
          <p>No Reviews Found</p>
        ) : (

          reviews.map((review, i) => (

            <div
              className="arv-card"
              key={review._id}
            >

              {/* Top */}
              <div className="arv-top">

                <div className="arv-user">

                  <div className="arv-avatar">
                    {getInitials(review.user?.name)}
                  </div>

                  <div>
                    <p className="arv-name">
                      {review.user?.name}
                    </p>

                    <p className="arv-date">
                      {new Date(
                        review.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                </div>


                {/* Dropdown */}
                <div className="arv-menu">

                  <button
                    onClick={() =>
                      setOpenIndex(
                        openIndex === i
                          ? null
                          : i
                      )
                    }
                  >
                    <MoreHorizontal />
                  </button>

                  {openIndex === i && (
                    <div className="arv-dropdown">

                      <p
                        onClick={() =>
                          viewReview(review)
                        }
                      >
                        <Eye /> View
                      </p>

                      <p
                        className="arv-danger"
                        onClick={() =>
                          deleteReview(
                            review._id
                          )
                        }
                      >
                        <Trash2 /> Remove
                      </p>

                    </div>
                  )}

                </div>

              </div>


              {/* Vendor */}
              <div className="arv-meta">

                {review.vendor?.businessName ||
                  review.vendor?.name}

                {" · "}

                {review.service?.title}

              </div>


              {/* Rating */}
              <div className="arv-stars">

                {Array.from({
                  length: 5,
                }).map((_, index) => (

                  <Star
                    key={index}
                    className={
                      index <
                      review.rating
                        ? "arv-star-filled"
                        : "arv-star-empty"
                    }
                  />

                ))}

              </div>


              {/* Comment */}
              <p className="arv-comment">
                {review.comment}
              </p>

            </div>

          ))
        )}

      </div>
    </div>
  );
};

export default AdminReviews;