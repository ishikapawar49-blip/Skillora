import "./VendorNotifications.css";
import {
  CalendarCheck,
  CreditCard,
  Star,
  Bell,
  Info,
} from "lucide-react";

const notifications = [
  { id: 1, icon: CalendarCheck, title: "New Booking Request", message: "Mike Chen booked a Makeup Session for Dec 16 at 2:00 PM.", time: "5 min ago", read: false },
  { id: 2, icon: CalendarCheck, title: "Booking Confirmed", message: "Sarah Johnson confirmed her Hair Styling appointment for Dec 15.", time: "1 hour ago", read: false },
  { id: 3, icon: CreditCard, title: "Payment Received", message: "You received $50 for booking #B-104 (Hair Styling).", time: "3 hours ago", read: false },
  { id: 4, icon: Star, title: "New Review", message: "Sarah Johnson left a 5-star review for Hair Styling.", time: "5 hours ago", read: true },
  { id: 5, icon: Info, title: "Profile Update Required", message: "Please update your business documents before Dec 31.", time: "1 day ago", read: true },
  { id: 6, icon: CreditCard, title: "Payout Processed", message: "Your withdrawal of $2,800 has been processed successfully.", time: "2 days ago", read: true },
  { id: 7, icon: Bell, title: "Holiday Reminder", message: "Update your availability for holidays.", time: "3 days ago", read: true },
];

export default function VendorNotifications() {
  return (
    <div className="ven-noti-container">

      {/* HEADER */}
      <div className="ven-noti-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with your bookings and activity</p>
        </div>

        <button className="ven-noti-btn">Mark all as read</button>
      </div>

      {/* LIST */}
      <div className="ven-noti-list">
        {notifications.map((n) => {
          const Icon = n.icon;

          return (
            <div
              key={n.id}
              className={`ven-noti-card ${!n.read ? "unread" : ""}`}
            >

              {/* ICON */}
              <div className={`ven-noti-icon ${!n.read ? "active" : ""}`}>
                <Icon size={16} />
              </div>

              {/* CONTENT */}
              <div className="ven-noti-content">

                <div className="ven-noti-top">
                  <p className={`title ${!n.read ? "bold" : ""}`}>
                    {n.title}
                  </p>
                  <span>{n.time}</span>
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