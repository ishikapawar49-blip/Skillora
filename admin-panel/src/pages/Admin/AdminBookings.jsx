import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import "./AdminBookings.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:5000/api/admin/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBookings(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="abk-wrapper">

      <div className="abk-header">
        <h2>Bookings Management</h2>
        <p>Track and manage all bookings</p>
      </div>

      <div className="abk-table-container">
        <table className="abk-table">

          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Customer</th>
              <th>Vendor</th>
              <th>Service</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>

                <td className="abk-id">
                  #{b.bookingNumber}
                </td>

                <td>{b.user?.name}</td>

                <td>
                  {b.vendor?.businessName || b.vendor?.name}
                </td>

                <td>{b.service?.title}</td>

                <td>
                  {new Date(b.selectedDate).toLocaleDateString()}
                </td>

               <td className="abk-amount-cell">

  <div className="abk-total">
    ₹{b.totalAmount}
  </div>

  <div className="abk-split">
    Vendor: ₹{b.vendorEarning || 0}
  </div>

  <div className="abk-split admin-cut">
    Admin: ₹{b.adminEarning || 0}
  </div>

</td>

                <td>
                  <span className={`abk-status abk-${b.status}`}>
                    {b.status}
                  </span>
                </td>

                <td>
                  <span className={`abk-status abk-${b.paymentStatus}`}>
                    {b.paymentStatus}
                  </span>
                </td>

                <td>
                  <div className="abk-actions">
                    <Eye />
                  </div>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default AdminBookings;