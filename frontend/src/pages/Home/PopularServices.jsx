import "./PopularServices.css";
import { FiHeart, FiClock } from "react-icons/fi";
import { FaHeart, FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PopularServices(){

const [services, setServices] = useState([]);
const [liked, setLiked] = useState({});
const navigate = useNavigate();


// ✅ FETCH POPULAR SERVICES
useEffect(() => {
  const fetchPopular = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services/popular");
      const data = await res.json();
      setServices(data);
    } catch (err) {
      console.log(err);
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

  fetchPopular();
  fetchWishlist();

}, []);


// ❤️ LIKE TOGGLE
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

    setLiked((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId],
    }));

  } catch (err) {
    console.log(err);
  }
};


return(

<section className="pop-section">

<div className="pop-container">

<div className="pop-header">

<div>
<h2>Popular Services</h2>
<p>Most booked services by our customers</p>
</div>

{/* ✅ NAVIGATION FIX */}
<button 
  className="pop-view"
  onClick={() => navigate("/services")}
>
  View All →
</button>

</div>


<div className="pop-grid">

{services.map((service)=> (

<div 
className="pop-card" 
key={service._id}
onClick={() => navigate(`/services/${service.slug}`)}
>

<div className="pop-img">

<img src={service.image} alt={service.title}/>

<span className="pop-tag">{service.category}</span>

<div 
className="pop-heart"
onClick={(e)=>{
  e.stopPropagation();
  toggleLike(service._id);
}}
>
{liked[service._id] ? (
  <FaHeart className="heart-filled"/>
) : (
  <FiHeart/>
)}
</div>

</div>


<div className="pop-body">

<div className="pop-rating">
<FaStar className="pop-star"/>
{service.rating || 4.5}
<span>({service.reviews || 0})</span>
</div>

<h3>{service.title}</h3>

<p className="pop-desc">
{service.description}
</p>

<div className="pop-bottom">

<div className="pop-time">
<FiClock/>
{service.duration} min
</div>

<div className="pop-price">
₹{service.price}<span>/service</span>
</div>

</div>

</div>

</div>

))}

</div>

</div>

</section>

)
}

export default PopularServices;