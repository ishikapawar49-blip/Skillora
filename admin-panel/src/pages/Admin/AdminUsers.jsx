import React, { useState } from "react";
import {
  MoreHorizontal,
  Eye,
  Ban,
  Trash2,
} from "lucide-react";
import "./AdminUsers.css";

const users = [
  { id: 1, name: "Sarah Johnson", email: "sarah@email.com", phone: "+1 234 567", status: "active", joined: "Jan 12, 2024", bookings: 8 },
  { id: 2, name: "Mike Chen", email: "mike@email.com", phone: "+1 345 678", status: "active", joined: "Feb 3, 2024", bookings: 12 },
  { id: 3, name: "Emma Wilson", email: "emma@email.com", phone: "+1 456 789", status: "inactive", joined: "Mar 15, 2024", bookings: 3 },
  { id: 4, name: "James Brown", email: "james@email.com", phone: "+1 567 890", status: "active", joined: "Apr 7, 2024", bookings: 5 },
  { id: 5, name: "Lisa Davis", email: "lisa@email.com", phone: "+1 678 901", status: "pending", joined: "May 20, 2024", bookings: 0 },
];

const getInitials = (name) =>
  name.split(" ").map(n => n[0]).join("");

const getStatusClass = (status) => {
  if (status === "active") return "badge active";
  if (status === "inactive") return "badge inactive";
  return "badge pending";
};

const AdminUsers = () => {
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="users-page">

      {/* Header */}
      <div className="users-header">
        <div>
          <h2>User Management</h2>
          <p>Manage all registered users</p>
        </div>

        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Phone</th>
              <th>Joined</th>
              <th>Bookings</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={u.id}>
                
                {/* User */}
                <td>
                  <div className="user-cell">
                    <div className="avatar">{getInitials(u.name)}</div>
                    <div>
                      <p className="name">{u.name}</p>
                      <p className="email">{u.email}</p>
                    </div>
                  </div>
                </td>

                <td>{u.phone}</td>
                <td>{u.joined}</td>
                <td>{u.bookings}</td>

                {/* Status */}
                <td>
                  <span className={getStatusClass(u.status)}>
                    {u.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="actions">
                  <button onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                    <MoreHorizontal size={18} />
                  </button>

                  {openIndex === i && (
                    <div className="dropdown">
                      <p><Eye size={14} /> View</p>
                      <p><Ban size={14} /> Block</p>
                      <p className="danger"><Trash2 size={14} /> Delete</p>
                    </div>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminUsers;