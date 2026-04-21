import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Auth
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";


// Admin
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminVendors from "./pages/Admin/AdminVendors";
import AdminServices from "./pages/Admin/AdminServices";
import AdminBookings from "./pages/Admin/AdminBookings";
import AdminPayments from "./pages/Admin/AdminPayments";
import AdminReviews from "./pages/Admin/AdminReviews";
import AdminNotifications from "./pages/Admin/AdminNotifications";
import AdminSettings from "./pages/Admin/AdminSettings";

// Vendor
import VendorLayout from "./layout/VendorLayout";
import VendorDashboard from "./pages/Vendor/VendorDashboard";
import VendorProfile from "./pages/Vendor/VendorProfile";
import VendorServices from "./pages/Vendor/VendorServices";
import AddService from "./pages/Vendor/VendorAddServices";
import VendorBookings from "./pages/Vendor/VendorBookings";
import VendorSchedule from "./pages/Vendor/VendorSchedule";
import VendorEarnings from "./pages/Vendor/VendorEarnings";
import VendorReviews from "./pages/Vendor/VendorReviews";
import VendorNotifications from "./pages/Vendor/VendorNotifications";

function App() {
  return (
    
    <Routes>
        
      {/* AUTH */}
      {/* Login Page */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

      {/* ADMIN ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="vendors" element={<AdminVendors />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* VENDOR ROUTES 🔥 */}
      <Route path="/vendor" element={<VendorLayout />}>
        <Route index element={<VendorDashboard />} />
        <Route path="profile" element={<VendorProfile />} />
        <Route path="services" element={<VendorServices />} />
        <Route path="/vendor/services/add" element={<AddService />} />
        <Route path="bookings" element={<VendorBookings />} />
        <Route path="schedule" element={<VendorSchedule />} />
        <Route path="earnings" element={<VendorEarnings />} />
        <Route path="reviews" element={<VendorReviews />} />
        <Route path="notifications" element={<VendorNotifications />} /> 
      </Route>

    </Routes>
  );
}

export default App;