import { Outlet } from "react-router-dom";
import VendorSidebar from "../components/Vendor/VendorSidebar";
import VendorNavbar from "../components/Vendor/VendorNavbar";
import "./VendorLayout.css";

const VendorLayout = () => {
  return (
    <div className="ven-layout">

      {/* SIDEBAR */}
      <VendorSidebar />

      {/* MAIN */}
      <div className="ven-layout-main">

        {/* NAVBAR */}
        <VendorNavbar
          title="Vendor Panel"
          userName="Maria Garcia"
          userRole="Vendor"
        />

        {/* CONTENT */}
        <div className="ven-layout-content">
          <Outlet />
        </div>

      </div>

    </div>
  );
};

export default VendorLayout;