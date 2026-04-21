import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./Wishlist.css";

const Wishlist = () => {

const [wishlist, setWishlist] = useState([]);

useEffect(() => {
  const fetchWishlist = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/wishlist", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });

      const data = await res.json();
      setWishlist(data);

    } catch (err) {
      console.log(err);
    }
  };

  fetchWishlist();
}, []);

const removeFromWishlist = async (serviceId) => {
  await fetch("http://localhost:5000/api/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    body: JSON.stringify({ serviceId }),
  });

  setWishlist((prev) =>
    prev.filter((item) => item.service._id !== serviceId)
  );
};

return (

<div className="wishlist-page">

<h1 className="wishlist-title">
 Your Wishlist
</h1>

<div className="wishlist-grid">

{wishlist.map((item) => {
  const service = item.service;

  return (
    <div className="service-card">

  <div className="service-image">

    <img src={service.image} alt={service.title} />

    <span className="service-category">
      {service.category}
    </span>

    <div
      className="fav"
      onClick={() => removeFromWishlist(service._id)}
    >
      <FaHeart className="heart-filled"/>
    </div>

  </div>

  <div className="service-body">

    <div className="service-rating">
      ⭐ {service.rating || 4.5}
    </div>

    <h3>{service.title}</h3>

    <p>{service.description}</p>

    <div className="service-bottom">

      <div className="duration">
        ⏱ {service.duration} min
      </div>

      <div className="price">
        ₹{service.price}
        <span>/service</span>
      </div>

    </div>

  </div>

</div>
  );
})}

</div>

</div>

);

};

export default Wishlist;