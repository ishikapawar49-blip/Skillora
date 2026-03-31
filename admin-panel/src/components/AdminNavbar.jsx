import React, { useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import "./AdminNavbar.css";

const AdminNavbar = ({ title, userName, userRole }) => {
  const [open, setOpen] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="navbar">
      
      {/* Left */}
      <div className="nav-left">
        <button className="menu-btn"></button>
        <h1>{title}</h1>
      </div>

      {/* Right */}
      <div className="nav-right">
        
        {/* Search */}
        <div className="search-box">
          <Search className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        {/* Bell */}
        <div className="bell">
          <Bell />
          <span className="dot"></span>
        </div>

        {/* Profile */}
        <div className="profile" onClick={() => setOpen(!open)}>
          <div className="avatar">{initials}</div>

          <div className="user-info">
            <span className="name">{userName}</span>
            <span className="role">{userRole}</span>
          </div>

          <ChevronDown className="chevron" />

          {open && (
            <div className="dropdown">
              <p>Profile</p>
              <p>Settings</p>
              <p>Logout</p>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default AdminNavbar;