import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, } from "react-router-dom";
import "./OurServices.css";
import { FiSearch, FiHeart, FiClock } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";

const categories = [
  "All",
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Beauty",
  "Makeup",
  "Appliance Repair",
  "Painting",
];

const OurServices = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [liked, setLiked] = useState({});

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const vendorId = params.get("vendor");   // 🔥 NEW
  const categoryFromURL = params.get("category"); 

  // 🔥 FETCH SERVICES
  useEffect(() => {
    const fetchServices = async () => {
      try {
       let url = "http://localhost:5000/api/services";

if (vendorId) {
  url += `?vendor=${vendorId}`;
} else if (categoryFromURL) {
  url += `?category=${categoryFromURL}`;
}

const res = await fetch(url);
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    };

      // ✅ FETCH WISHLIST (for red hearts)
  const fetchWishlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      const data = await res.json();

      const likedMap = {};
      data.forEach((item) => {
        likedMap[item.service._id] = true;
      });

      setLiked(likedMap);
    } catch (err) {
      console.log(err);
    }
  };

    fetchServices();
    fetchWishlist();
  }, []);

  

// ❤️ LIKE TOGGLE (BACKEND CONNECTED)
const toggleLike = async (serviceId) => {
  try {
    await fetch("http://localhost:5000/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({ serviceId }),
    });

    // UI update
    setLiked((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));

  } catch (error) {
    console.log(error);
  }
};

  // 🔍 FILTER
  const filteredServices = services.filter((service) => {
  const matchCategory =
    activeCategory === "All" ||
    service.category.toLowerCase() === activeCategory.toLowerCase();

  const matchSearch = service.title
    .toLowerCase()
    .includes(search.toLowerCase());

  return matchCategory && matchSearch;
});


// ✅ SYNC CATEGORY WITH URL
useEffect(() => {
  if (categoryFromURL) {
    setActiveCategory(categoryFromURL);
  }
}, [categoryFromURL]);

  return (
    <section className="services-section">

      <h1 className="services-title">Our Services</h1>
      <p className="services-subtitle">
        Find and book the perfect service for your needs
      </p>

      {/* 🔍 SEARCH */}
      <div className="services-search">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* 🔘 CATEGORY */}
      <div className="services-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${
              activeCategory === cat ? "active" : ""
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔥 SERVICES GRID */}
      <div className="services-grid">
        {filteredServices.map((service) => (
          <div
            className="service-card"
            key={service._id}
            onClick={() => navigate(`/services/${service.slug}`)}
          >

            <div className="service-image">
              <img
                src={service.image || "/images/default.jpg"}
                alt={service.title}
              />

              <span className="service-category">
                {service.category}
              </span>

              {/* ❤️ LIKE */}
              <div
                className="fav"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(service._id);
                }}
              >
                {liked[service._id] ? (
                  <FaHeart className="heart-filled" />
                ) : (
                  <FiHeart className="heart-outline" />
                )}
              </div>
            </div>

            <div className="service-body">

              <div className="service-rating">
                <FaStar />
                <span>{service.rating || 4.5}</span>
                <span className="service-reviews">
                  ({service.reviews || 0})
                </span>
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

              <div className="service-bottom">

                <div className="duration">
                  <FiClock />
                  {service.duration} min
                </div>

                <div className="price">
                  ₹{service.price}
                  <span>/service</span>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default OurServices;