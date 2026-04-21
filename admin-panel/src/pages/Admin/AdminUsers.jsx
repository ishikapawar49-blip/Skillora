import React, { useEffect, useState } from "react";
import { MoreHorizontal, Eye, Ban, Trash2 } from "lucide-react";
import "./AdminUsers.css";

const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("");

const getStatusClass = (status) => {
  if (status === "active") return "badge active";
  if (status === "inactive") return "badge inactive";
  return "badge pending";
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  // 🔥 FETCH USERS
  const fetchUsers = async () => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

      const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      // ✅ FIX: always ensure array
      setUsers(Array.isArray(data) ? data : data.users || []);
    } catch (error) {
      console.log(error);
      setUsers([]); // fallback
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // ❌ DELETE USER
  const handleDelete = async (id) => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

      await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // 🚫 BLOCK USER
  const handleBlock = async (id) => {
    try {
      const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

      await fetch(`http://localhost:5000/api/admin/users/${id}/block`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${adminInfo?.token}`,
        },
      });

      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  };

  // 🔍 SAFE FILTER
  const filteredUsers = Array.isArray(users)
    ? users.filter((u) =>
        u.name?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

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
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((u, i) => (
                <tr key={u._id}>
                  
                  {/* User */}
                  <td>
                    <div className="user-cell">
                      <div className="avatar">
                        {getInitials(u.name)}
                      </div>
                      <div>
                        <p className="name">{u.name}</p>
                        <p className="email">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td>{u.phone || "-"}</td>

                  {/* Date */}
                  <td>
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>{u.bookings || 0}</td>

                  {/* Status */}
                  <td>
                    <span className={getStatusClass(u.status || "active")}>
                      {u.status || "active"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="actions">
                    <button
                      onClick={() =>
                        setOpenIndex(openIndex === i ? null : i)
                      }
                    >
                      <MoreHorizontal size={18} />
                    </button>

                    {openIndex === i && (
                      <div className="dropdown">
                        <p>
                          <Eye size={14} /> View
                        </p>

                        <p onClick={() => handleBlock(u._id)}>
                          <Ban size={14} /> Block
                        </p>

                        <p
                          className="danger"
                          onClick={() => handleDelete(u._id)}
                        >
                          <Trash2 size={14} /> Delete
                        </p>
                      </div>
                    )}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;