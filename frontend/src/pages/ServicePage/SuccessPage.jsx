import React, { useEffect, useState } from "react";
import "./SuccessPage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  const formatDate = (d) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB");
};


  useEffect(() => {
  const fetchBooking = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/bookings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      const data = await res.json();
      setBooking(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchBooking();
}, [id]);
if (!booking) return <h2>Loading booking...</h2>;

  return (
    <div className="success-container">

      {/* LEFT */}
      <div className="success-left">

        {/* STEPS */}
        <div className="success-steps">
          <div className="success-step done"><span>✓</span> Date & Time</div>
          <div className="success-line"></div>
          <div className="success-step done"><span>✓</span> Address</div>
          <div className="success-line"></div>
          <div className="success-step active"><span>3</span> Confirm</div>
        </div>

        {/* SUCCESS CARD */}
        <div className="success-card">

          <FaCheckCircle className="success-icon" />

          <h1>Booking Confirmed!</h1>
          <p>Your service has been scheduled successfully.</p>

          <div className="success-details">
            <p><strong>Service:</strong> {booking?.service?.title}</p>

<p><strong>Date:</strong> {formatDate(booking?.selectedDate)}</p>

<p><strong>Time:</strong> {booking?.selectedTime}</p>

<p>
  <strong>Address:</strong>{" "}
  {booking?.address?.flat}, {booking?.address?.locality}, {booking?.address?.pincode}
</p>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="success-actions">

          <button
            className="dashboard-btn"
            onClick={() => navigate("/account")}
          >
            Go to Dashboard
          </button>

          <button
            className="book-btn"
            onClick={() => navigate("/services")}
          >
            Book Another
          </button>

        </div>

      </div>

      {/* RIGHT SUMMARY */}
      <div className="success-right">

        <div className="book-service-summary">

          <h2>Booking Summary</h2>

          <img
          src={booking?.service?.image} alt="service"
          />

          <h3>{booking?.service?.title}</h3>
<p>{booking?.service?.category}</p>


          <hr />

          <div className="book-service-row">
            <span>Date</span>
            <span>{formatDate(booking?.selectedDate)}</span>
          </div>

          <div className="book-service-row">
            <span>Time</span>
            <span>{booking?.selectedTime}</span>
          </div>

          <div className="book-service-row">
  <span>Service</span>
  <span>₹{booking?.serviceAmount}</span>
</div>

<div className="book-service-row">
  <span>Platform Fee</span>
  <span>₹{booking?.platformFee}</span>
</div>

<div className="book-service-total">
  <span>Total</span>
  <span>₹{booking?.totalAmount}</span>
</div>

        </div>

      </div>

    </div>
  );
};

export default SuccessPage;