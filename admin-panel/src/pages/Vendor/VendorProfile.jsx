import "./VendorProfile.css";
import { Upload, Camera } from "lucide-react";
import { useEffect, useState } from "react";

export default function VendorProfile() {

  // 🔥 STATE
  const [vendor, setVendor] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
    profileImage: "",
    documents: []
  });

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/vendor/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
          }
        });

        const data = await res.json();
        setVendor({
  businessName: data.businessName || "",
  ownerName: data.ownerName || "",
  email: data.email || "",
  phone: data.phone || "",
  bio: data.bio || "",
  address: data.address || "",
  profileImage: data.profileImage || "",
  documents: data.documents || []
});

      } catch (err) {
        console.log(err);
      }
    };

    fetchVendor();
  }, []);

  // 🔥 INPUT CHANGE
  const handleChange = (e) => {
    setVendor({
      ...vendor,
      [e.target.name]: e.target.value
    });
  };

  // 🔥 SAVE PROFILE
  const handleSave = async () => {
    try {
      await fetch("http://localhost:5000/api/vendor/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
        },
        body: JSON.stringify(vendor)
      });

      alert("Profile updated ✅");

    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 PROFILE IMAGE UPLOAD
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/vendor/upload-image", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
      },
      body: formData
    });

    const data = await res.json();

    setVendor({
      ...vendor,
      profileImage: data.url
    });
  };

  // 🔥 DOCUMENT UPLOAD
  const handleDocUpload = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("documents", files[i]);
    }

    const res = await fetch("http://localhost:5000/api/vendor/upload-docs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("vendorToken")}`
      },
      body: formData
    });

    const data = await res.json();

    setVendor({
      ...vendor,
      documents: data.documents
    });
  };

 // 🔥 DELETE DOCUMENT
const deleteDocument = async (docId) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/vendor/document/${docId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("vendorToken")}`,
        },
      }
    );

    const data = await res.json();

    // 🔥 IMPORTANT: backend se updated list lo
    setVendor((prev) => ({
      ...prev,
      documents: data.documents,
    }));

  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="ven-pro-container">

      {/* HEADER */}
      <div className="ven-pro-header">
        <h1>Profile Management</h1>
        <p>Update your business profile and documents</p>
      </div>

      {/* PROFILE CARD */}
      <div className="ven-pro-card">
        <div className="ven-pro-top">

          {/* AVATAR */}
          <div className="ven-pro-avatar-box">

            {/* 🔥 IMAGE OR INITIAL */}
            {vendor.profileImage ? (
              <img src={vendor.profileImage} className="ven-pro-avatar" />
            ) : (
              <div className="ven-pro-avatar">
                {vendor.ownerName?.charAt(0)}
              </div>
            )}

            <label className="ven-pro-camera">
              <Camera size={12} />
              <input type="file" hidden onChange={handleImageUpload} />
            </label>
          </div>

          <div>
            <h3>{vendor.businessName || "Add Business Name"}</h3>
            <p>{vendor.ownerName}</p>
          </div>

        </div>

        {/* FORM */}
        <div className="ven-pro-form">

          <div className="ven-pro-grid">
            <div>
              <label>Business Name</label>
              <input
                name="businessName"
                value={vendor.businessName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Owner Name</label>
              <input value={vendor.ownerName} disabled />
            </div>

            <div>
              <label>Email</label>
              <input value={vendor.email} disabled />
            </div>

            <div>
              <label>Phone</label>
              <input
                name="phone"
                value={vendor.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label>Bio</label>
            <textarea
              name="bio"
              value={vendor.bio}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Address</label>
            <input
              name="address"
              value={vendor.address}
              onChange={handleChange}
            />
          </div>

        </div>
      </div>

      {/* DOCUMENT CARD */}
      <div className="ven-pro-card">
        <h3 className="ven-pro-title">Documents</h3>

        <div className="ven-pro-upload">
          <Upload size={28} />
          <p className="bold">Drop files here or click to upload</p>
          <p className="small">PDF, JPG, PNG up to 10MB</p>

          <label className="ven-pro-btn-outline">
            Choose Files
            <input type="file" multiple hidden onChange={handleDocUpload} />
          </label>
        </div>

        <div className="ven-pro-doc-list">
          {vendor.documents?.map((doc, index) => (
            <div key={index} className="ven-pro-doc-item">
              <span>{doc.name}</span>
              <div className="ven-doc-actions">
  <a href={doc.url} target="_blank">View</a>

  <button onClick={() => deleteDocument(doc._id)}>
    Delete
  </button>
</div>
            </div>
          ))}
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button className="ven-pro-save" onClick={handleSave}>
        Save Profile
      </button>

    </div>
  );
}