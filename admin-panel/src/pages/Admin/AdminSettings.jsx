import React, { useState } from "react";
import "./AdminSettings.css";

const AdminSettings = () => {
  const [toggles, setToggles] = useState([true, true, false, false]);

  const handleToggle = (index) => {
    const updated = [...toggles];
    updated[index] = !updated[index];
    setToggles(updated);
  };

  return (
    <div className="aps-wrapper">

      {/* Header */}
      <div className="aps-header">
        <h2>Settings</h2>
        <p>Manage platform configuration</p>
      </div>

      {/* General Settings */}
      <div className="aps-card">
        <h3>General Settings</h3>

        <div className="aps-grid">
          <div className="aps-field">
            <label>Platform Name</label>
            <input defaultValue="Skillora" />
          </div>

          <div className="aps-field">
            <label>Support Email</label>
            <input defaultValue="support@skillora.com" />
          </div>
        </div>

        <div className="aps-field">
          <label>Platform Description</label>
          <textarea defaultValue="A modern service marketplace connecting skilled professionals with clients." />
        </div>
      </div>

      {/* Notifications */}
      <div className="aps-card">
        <h3>Notifications</h3>

        {[
          { label: "Email Notifications", desc: "Receive email alerts" },
          { label: "New Vendor Alerts", desc: "New vendor applies" },
          { label: "Booking Alerts", desc: "New bookings" },
          { label: "Payment Alerts", desc: "Payments & refunds" },
        ].map((item, i) => (
          <div key={i} className="aps-toggle-row">

            <div>
              <p className="aps-label">{item.label}</p>
              <p className="aps-desc">{item.desc}</p>
            </div>

            {/* Toggle */}
            <div
              className={`aps-switch ${toggles[i] ? "aps-on" : ""}`}
              onClick={() => handleToggle(i)}
            >
              <div className="aps-circle"></div>
            </div>

          </div>
        ))}
      </div>

      {/* Commission */}
      <div className="aps-card">
        <h3>Commission Settings</h3>

        <div className="aps-grid">
          <div className="aps-field">
            <label>Platform Commission (%)</label>
            <input type="number" defaultValue="15" />
          </div>

          <div className="aps-field">
            <label>Minimum Payout ($)</label>
            <input type="number" defaultValue="50" />
          </div>
        </div>

        <button className="aps-btn">Save Changes</button>
      </div>

    </div>
  );
};

export default AdminSettings;