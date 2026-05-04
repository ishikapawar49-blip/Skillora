import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Users,
  CreditCard,
} from "lucide-react";
import "./AdminNotifications.css";

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  // 🔥 ICON MAP (type ke basis pe)
  const iconMap = {
    vendor: Users,
    payment: CreditCard,
    alert: AlertCircle,
    info: Info,
    success: CheckCircle,
    user: Users,
    booking: Bell,
    withdraw: CreditCard,
  };

  // ✅ FETCH FUNCTION
  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/notifications`
      );
      setNotifications(res.data);
    } catch (err) {
      console.log("Error fetching notifications", err);
    }
  };

  // ✅ INITIAL LOAD
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔥 REAL-TIME (polling every 5 sec)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // ✅ MARK ALL READ
  const markAllRead = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/notifications/read`
      );
      fetchNotifications(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="ant-wrapper">

      {/* Header */}
      <div className="ant-header">
        <div>
          <h2>Notifications</h2>
          <p>Stay updated with platform activity</p>
        </div>

        <button className="ant-btn" onClick={markAllRead}>
          Mark all as read
        </button>
      </div>

      {/* List */}
      <div className="ant-list">
        {notifications.map((n) => {
          const Icon = iconMap[n.type] || Bell;

          return (
            <div
              key={n._id}
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

                  <span className="ant-time">
                    {new Date(n.createdAt).toLocaleString()}
                  </span>
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