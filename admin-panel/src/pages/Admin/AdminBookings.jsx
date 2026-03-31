import React from "react";
import { MoreHorizontal, Eye } from "lucide-react";
import "./AdminBookings.css";

const bookings = [
  { id: "#B-3247", user: "Sarah Johnson", vendor: "Beauty Pro Studio", service: "Hair Styling", date: "Dec 15, 2024", amount: "$50", status: "completed" },
  { id: "#B-3246", user: "Mike Chen", vendor: "FitLife Training", service: "Personal Training", date: "Dec 14, 2024", amount: "$80", status: "pending" },
  { id: "#B-3245", user: "Emma Wilson", vendor: "Zen Spa", service: "Deep Tissue Massage", date: "Dec 14, 2024", amount: "$90", status: "completed" },
  { id: "#B-3244", user: "James Brown", vendor: "Code Academy", service: "Web Dev Course", date: "Dec 13, 2024", amount: "$200", status: "pending" },
  { id: "#B-3243", user: "Lisa Davis", vendor: "Chef's Table", service: "Private Dinner", date: "Dec 12, 2024", amount: "$150", status: "cancelled" },
  { id: "#B-3242", user: "Tom Anderson", vendor: "Snap Photo", service: "Wedding Photography", date: "Dec 11, 2024", amount: "$500", status: "completed" },
  { id: "#B-3241", user: "Anna Martinez", vendor: "Green Thumb", service: "Garden Design", date: "Dec 10, 2024", amount: "$120", status: "completed" },
  { id: "#B-3240", user: "David Lee", vendor: "Beauty Pro", service: "Makeup Session", date: "Dec 9, 2024", amount: "$75", status: "pending" },
  { id: "#B-3239", user: "Sophie Taylor", vendor: "FitLife", service: "Yoga Class", date: "Dec 8, 2024", amount: "$25", status: "completed" },
  { id: "#B-3238", user: "Ryan White", vendor: "Zen Spa", service: "Aromatherapy", date: "Dec 7, 2024", amount: "$70", status: "cancelled" },
];

const AdminBookings = () => {
  return (
    <div className="abk-wrapper">

      {/* Header */}
      <div className="abk-header">
        <h2>Bookings Management</h2>
        <p>Track and manage all bookings</p>
      </div>

      {/* Table */}
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
              <th></th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>

                <td className="abk-id">{b.id}</td>
                <td>{b.user}</td>
                <td>{b.vendor}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td className="abk-amount">{b.amount}</td>

                {/* Status */}
                <td>
                  <span className={`abk-status abk-${b.status}`}>
                    {b.status}
                  </span>
                </td>

                {/* Actions */}
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