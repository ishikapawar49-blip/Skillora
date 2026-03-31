import React from "react";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Users,
  CreditCard,
} from "lucide-react";
import "./AdminNotifications.css";

const notifications = [
  { id: 1, type: "vendor", icon: Users, title: "New Vendor Application", message: "FitLife Training has submitted a new vendor application.", time: "2 min ago", read: false },
  { id: 2, type: "payment", icon: CreditCard, title: "Payment Received", message: "Payment of $500 received from Tom Anderson.", time: "15 min ago", read: false },
  { id: 3, type: "alert", icon: AlertCircle, title: "Review Flagged", message: "A review on Beauty Pro Studio has been flagged.", time: "1 hour ago", read: false },
  { id: 4, type: "info", icon: Info, title: "System Update", message: "Platform maintenance scheduled.", time: "3 hours ago", read: true },
  { id: 5, type: "success", icon: CheckCircle, title: "Vendor Approved", message: "Code Academy Plus is now live.", time: "5 hours ago", read: true },
  { id: 6, type: "vendor", icon: Users, title: "New User Registration", message: "15 new users registered.", time: "8 hours ago", read: true },
];

const AdminNotifications = () => {
  return (
    <div className="ant-wrapper">

      {/* Header */}
      <div className="ant-header">
        <div>
          <h2>Notifications</h2>
          <p>Stay updated with platform activity</p>
        </div>

        <button className="ant-btn">Mark all as read</button>
      </div>

      {/* List */}
      <div className="ant-list">
        {notifications.map((n) => {
          const Icon = n.icon;

          return (
            <div
              key={n.id}
              className={`ant-card ${!n.read ? "ant-unread" : ""}`}
            >
              
              {/* Icon */}
              <div className={`ant-icon-box ${!n.read ? "ant-gradient" : ""}`}>
                <Icon className="ant-icon" />
              </div>

              {/* Content */}
              <div className="ant-content">
                <div className="ant-top">
                  <p className={`ant-title ${!n.read ? "ant-bold" : ""}`}>
                    {n.title}
                  </p>
                  <span className="ant-time">{n.time}</span>
                </div>

                <p className="ant-message">{n.message}</p>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AdminNotifications;