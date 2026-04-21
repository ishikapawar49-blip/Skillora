import "./VendorAddServices.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AddService() {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state;
  const [image, setImage] = useState(null);

  // FORM STATE
  const [form, setForm] = useState({
    title: "",
    category: "Beauty",
    price: "",
    duration: "",
    description: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

/// SUBMIT (ADD or EDIT)
const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("vendorToken");

    if (!token) {
      alert("Login required");
      return;
    }

    const url = editData
      ? `http://localhost:5000/api/vendor/services/${editData._id}`
      : "http://localhost:5000/api/vendor/services";

    const method = editData ? "PUT" : "POST";

    const formData = new FormData();

formData.append("title", form.title);
formData.append("price", form.price);
formData.append("category", form.category);
formData.append("description", form.description);
formData.append("duration", form.duration);

if (image) {
  formData.append("image", image); // 🔥 IMPORTANT
}
    const res = await fetch(url, {
  method,
  headers: {
    Authorization: `Bearer ${token}`, // ❌ NO Content-Type
  },
  body: formData,
});

    let data;

try {
  data = await res.json();
} catch (err) {
  console.log("❌ Not JSON response (backend crash)");
}

if (!res.ok) {
  console.log("❌ ERROR STATUS:", res.status);
  console.log("❌ RESPONSE:", data);
  alert("Backend error aa raha hai");
  return;
}

    if (res.ok) {
      alert(editData ? "Service Updated ✅" : "Service Added ✅");
      navigate("/vendor/services");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log(error);
  }
};

// PREFILL FORM IF EDITING
useEffect(() => {
  if (editData) {
    setForm({
      title: editData.title || "",
      category: editData.category || "Beauty",
      price: editData.price || "",
      duration: editData.duration || "",
      description: editData.description || "",
    });
  }
}, [editData]);


  return (
    <div className="ven-add-container">

      {/* HEADER */}
      <div className="ven-add-header">
        <div>
          <h1>Add New Service</h1>
          <p>Create and list your service for customers</p>
        </div>

        <button
          className="ven-add-back"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

      {/* FORM */}
      <div className="ven-add-card">

        <div className="ven-add-grid">

          <div>
            <label>Service Name</label>
            <input name="title"
                   placeholder="e.g. Hair Styling" 
                   value={form.title}
                   onChange={handleChange}
            />
          </div>

          <div>
            <label>Category</label>
             <select name="category" 
              value={form.category}
             onChange={handleChange}>
              <option>Beauty</option>
              <option>Makeup</option>
              <option>Cleaning</option>
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Appliance Repair</option>
              <option>Painting</option>
            </select>
          </div>

          <div>
            <label>Price (₹)</label>
             <input name="price"  placeholder="50"  type="number"  value={form.price} onChange={handleChange}/>
          </div>

          <div>
            <label>Duration (min)</label>
            <input name="duration" type="number" placeholder="60" value={form.duration} onChange={handleChange} />
          </div>

        </div>

        <div className="ven-add-full">
          <label>Description</label>
          <textarea name="description" placeholder="Describe your service..."  value={form.description} onChange={handleChange}/>
        </div>

        <div className="ven-add-full">
  <label>Upload Image</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
  />

  {/* OPTIONAL PREVIEW */}
  {/* PREVIEW */}
{image ? (
  <img
    src={URL.createObjectURL(image)}
    alt="preview"
    style={{ width: "120px", marginTop: "10px" }}
  />
) : editData?.image ? (
  <img
    src={editData.image}
    alt="existing"
    style={{ width: "120px", marginTop: "10px" }}
  />
) : null}
</div>

        {/* ACTIONS */}
        <div className="ven-add-actions">
          <button className="ven-add-cancel" onClick={() => navigate(-1)}>Cancel</button>
         <button
  type="button"   // 🔥 ADD THIS
  className="ven-add-submit"
  onClick={handleSubmit}
>
  {editData ? "Update Service" : "Add Service"}
</button>
        </div>

      </div> 

    </div>
  );
}