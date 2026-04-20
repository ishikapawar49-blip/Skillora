import React, { useState, useEffect } from "react";
import "./AccountPage.css";
import { 
  FiCalendar, 
  FiClock, 
  FiCreditCard, 
  FiUser,
  FiMapPin   
} from "react-icons/fi";

const AccountPage = () => {

  const [activeTab,setActiveTab] = useState("upcoming");
  const [user, setUser] = useState({});
  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("userToken");

// 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await fetch("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = await userRes.json();
        setUser(userData);

        const bookingRes = await fetch("http://localhost:5000/api/bookings/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const bookingData = await bookingRes.json();
        setBookings(bookingData);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

// 🔥 FILTER
  const upcoming = bookings.filter(
  (b) => b.status === "pending" || b.status === "confirmed"
);
const past = bookings.filter(
  (b) => b.status === "completed" || b.status === "cancelled"
);

  // 🔥 SAVE PROFILE
  const handleSave = async () => {
    const res = await fetch("http://localhost:5000/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
  phone: user.phone,
  address: user.address
})
    });

    const data = await res.json();
    setUser(data);
    alert("Profile updated ✅");
  };

  return (
    <div className="account-page">

      <div className="account-header">

        <div className="account-icon">
          <FiUser/>
        </div>

        <div>
          <h2>Welcome back, {user.name}</h2>
          {/* <p>{user.email}</p> */}
          <p>Manage your bookings and preferences</p>
        </div>

      </div>

      <div className="account-tabs">

        <button
        className={activeTab==="upcoming" ? "tab active":"tab"}
        onClick={()=>setActiveTab("upcoming")}
        >
        <FiCalendar/> Upcoming
        </button>

        <button
        className={activeTab==="past" ? "tab active":"tab"}
        onClick={()=>setActiveTab("past")}
        >
        <FiClock/> Past Bookings
        </button>

        <button
        className={activeTab==="payments" ? "tab active":"tab"}
        onClick={()=>setActiveTab("payments")}
        >
        <FiCreditCard/> Payments
        </button>

        <button
        className={activeTab==="profile" ? "tab active":"tab"}
        onClick={()=>setActiveTab("profile")}
        >
        <FiUser/> Profile
        </button>

      </div>

      <div className="account-content">
 

        {/* 🔥 UPCOMING */}
        {activeTab==="upcoming" && upcoming.map(b => (
  <div className="account-booking-card" key={b._id}>

  {/* LEFT IMAGE */}
  <div className="booking-img-box">
    <img
      src={
        b.service?.image?.url ||
        b.service?.image ||
        "https://via.placeholder.com/120"
      }
      alt={b.service?.title}
    />
  </div>

  {/* CENTER CONTENT */}
  <div className="account-booking-details">
    <h3 className="account-booking-title">{b.service?.title}</h3>
    <p className="account-category">{b.service?.category}</p>

    <div className="account-booking-meta">
      <span>
  <FiCalendar />{" "}
  {b.selectedDate
    ? new Date(b.selectedDate).toLocaleDateString("en-IN")
    : "N/A"}
</span>
      <span><FiClock /> {b.selectedTime}</span>
    </div>

    <div className="account-booking-address">
      <FiMapPin /> {b.address?.flat}, {b.address?.locality}
    </div>
  </div>

  {/* RIGHT STATUS */}
<div className={`account-status ${b.status}`}>
  {b.status}
</div>

</div>

))}

        {/* 🔥 PAST BOOKINGS */}
{activeTab==="past" && past.map(b => (
  <div className="account-booking-card" key={b._id}>

    {/* LEFT IMAGE */}
    <div className="booking-img-box">
      <img
        src={
          b.service?.image?.url ||
          b.service?.image ||
          "https://via.placeholder.com/120"
        }
        alt={b.service?.title}
      />
    </div>

    {/* CENTER CONTENT */}
    <div className="account-booking-details">
      <h3 className="account-booking-title">{b.service?.title}</h3>
      <p className="account-category">{b.service?.category}</p>

      <div className="account-booking-meta">
        <span>
          <FiCalendar />{" "}
          {b.selectedDate
            ? new Date(b.selectedDate).toLocaleDateString("en-IN")
            : "N/A"}
        </span>

        <span>
          <FiClock /> {b.selectedTime}
        </span>
      </div>

      <div className="account-booking-address">
        <FiMapPin /> {b.address?.flat}, {b.address?.locality}
      </div>
    </div>

    {/* RIGHT STATUS */}
    <div className={`account-status ${b.status}`}>
      {b.status}
    </div>

  </div>
))}


         {/* 🔥 PAYMENTS */}
        {activeTab==="payments" && (
          <table className="account-payment-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>

  {bookings.map(b => (
    <tr key={b._id}>
      <td>{b.service?.title}</td>

      <td>
        {b.selectedDate
  ? new Date(b.selectedDate).toLocaleDateString("en-IN")
  : "N/A"} | {b.selectedTime}
      </td>

      <td>₹{b.amount}</td>

      <td className="account-paid">
        {b.paymentStatus}
      </td>
<td>
  <img
    src={b.service?.image?.url || b.service?.image}
    width="50"
  />
</td>
    </tr>
  ))}
</tbody>
          </table>
        )}

        {/* 🔥 PROFILE */}
        {activeTab==="profile" && (
          <div className="account-profile-form">

            <input name="name" value={user.name || ""} placeholder="Enter full name" readOnly />
            <input name="email" value={user.email || ""} placeholder="Enter email" readOnly />
            <input name="phone" value={user.phone || ""} placeholder="Enter phone number" onChange={(e)=>setUser({...user, phone:e.target.value})} />
            <input name="address" value={user.address || ""} placeholder="Enter address" onChange={(e)=>setUser({...user, address:e.target.value})} />

            <button className="account-save-btn" onClick={handleSave}>
              Save Changes
            </button>

          </div>
        )}

      </div>

    </div>
  );
};

export default AccountPage;