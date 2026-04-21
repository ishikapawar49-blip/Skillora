import React, { useEffect, useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import "./VendorNavbar.css";
import { useNavigate } from "react-router-dom";

const VendorNavbar = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [unread, setUnread] = useState(0);

  const navigate = useNavigate();

  // ✅ FETCH PROFILE
  const fetchProfile = async () => {
    const token = localStorage.getItem("vendorToken");

    const res = await fetch("http://localhost:5000/api/vendor/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setVendor(data);
  };

  // ✅ FETCH UNREAD COUNT
  const fetchUnread = async () => {
    const token = localStorage.getItem("vendorToken");

    const res = await fetch(
      "http://localhost:5000/api/vendor/notifications/unread-count",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setUnread(data.count);
  };

  useEffect(() => {
    fetchProfile();
    fetchUnread();

    const interval = setInterval(fetchUnread, 5000); // realtime feel
    return () => clearInterval(interval);
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/");
  };

  if (!vendor) return null;

  return (
    <header className="ven-nav">

      {/* LEFT */}
      <div className="ven-nav-left">
        <h1>{title}</h1>
      </div>

      {/* RIGHT */}
      <div className="ven-nav-right">

        {/* 🔔 NOTIFICATION */}
        <div
          className="ven-nav-bell"
          onClick={() => navigate("/vendor/notifications")}
        >
          <Bell />
          {unread > 0 && (
  <span className="ven-nav-badge">
    {unread > 99 ? "99+" : unread}
  </span>
)}
        </div>

        {/* 👤 PROFILE */}
        <div className="ven-nav-profile" onClick={() => setOpen(!open)}>

          {/* ✅ PROFILE IMAGE */}
          <img
            src={vendor.profileImage}
            alt="profile"
            className="ven-nav-avatar-img"
          />

          <div className="ven-nav-user">
            <span className="ven-nav-name">{vendor.ownerName}</span>
            <span className="ven-nav-role">Vendor</span>
          </div>

          <ChevronDown />

          {open && (
            <div className="ven-nav-dropdown">
              <p onClick={() => navigate("/vendor/profile")}>Profile</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default VendorNavbar;