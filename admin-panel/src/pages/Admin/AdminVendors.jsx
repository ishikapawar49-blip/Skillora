import React, { useEffect, useState } from "react";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import "./AdminVendors.css";

const AdminVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // 🔥 FETCH VENDORS
  const fetchVendors = async () => {
    try {
const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
const token = adminInfo?.token;

      const res = await fetch("http://localhost:5000/api/admin/vendors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("DATA:", data); // debug

      setVendors(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // ✅ APPROVE
  const handleApprove = async (id) => {
  try {
    console.log("APPROVE CLICKED:", id); // 👈 ADD

const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
const token = adminInfo?.token;

    const res = await fetch(
      `http://localhost:5000/api/admin/vendors/${id}/approve`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("APPROVE RESPONSE:", data); // 👈 ADD

    fetchVendors();
  } catch (error) {
    console.log(error);
  }
};

  // ❌ REJECT
const handleReject = async (id) => {
  try {
    console.log("REJECT CLICKED:", id); // 👈 ADD

const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
const token = adminInfo?.token;

    const res = await fetch(
      `http://localhost:5000/api/admin/vendors/${id}/reject`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("REJECT RESPONSE:", data); // 👈 ADD

    fetchVendors();
  } catch (error) {
    console.log(error);
  }
};


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
              <th>Email</th>
              <th>Services</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No vendors found
                </td>
              </tr>
            ) : (
              vendors.map((v) => (
                <tr key={v._id}>
                  
                  {/* Vendor */}
                  <td className="vendor-cell">

  {v.profileImage ? (
    <img
      src={v.profileImage}
      alt=""
      className="vendor-img"
    />
  ) : (
    <div className="avatar">
      {v.ownerName?.[0]}
    </div>
  )}

  <div>
    <p className="name">{v.businessName || "No Business"}</p>
    <p className="owner">{v.ownerName}</p>
  </div>

</td>

                  <td>{v.email}</td>

                  <td>{v.services || 0}</td>

                  {/* Status */}
                  <td>
                   <span className={`status ${v.status || "pending"}`}>
  {v.status || "pending"}
</span>
                  </td>

                  {/* Actions */}
                  <td>
                    <div className="actions">
                      
                      {/* 👁 VIEW */}
                     <Eye
  style={{ cursor: "pointer", color: "#2563eb" }}
  onClick={() => setSelectedVendor(v)}
/>
                      {/* ✔ APPROVE */}
                      {v.status !== "approved" && (
                      <CheckCircle
                        style={{ cursor: "pointer", color: "green" }}
                        onClick={() => handleApprove(v._id)}
                      />
                      )}

                      {/* ❌ DELETE */}
                      {v.status !== "rejected" && (
                      <XCircle
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleReject(v._id)}
                      />
                      )}

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
        {selectedVendor && (
  <div className="modal">
    <div className="modal-box">

      <h2>{selectedVendor.businessName}</h2>

      {selectedVendor.profileImage && (
        <img
          src={selectedVendor.profileImage}
          className="big-img"
          alt=""
        />
      )}

      <p><b>Owner:</b> {selectedVendor.ownerName}</p>
      <p><b>Email:</b> {selectedVendor.email}</p>
      <p><b>Phone:</b> {selectedVendor.phone}</p>
      <p><b>Address:</b> {selectedVendor.address}</p>
      <p><b>Bio:</b> {selectedVendor.bio}</p>
      <h3>Documents</h3>

      <div className="docs">
        {selectedVendor.documents?.length > 0 ? (
          selectedVendor.documents.map((doc, i) => (
            <a
  key={i}
  href={doc.url}
  target="_blank"
  rel="noreferrer"
>
  {doc.name}
</a>
          ))
        ) : (
          <p>No Documents</p>
        )}
      </div>

      <button onClick={() => setSelectedVendor(null)}>
        Close
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default AdminVendors;