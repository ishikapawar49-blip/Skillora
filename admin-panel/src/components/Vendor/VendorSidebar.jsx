import {
  LayoutDashboard, User, Briefcase, CalendarCheck, Calendar, DollarSign, Star, Bell,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "./VendorSidebar.css";

const items = [
  { title: "Dashboard", url: "/vendor", icon: LayoutDashboard },
  { title: "Profile", url: "/vendor/profile", icon: User },
  { title: "Services", url: "/vendor/services", icon: Briefcase },
  { title: "Bookings", url: "/vendor/bookings", icon: CalendarCheck },
  { title: "Schedule", url: "/vendor/schedule", icon: Calendar },
  { title: "Earnings", url: "/vendor/earnings", icon: DollarSign },
  { title: "Reviews", url: "/vendor/reviews", icon: Star },
  { title: "Notifications", url: "/vendor/notifications", icon: Bell },
];

export default function VendorSidebar() {
  return (
    <div className="vendor-sidebar">
      
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-box">S</div>
        <div>
          <h2 className="logo-text">Skillora</h2>
          <p className="sub-text">Vendor Panel</p>
        </div>
      </div>

      {/* Menu */}
      <div className="menu-section">
        <p className="menu-title">Menu</p>

        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              to={item.url}
              key={item.title}
              end={item.url === "/vendor"}
              className={({ isActive }) =>
                isActive
                  ? "menu-item active"
                  : "menu-item"
              }
            >
              <Icon className="menu-icon" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </div>

    </div>
  );
}