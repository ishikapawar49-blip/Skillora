import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ServiceDetails.css";

import TopProfessionals from "../Home/TopProfessionals";
import Testimonials from "../Home/Testimonials";

import { FaStar } from "react-icons/fa";
import { FiClock } from "react-icons/fi";

const ServiceDetails = () => {

  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);

useEffect(() => {
  const fetchService = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/vendor/services/slug/${slug}`
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("Error:", data);
        return;
      }

      setService(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchService();
}, [slug]);

  if (!service) {
  return <h2>Loading...</h2>;
}

  return (
    <section className="service-detail">

      {/* Hero */}

      <div className="service-hero">

        <img src={service.image} alt={service.title} />

        <div className="service-book-card">

          <p>Starting from</p>

          <h2>₹{service.price}</h2>

          <button 
  className="book-btn"
  onClick={() => navigate(`/services/${slug}/book`)}
>
  Book Now
</button>

          <ul>
            <li>100% money-back guarantee</li>
            <li>Free cancellation up to 24h</li>
            <li>Service at your doorstep</li>
          </ul>

        </div>

      </div>

      {/* Info */}

      <div className="service-info">

        <span className="category">
          {service.category}
        </span>

        <h1>{service.title}</h1>

        <div className="meta">

          <div>
            <FaStar />
            {service.rating}
            ({service.reviews})
          </div>

          <div>
            <FiClock />
            {service.duration}
          </div>

        </div>

        <h3>About This Service</h3>

        <p>
          {service.description}
        </p>

      </div>


      {/* Home page same sections */}

      {/* <TopProfessionals /> */}

      {/* <Testimonials /> */}

    </section>
  );
};

export default ServiceDetails;