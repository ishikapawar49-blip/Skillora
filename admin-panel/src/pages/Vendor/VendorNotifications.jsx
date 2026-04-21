import { useEffect, useState } from "react";
import "./VendorNotifications.css";
import {
  CalendarCheck,
  CreditCard,
  Star,
  Bell,
  Info,
} from "lucide-react";

export default function VendorNotifications() {

const [notifications, setNotifications] = useState([]);

 // ✅ ICON MAPPER (FIXED POSITION)
  const getIcon = (type) => {
    switch (type) {
      case "booking":
        return CalendarCheck;
      case "payment":
        return CreditCard;
      case "review":
        return Star;
      case "payout":
        return CreditCard;
      case "service":
        return Bell;
      case "reminder": 
      return Bell;
      default:
        return Info;
    }
  };

// ✅ FETCH FUNCTION (GLOBAL)
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("vendorToken");
      const res = await fetch("http://localhost:5000/api/vendor/notifications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setNotifications(data);
      } else {
        console.log("❌ API ERROR:", data);
        setNotifications([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ FIRST LOAD
  useEffect(() => {
    fetchData();
  }, []);

  // ✅ AUTO REFRESH (REALTIME FEEL)
  useEffect(() => {
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✅ MARK ALL
  const markAll = async () => {
    const token = localStorage.getItem("vendorToken");
    await fetch("http://localhost:5000/api/vendor/notifications/read", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchData(); // ✅ better than reload
  };


  return (
    <div className="ven-noti-container">

      {/* HEADER */}
      <div className="ven-noti-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with your bookings and activity</p>
        </div>

        <button className="ven-noti-btn" onClick={markAll}>
          Mark all as read
        </button>
      </div>

      {/* LIST */}
      <div className="ven-noti-list">
        {notifications.map((n) => {
          const Icon = getIcon(n.type);

          return (
            <div
              key={n._id}
              className={`ven-noti-card ${!n.isRead ? "unread" : ""}`}
            >

              {/* ICON */}
              <div className={`ven-noti-icon ${!n.isRead ? "active" : ""}`}>
                <Icon size={16} />
              </div>

              {/* CONTENT */}
              <div className="ven-noti-content">

                <div className="ven-noti-top">
                  <p className={`title ${!n.isRead ? "bold" : ""}`}>
                    {n.title || "Notification"}
                  </p>
                  <span>{new Date(n.createdAt).toLocaleString()}</span>
                </div>

                <p className="message">{n.message}</p>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}