import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Professionals.css";
import { FiSearch, FiMapPin, FiCheckCircle } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Professionals = () => {

const [search, setSearch] = useState("");
const [vendors, setVendors] = useState([]); 
const navigate = useNavigate();

// 🔥 FETCH FROM BACKEND
useEffect(() => {
  const fetchVendors = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/vendor/all");
      const data = await res.json();

      setVendors(data);

    } catch (err) {
      console.log(err);
    }
  };

  fetchVendors();
}, []);

// 🔍 SEARCH FILTER
const filteredPros = vendors.filter((pro) =>
  pro.ownerName?.toLowerCase().includes(search.toLowerCase())
);

return (
<section className="professionals-section">

<h1 className="professionals-title">
Our Professionals
</h1>

<p className="professionals-subtitle">
Verified experts ready to help you
</p>

{/* SEARCH */}
<div className="professionals-search">
<FiSearch className="search-icon"/>

<input
type="text"
placeholder="Search services..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button>Search</button>
</div>

{/* GRID */}
<div className="professionals-grid">

{filteredPros.map((pro) => (

<div className="professional-card" key={pro._id}>

<div className="professional-top">

<div className="professionals-image">
<img
  src={
    pro.profileImage ||
    "https://via.placeholder.com/100"
  }
/>

<FiCheckCircle className="professionals-verified"/>
</div>

<div className="professionals-info">

<h3>{pro.ownerName}</h3>

<p className="professionals-role">
{pro.category || "Service Expert"}
</p>

<div className="professionals-meta">

<span className="professionals-rating">
<FaStar/>
{pro.rating || 4.5}

<span className="professionals-reviews">
(0)
</span>
</span>

<span className="professionals-location">
<FiMapPin/>
{pro.address?.split(",")[1] || "India"}
</span>

</div>
</div>
</div>

<div className="professionals-divider"></div>

<div className="professional-bottom">
<p>{pro.jobsCompleted || 100} jobs completed</p>

<button
  className="professionals-book-btn"
  onClick={() => navigate(`/services?vendor=${pro._id}`)}
>
  Book Now
</button>
</div>

</div>

))}

</div>

</section>
);
};

export default Professionals;