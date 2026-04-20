import React, { useState, useEffect  } from "react";
import "./AddressPage.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

const AddressPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { selectedDate, selectedTime } = location.state || {};

  // Local state for address input
  const [form, setForm] = useState({
  name: "",
  phone: "",
  flat: "",
  locality: "",
  pincode: "",
});

const [errors, setErrors] = useState({});


// Helper to format date as DD-MM-YYYY
const formatDate = (d) => {
  if (!d) return "";

  const dateObj = d.fullDate || new Date(d);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
};

// Check if all form fields are filled
const isFormValid =
  form.name &&
  form.phone.length === 10 &&
  form.flat &&
  form.locality &&
  form.pincode.length === 6 &&
  !errors.phone &&
  !errors.pincode;

// Handle input changes with validation
const handleChange = (e) => {
  const { name, value } = e.target;

  // Phone validation
  if (name === "phone") {
    if (!/^\d*$/.test(value)) return; // only numbers
    if (value.length > 10) return;

    setErrors({
      ...errors,
      phone:
        value.length === 10 ? "" : "Phone must be 10 digits",
    });
  }

  // Pincode validation
  if (name === "pincode") {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 6) return;

    setErrors({
      ...errors,
      pincode:
        value.length === 6 ? "" : "Pincode must be 6 digits",
    });

    // 🔥 AUTO FETCH ADDRESS FROM PINCODE
    if (value.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${value}`)
        .then((res) => res.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];

            setForm((prev) => ({
              ...prev,
              locality: `${postOffice.Name}, ${postOffice.District}`,
            }));
          }
        });
    }
  }
  setForm({ ...form, [name]: value });
};

useEffect(() => {
  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const res = await fetch("http://localhost:5000/api/users/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data) {
        setForm({
          name: data.name || "",
          phone: data.phone || "",
          flat: data.flat || "",
          locality: data.locality || "",
          pincode: data.pincode || "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  fetchAddress();
}, []);


// Handle form submission
const handleSubmit = async () => {
  try {
    const token = localStorage.getItem("userToken");

const res = await fetch("http://localhost:5000/api/users/address", {
        method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        slug,
        selectedDate,
        selectedTime,
        ...form,
      }),
    });

    let data;
try {
  data = await res.json();
} catch {
  data = {};
}

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // ✅🔥 THIS WAS MISSING (IMPORTANT)
    navigate("/payment", {
    state: {
    service: service || {},
    selectedDate,
    selectedTime,
    address: form,
  },
});

  } catch (err) {
    console.log(err);
  }
};
console.log("navigating", service);

// Fetch service details on mount
useEffect(() => {
  const fetchService = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/vendor/services/slug/${slug}`
      );
      const data = await res.json();
      setService(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchService();
}, [slug]);

if (!service) return <h2>Loading...</h2>;

  return (
    <div className="address-container">
      <div className="address-left">

        <div className="address-back" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </div>

        <h1 className="address-title">Book Your Service</h1>

        {/* STEPS */}
        <div className="address-steps">
          <div className="address-step done">
            <span>✓</span> Date & Time
          </div>

          <div className="address-line"></div>

          <div className="address-step active">
            <span>2</span> Address
          </div>

          <div className="address-line"></div>

          <div className="address-step">
            <span>3</span> Confirm
          </div>
        </div>

        {/* ADDRESS INPUT */}
        <div className="address-section">
          <h2>
            <FiMapPin /> Service Address
          </h2>

          <input
  type="text"
  name="name"
  placeholder="Full Name"
  value={form.name}
  onChange={handleChange}
  disabled={!isEditing}
/>

<input
  type="text"
  name="phone"
  placeholder="Contact Number"
  value={form.phone}
  onChange={handleChange}
  disabled={!isEditing}
/>
{errors.phone && <p className="error">{errors.phone}</p>}

<input
  type="text"
  name="flat"
  placeholder="Flat / House No"
  value={form.flat}
  onChange={handleChange}
  disabled={!isEditing}
/>

<input
  type="text"
  name="locality"
  placeholder="Locality / Area"
  value={form.locality}
  onChange={handleChange}
  disabled={!isEditing}
/>

<input
  type="text"
  name="pincode"
  placeholder="Pincode"
  value={form.pincode}
  onChange={handleChange}
  disabled={!isEditing}
/>
{errors.pincode && <p className="error">{errors.pincode}</p>}

        </div>

        {/* BUTTONS */}
        <div className="address-actions">
          <button className="back-btn" onClick={() => setIsEditing(!isEditing)}>
  {isEditing ? "Lock" : "Edit Address"}
</button>

<button
  className="continue-btn"
  disabled={!isFormValid}
  onClick={handleSubmit}
>
  Continue
</button>

        </div>
      </div>

      {/* RIGHT SUMMARY */}
      <div className="address-right">
        <div className="book-service-summary">
          <h2>Booking Summary</h2>

          <img
            src={service.image || "/images/default.jpg"}
            alt={service.title}
          />
          <h3>{service.title}</h3>
          <p>{service.category}</p>

          <hr />

          <div className="book-service-row">
            <span>Date</span>
<span>{selectedDate ? formatDate(selectedDate) : "-"}</span>
          </div>

          <div className="book-service-row">
            <span>Time</span>
            <span>{selectedTime || "-"}</span>
          </div>

          <div className="book-service-total">
            <span>Total</span>
            <span>₹{service.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;