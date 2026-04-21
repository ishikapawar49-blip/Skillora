import React, { useState } from "react";
import { Bell, Search, ChevronDown } from "lucide-react";
import "./VendorNavbar.css";

const VendorNavbar = ({ title, userName, userRole }) => {
  const [open, setOpen] = useState(false);

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <header className="ven-nav">

      {/* LEFT */}
      <div className="ven-nav-left">
        <button className="ven-nav-menu"></button>
        <h1>{title}</h1>
      </div>

      {/* RIGHT */}
      <div className="ven-nav-right">

        {/* SEARCH */}
        <div className="ven-nav-search">
          <Search className="ven-nav-search-icon" />
          <input type="text" placeholder="Search..." />
        </div>

        {/* BELL */}
        <div className="ven-nav-bell">
          <Bell />
          <span className="ven-nav-dot"></span>
        </div>

        {/* PROFILE */}
        <div className="ven-nav-profile" onClick={() => setOpen(!open)}>
          <div className="ven-nav-avatar">{initials}</div>

          <div className="ven-nav-user">
            <span className="ven-nav-name">{userName}</span>
            <span className="ven-nav-role">{userRole}</span>
          </div>

          <ChevronDown className="ven-nav-chevron" />

          {open && (
            <div className="ven-nav-dropdown">
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

export default VendorNavbar;