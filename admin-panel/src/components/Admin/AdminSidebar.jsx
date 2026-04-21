import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  Briefcase,
  CalendarCheck,
  CreditCard,
  Star,
  Bell,
  Settings,
} from "lucide-react";
import "./AdminSidebar.css";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, exact: true },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Vendors", url: "/admin/vendors", icon: Store },
  { title: "Services", url: "/admin/services", icon: Briefcase },
  { title: "Bookings", url: "/admin/bookings", icon: CalendarCheck },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
  { title: "Reviews", url: "/admin/reviews", icon: Star },
  { title: "Notifications", url: "/admin/notifications", icon: Bell },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  return (
    <div className="sidebar">
      
      {/* Header */}
      <div className="sidebar-header">
        <div className="logo-box">S</div>
        <div className="logo-text">
          <h2>Skillora</h2>
          <p>Admin Panel</p>
        </div>
      </div>

      {/* Menu */}
      <div className="sidebar-menu">
        <p className="menu-title">MENU</p>

        <ul>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.title}>
                <NavLink
                  to={item.url}
                  end={item.exact}
                  className={({ isActive }) =>
                    isActive ? "menu-link active" : "menu-link"
                  }
                >
                  <Icon className="icon" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;