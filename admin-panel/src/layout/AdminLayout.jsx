import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminNavbar from "../components/Admin/AdminNavbar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Right Side */}
      <div className="admin-right">

        {/* Navbar */}
        <AdminNavbar
          title="Dashboard"
          userName="Ishika Pawar"
          userRole="Admin"
        />

        {/* Content */}
        <div className="admin-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default AdminLayout;