import "./Hero.css";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-overlay">

        <div className="hero-content">

          <h1 className="hero-title">
            Expert Services, <br />
            <span>Right at Your</span> <br />
            <span className="door">Door</span>
          </h1>

          <p className="hero-text">
            Book trusted professionals for home cleaning, repairs,
            beauty, wellness and more — all in minutes.
          </p>

          {/* <div className="search-box">

            <div className="search-input">
              <FiSearch className="search-icon"/>
              <input
                type="text"
                placeholder="What service do you need?"
              />
            </div>

 
   <button className="search-btn">
              Search
            </button>

          </div> */}
{/* 
          <div className="hero-actions">

  <button className="hero-primary-btn">
    Book a Service
  </button>

  <button className="hero-secondary-btn">
    Explore Professionals
  </button>

</div> */}

<div className="hero-stats">

  <div className="hero-stat-card">
    <h3>500+</h3>
    <p>Verified Professionals</p>
  </div>

  <div className="hero-stat-card">
    <h3>10K+</h3>
    <p>Happy Customers</p>
  </div>

  <div className="hero-stat-card">
    <h3>24/7</h3>
    <p>Service Support</p>
  </div>

</div>

          <div className="hero-users">

            <div className="avatars">
              <img src="https://randomuser.me/api/portraits/women/44.jpg"/>
              <img src="https://randomuser.me/api/portraits/men/32.jpg"/>
              <img src="https://randomuser.me/api/portraits/women/68.jpg"/>
            </div>

            <p><b>10,000+</b> happy customers</p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;