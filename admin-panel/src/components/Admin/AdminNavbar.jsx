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
    <header className="admin-navbar">
      
      {/* Left */}
      <div className="admin-nav-left">
        <button className="admin-menu-btn"></button>
        <h1>{title}</h1>
      </div>

      {/* Right */}
      <div className="admin-nav-right">
        
        {/* Search */}
        <div className="admin-search-box">
          <Search className="admin-search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        {/* Bell */}
        <div className="admin-bell">
          <Bell />
          <span className="admin-dot"></span>
        </div>

        {/* Profile */}
        <div className="admin-profile" onClick={() => setOpen(!open)}>
          <div className="admin-avatar">{initials}</div>

          <div className="admin-user-info">
            <span className="admin-name">{userName}</span>
            <span className="admin-role">{userRole}</span>
          </div>

          <ChevronDown className="admin-chevron" />

          {open && (
            <div className="admin-dropdown">
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