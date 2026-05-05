import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

import user1 from "../../assets/images/p1.jpg";
import user2 from "../../assets/images/p2.jpg";
import user3 from "../../assets/images/p3.jpg";
import user4 from "../../assets/images/p4.jpg";

import { useEffect, useState } from "react";

function Testimonials(){

const [testimonials, setTestimonials] = useState([]);

const API = "https://skillora-backend-one.vercel.app";

useEffect(()=>{
  fetch(`${API}/api/users/featured`)
    .then(res => {
      if (!res.ok) throw new Error("API not working");
      return res.json();
    })
    .then(data => setTestimonials(data))
    .catch(err => console.log("ERROR:", err));
},[]);

return(
<section className="test-section">
<div className="test-container">
<h2 className="test-title">
What Our Customers Say
</h2>

<p className="test-subtitle">
Real reviews from real customers
</p>

<div className="test-grid">
{testimonials.map((t)=> (
<div className="test-card" key={t._id}>
<div className="test-top">

<img src={`https://ui-avatars.com/api/?name=${t.user?.name}`} />

<div className="test-user">
<h4>{t.user?.name}</h4>

<p>
{t.service?.title} · {new Date(t.createdAt).toLocaleDateString()}
</p>
</div>

<div className="test-stars">
{[...Array(5)].map((_,i)=> (
<FaStar
key={i}
className={i < t.rating ? "star active" : "star"}
/>
))}
</div>

</div>

<p className="test-review">
{t.comment}
</p>

</div>
))}

</div>
</div>
</section>
)}

export default Testimonials;