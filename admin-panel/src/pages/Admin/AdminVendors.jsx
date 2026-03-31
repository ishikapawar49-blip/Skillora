import React from "react";
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import "./AdminVendors.css";

const vendors = [
  { id: 1, name: "Beauty Pro Studio", owner: "Maria Garcia", category: "Beauty", status: "approved", rating: 4.8, services: 12 },
  { id: 2, name: "FitLife Training", owner: "Jake Thompson", category: "Fitness", status: "pending", rating: 0, services: 5 },
  { id: 3, name: "Code Academy Plus", owner: "Sarah Chen", category: "Education", status: "approved", rating: 4.9, services: 8 },
  { id: 4, name: "Zen Spa & Wellness", owner: "Lily Patel", category: "Wellness", status: "approved", rating: 4.7, services: 15 },
  { id: 5, name: "Quick Fix Repairs", owner: "Tom Rodriguez", category: "Home Services", status: "rejected", rating: 0, services: 3 },
  { id: 6, name: "Chef's Table", owner: "Pierre Dupont", category: "Food", status: "pending", rating: 0, services: 6 },
  { id: 7, name: "Snap Photography", owner: "Alex Kim", category: "Photography", status: "approved", rating: 4.6, services: 10 },
  { id: 8, name: "Green Thumb Gardens", owner: "Emily Rose", category: "Gardening", status: "approved", rating: 4.5, services: 7 },
];

const AdminVendors = () => {
  return (
    <div className="vendors">

      {/* Header */}
      <div className="vendors-header">
        <h2>Vendor Management</h2>
        <p>Review and manage vendor applications</p>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Vendor</th>
              <th>Category</th>
              <th>Services</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((v) => (
              <tr key={v.id}>
                
                {/* Vendor */}
                <td className="vendor-cell">
                  <div className="avatar">{v.name[0]}</div>
                  <div>
                    <p className="name">{v.name}</p>
                    <p className="owner">{v.owner}</p>
                  </div>
                </td>

                <td>{v.category}</td>
                <td>{v.services}</td>

                {/* Rating */}
                <td>{v.rating > 0 ? `⭐ ${v.rating}` : "—"}</td>

                {/* Status */}
                <td>
                  <span className={`status ${v.status}`}>
                    {v.status}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="actions">
                    <Eye />
                    <CheckCircle />
                    <XCircle />
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

export default AdminVendors;