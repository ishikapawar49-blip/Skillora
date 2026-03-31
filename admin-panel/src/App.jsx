import { Routes, Route, Navigate } from "react-router-dom";
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin" />} />

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
    </Routes>
  );
}

export default App;