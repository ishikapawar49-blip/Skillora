import "./VendorServices.css";
import { Plus, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function VendorServices() {
  
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("vendorToken");
      console.log("TOKEN:", token);

      const res = await fetch("http://localhost:5000/api/vendor/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("API DATA:", data);

      if (!res.ok) {
        console.log("Error:", data);
        setServices([]);
        return;
      }

      setServices(Array.isArray(data) ? data : data.services || []);
    } catch (error) {
      console.log(error);
      setServices([]);
    }
  };

  fetchServices();
}, []);


const handleEdit = (service) => {
  navigate("/vendor/services/add", { state: service });
};

const handleDelete = async (id) => {
  try {
    const token = localStorage.getItem("vendorToken");

    const res = await fetch(
      `http://localhost:5000/api/vendor/services/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      alert("Service Deleted ✅");

      // refresh list
      setServices((prev) => prev.filter((s) => s._id !== id));
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  const handleClick = () => setOpenMenu(null);
  window.addEventListener("click", handleClick);

  return () => window.removeEventListener("click", handleClick);
}, []);

  return (
    <div className="ven-srv-container">

      {/* HEADER */}
      <div className="ven-srv-header">
        <div>
          <h1>My Services</h1>
          <p>Manage your service offerings</p>
        </div>

        <button
  className="ven-srv-add"
  onClick={() => navigate("/vendor/services/add")}
>
  <Plus size={16} />
  Add Service
</button>
      </div>

      {/* GRID */}
      <div className="ven-srv-grid">
        {Array.isArray(services) &&
  services.map((s) => (
          <div key={s._id} className="ven-srv-card">

            {/* TOP */}
            <div className="ven-srv-top">
  <span className="ven-srv-badge">{s.category}</span>

  {/* 🔥 IMAGE (TOP RIGHT) */}
  {s.image && (
    <img
      src={s.image}
      alt="service"
      className="ven-srv-img"
    />
  )}

  <button
    className="ven-srv-menu"
    onClick={(e) => {
      e.stopPropagation();
      setOpenMenu(openMenu === s._id ? null : s._id);
    }}
  >
    <MoreHorizontal size={16} />
  </button>
</div>

            {openMenu === s._id && (
  <div className="ven-srv-dropdown">
    <p onClick={() => handleEdit(s)}>Edit</p>
    <p onClick={() => handleDelete(s._id)}>Delete</p>
  </div>
)}

            {/* CONTENT */}
            <h3>{s.title}</h3>
            <p className="ven-srv-desc">{s.description}</p>

            {/* FOOTER */}
            <div className="ven-srv-footer">
              <span className="ven-srv-price">₹{s.price}</span>

               <div className="ven-srv-meta">
               <p>{s.duration ? `${s.duration} min` : "N/A"}</p>                <p>{s.bookings || 0} bookings</p>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}