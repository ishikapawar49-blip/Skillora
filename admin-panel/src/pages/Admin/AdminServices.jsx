import React from "react";
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import "./AdminServices.css";

const services = [
  { id: 1, name: "Hair Styling", category: "Beauty", vendor: "Beauty Pro Studio", price: "$50", status: "active" },
  { id: 2, name: "Personal Training", category: "Fitness", vendor: "FitLife Training", price: "$80/hr", status: "active" },
  { id: 3, name: "Web Development Course", category: "Education", vendor: "Code Academy Plus", price: "$200", status: "active" },
  { id: 4, name: "Deep Tissue Massage", category: "Wellness", vendor: "Zen Spa & Wellness", price: "$90", status: "active" },
  { id: 5, name: "Plumbing Repair", category: "Home Services", vendor: "Quick Fix Repairs", price: "$60/hr", status: "inactive" },
  { id: 6, name: "Private Dinner", category: "Food", vendor: "Chef's Table", price: "$150/person", status: "active" },
  { id: 7, name: "Wedding Photography", category: "Photography", vendor: "Snap Photography", price: "$500", status: "active" },
  { id: 8, name: "Garden Design", category: "Gardening", vendor: "Green Thumb Gardens", price: "$120", status: "active" },
  { id: 9, name: "Makeup Session", category: "Beauty", vendor: "Beauty Pro Studio", price: "$75", status: "active" },
  { id: 10, name: "Yoga Class", category: "Fitness", vendor: "FitLife Training", price: "$25/class", status: "active" },
];

const AdminServices = () => {
  return (
    <div className="services">

      {/* Header */}
      <div className="services-header">
        <div>
          <h2>Services Management</h2>
          <p>Manage all services on the platform</p>
        </div>

        <button className="add-btn">
          <Plus /> Add Service
        </button>
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Category</th>
              <th>Vendor</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {services.map((s) => (
              <tr key={s.id}>
                
                <td className="service-name">{s.name}</td>

                <td>
                  <span className="badge">{s.category}</span>
                </td>

                <td>{s.vendor}</td>

                <td className="price">{s.price}</td>

                <td>
                  <div className="actions">
                    <Edit />
                    <Trash2 />
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

export default AdminServices;