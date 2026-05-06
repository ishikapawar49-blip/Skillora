import "./TopProfessionals.css";
import { FiMapPin, FiCheckCircle } from "react-icons/fi";
import {FaStar} from "react-icons/fa";
import { useEffect, useState } from "react";

function TopProfessionals(){

const [professionals, setProfessionals] = useState([]);
const API = import.meta.env.VITE_API_URL;

useEffect(() => {
  fetch(`${API}/api/vendor/nearby`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`
    }
  })
    .then(res => res.json())
    .then(data => setProfessionals(data))
    .catch(err => console.log(err));
}, []);

return(

<section className="tp-section">

<div className="tp-container">

{/* HEADER */}

<div className="tp-header">

<div>
<h2>Top Professionals</h2>
<p>Verified experts ready to serve you</p>
</div>

<a className="tp-view">
View All →
</a>

</div>


{/* CARDS */}

<div className="tp-grid">

{professionals.map((pro)=> (

<div className="tp-card" key={pro.id}>

<div className="tp-top">

<div className="tp-avatar">

<img src={pro.image} />

<div className="tp-verified">
<FiCheckCircle/>
</div>

</div>


<div className="tp-info">

<h3>{pro.ownerName}</h3>

<p className="tp-role">{pro.category}</p>

<span className="tp-location">
  <FiMapPin/>
  {pro.city || "Nearby"}
</span>

<div className="tp-meta">

<span className="tp-rating">
<FaStar className="tp-star"/>
{pro.rating}
<span>({pro.reviews})</span>
</span>

<span className="tp-location">
  <FiMapPin/>
  {
    pro.locality || pro.city || pro.pincode
      ? `${pro.locality || ""}${pro.locality ? ", " : ""}
         ${pro.city || ""}
         ${pro.pincode ? " - " : ""}
         ${pro.pincode || ""}`
      : "Location not added"
  }
</span>

</div>

</div>

</div>


<hr/>


<div className="tp-bottom">

<p>{pro.jobs} jobs completed</p>

<button className="tp-btn">
Book Now
</button>

</div>

</div>

))}

</div>

</div>

</section>

)

}

export default TopProfessionals