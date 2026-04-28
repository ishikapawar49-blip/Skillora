import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BookService.css";
import { FaArrowLeft } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";

const dates = [
  { day: "Sun", date: 29 },
  { day: "Mon", date: 30 },
  { day: "Tue", date: 31 },
  { day: "Wed", date: 1 },
  { day: "Thu", date: 2 },
  { day: "Fri", date: 3 },
  { day: "Sat", date: 4 },
];

const times = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];

const BookService = () => {

  const navigate = useNavigate();
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const platformFee = 19;
const serviceAmount = Number(service?.price || 0);
const total = serviceAmount + platformFee;

// Generate next 30 days for booking
const generateDates = () => {
  const today = new Date();
  const datesArray = [];

  for (let i = 0; i < 90; i++) {
    const newDate = new Date();
    newDate.setDate(today.getDate() + i);

    datesArray.push({
      fullDate: newDate,
      day: newDate.toLocaleDateString("en-US", { weekday: "short" }),
      date: newDate.getDate(),
    });
  }
  return datesArray;
};

// Format date to DD-MM-YYYY for backend
const formatDate = (d) => {
  if (!d) return "";
  const dateObj = d.fullDate;
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
};


// Filter available times based on current time if booking for same day
const getAvailableTimes = () => {
  const now = new Date();

  if (!selectedDate) return times;

  const selected = new Date(selectedDate.fullDate);

  // same day
  if (selected.toDateString() === now.toDateString()) {
    return times.filter((t) => {
      const [time, period] = t.split(" ");
      let [hour, min] = time.split(":");

      hour = parseInt(hour);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      const slotTime = new Date();
      slotTime.setHours(hour, min);

      return slotTime > now;
    });
  }

  return times;
};


// Handle booking confirmation
const handleBooking = async () => {
  try {
    const token = localStorage.getItem("userToken");

    const res = await fetch("http://localhost:5000/api/user/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
      serviceId: service._id,
      selectedDate: selectedDate.fullDate.toISOString(),
      selectedTime: selectedTime,
    })
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Booking Successful ✅");
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

// Check if selected date is in the top 7 cards
const isInTopCards =
  selectedDate &&
  dates.slice(0, 7).some(
    (d) =>
      d.fullDate.toDateString() ===
      selectedDate.fullDate.toDateString()
  );


// Fetch service details on component mount
useEffect(() => {
  const fetchService = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/vendor/services/slug/${slug}`
      );

      const data = await res.json();
      setService(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchService();
}, [slug]);

// Generate dates on component mount
useEffect(() => {
  setDates(generateDates());
}, []);


// Show loading state while fetching service details
if (!service) return <h2>Loading...</h2>;



  return (
    <div className="book-service-container">
      <div className="book-service-left">
        <div className="book-service-back">
          <FaArrowLeft /> Back
        </div>

        <h1 className="book-service-title">Book Your Service</h1>

        <div className="book-service-steps">
          <div className="book-service-step active">
            <span>1</span> Date & Time
          </div>
          <div className="book-service-line"></div>
          <div className="book-service-step">
            <span>2</span> Address
          </div>
          <div className="book-service-line"></div>
          <div className="book-service-step">
            <span>3</span> Confirm
          </div>
        </div>

        {/* DATE */}
        <div className="book-service-section">
          <h2>
            <FiCalendar /> Select Date
          </h2>

          <div className="book-service-date-grid">
            {dates.slice(0, 7).map((d, i) => (
              <div
                key={i}
                className={`book-service-date-card ${
                 selectedDate &&
                 selectedDate.fullDate.toDateString() === d.fullDate.toDateString()
                 ? "selected"
                 : ""
                }`}
                onClick={() => setSelectedDate(d)}
              >
                <p>{d.day}</p>
                <h3>{d.date}</h3>
              </div>
            ))}
          </div>
        </div>

{/* DATE INPUT */}
<div style={{ marginTop: "15px" }}>
  <input
    type="date"
    value={
    selectedDate
      ? selectedDate.fullDate.toISOString().split("T")[0]
      : ""
  }
  className={`date-input ${
  selectedDate && !isInTopCards ? "calendar-selected" : ""
}`}
    min={new Date().toISOString().split("T")[0]}
    max={
      new Date(
        new Date().setDate(new Date().getDate() + 90)
      )
        .toISOString()
        .split("T")[0]
    }
    onChange={(e) => {
      const selected = new Date(e.target.value);

      setSelectedDate({
        fullDate: selected,
        day: selected.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        date: selected.getDate(),
      });
    }}
    style={{
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      cursor: "pointer",
    }}
  />
</div>
        {/* TIME */}
        <div className="book-service-section">
          <h2>
            <FiClock /> Select Time
          </h2>

          <div className="book-service-time-grid">
            {getAvailableTimes().map((t, i) => (
              <div
                key={i}
                 className={`book-service-time-card ${
      selectedTime === t ? "selected" : ""
    }`}
    onClick={() => setSelectedTime(t)}
  >
                {t}
              </div>
            ))}
          </div>
        </div>
        
<button
  className="book-service-btn"
  disabled={!selectedDate || !selectedTime}
  onClick={() =>
    navigate(`/services/${slug}/book/address`, {
      state: {
        selectedDate,
        selectedTime,
      },
    })
  }
>
  Continue
</button>

      </div>

      {/* RIGHT */}
      <div className="book-service-right">
        <div className="book-service-summary">
          <h2>Booking Summary</h2>

          <img
  src={service.image || "/images/default.jpg"}
  alt={service.title}
/>

<h3>{service.title}</h3>
<p>{service.category}</p>


          <hr />
 {selectedDate && (
  <div className="book-service-row">
    <span>Date</span>
    <span>{formatDate(selectedDate)}</span>
  </div>
)}

{selectedTime && (
  <div className="book-service-row">
    <span>Time</span>
    <span>{selectedTime}</span>
  </div>
)}
<div className="book-service-row">
  <span>Service</span>
  <span>₹{serviceAmount}</span>
</div>

<div className="book-service-row">
  <span>Platform Fee</span>
  <span>₹{platformFee}</span>
</div>

<div className="book-service-total">
  <span>Total</span>
  <span>₹{total}</span>
</div>

        </div>
      </div>
    </div>
  );
};

export default BookService;