import "./VendorBookings.css";
import { Check, X, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";


export default function VendorBookings() {

  const [bookings, setBookings] = useState([]);
  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("vendorToken");

      const res = await fetch("http://localhost:5000/api/vendor/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchBookings();
}, []);


const updateStatus = async (id, status) => {
  try {
    const token = localStorage.getItem("vendorToken");

    await fetch(`http://localhost:5000/api/vendor/booking/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    // 🔥 RE-FETCH FROM BACKEND (REAL DATA)
const res = await fetch("http://localhost:5000/api/vendor/bookings", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const data = await res.json();
setBookings(data);

  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="ven-book-container">

      {/* HEADER */}
      <div className="ven-book-header">
        <h1>Booking Management</h1>
        <p>Accept, reject, and track your bookings</p>
      </div>

      {/* TABLE */}
      <div className="ven-book-table">

        <div className="ven-book-row ven-book-head">
          <span>ID</span>
          <span>Customer</span>
          <span>Service</span>
          <span>Date</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

      {bookings
  .filter((b) => b.status !== "cancelled")
  .map((b) => {

  const formattedId = b.bookingNumber 
  ? `B-${b.bookingNumber}` 
  : "B-10001";

  const dateObj = new Date(b.selectedDate);

const formattedDate = isNaN(dateObj)
  ? "Invalid Date"
  : dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formattedTime = b.selectedTime;

  return (
    <div key={b._id} className="ven-book-row">

      <span className="ven-book-id">{formattedId}</span>

      <span>{b.user?.name}</span>

      <span>{b.service?.title}</span>

      <span>
        <p>{formattedDate}</p>
        <p className="ven-book-time">{formattedTime}</p>
      </span>

      <span className="ven-book-amount">₹{b.amount}</span>

      <span>
        <span className={`ven-book-badge ${b.status}`}>
          {b.status}
        </span>
      </span>

      <span>
  <div className="ven-book-actions">

  {/* ✅ CONFIRM */}
  {b.status === "pending" && (
    <button
      className="accept"
      title="Confirm Booking"
      onClick={() => updateStatus(b._id, "confirmed")}
    >
      <Check size={14} />
    </button>
  )}

  {/* ✅ COMPLETE */}
  {b.status === "confirmed" && (
    <button
      className="complete"
      title="Mark as Completed"
      onClick={() => updateStatus(b._id, "completed")}
    >
      <Check size={14} />
    </button>
  )}


</div>
</span>

    </div>
  );
})}

      </div>

    </div>
  );
}