import React from "react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail
} from "react-icons/fi";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="footer">
<svg width="0" height="0">
  <defs>
    <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stopColor="#7C6BFF"/>
      <stop offset="100%" stopColor="#FF6A6A"/>
    </linearGradient>
  </defs>
</svg>
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col brand-col">

          <div
  className="footer-logo"
  onClick={() => navigate("/")}
  style={{ cursor: "pointer" }}
>
  <h2>Skillora</h2>
</div>

          <p className="footer-desc">
            Your trusted marketplace for professional home and personal
            services. Quality guaranteed.
          </p>

          <div className="social-icons">
           <div
  className="social"
  onClick={() =>
    window.open("https://facebook.com", "_blank")
  }
>
  <FiFacebook />
</div>
           <div
  className="social"
  onClick={() =>
    window.open("https://twitter.com", "_blank")
  }
>
  <FiTwitter />
</div>

<div
  className="social"
  onClick={() =>
    window.open("https://instagram.com", "_blank")
  }
>
  <FiInstagram />
</div>

<div
  className="social"
  onClick={() =>
    window.open("https://youtube.com", "_blank")
  }
>
  <FiYoutube />
</div>
          </div>

        </div>

        {/* Column 2 */}
        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>
<li onClick={() => navigate("/services")}>
  Services
</li>

<li onClick={() => navigate("/professionals")}>
  Professionals
</li>

<li onClick={() => navigate("/about")}>
  About
</li>

<li onClick={() => navigate("/contact")}>
  Contact
</li>

<li onClick={() => navigate("/account")}>
  Reviews
</li>
          </ul>

        </div>

        {/* Column 3 */}
        <div className="footer-col">

          <h3>Services</h3>

          <ul>
           <li onClick={() => navigate("/services")}>
  Home Cleaning
</li>

<li onClick={() => navigate("/services")}>
  Plumbing
</li>

<li onClick={() => navigate("/services")}>
  Electrical
</li>

<li onClick={() => navigate("/services")}>
  Beauty & Spa
</li>

<li onClick={() => navigate("/services")}>
  Appliance Repair
</li>

<li onClick={() => navigate("/services")}>
  Painting
</li>
          </ul>

        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <div className="contact-item">
            <FiMapPin className="contact-icon"/>
            <span>123 Service Avenue, Nagpur, Maharshtra - 440036</span>
          </div>

          <div className="contact-item">
            <FiPhone className="contact-icon"/>
            <span>+91 9437989788</span>
          </div>

          <div className="contact-item">
            <FiMail className="contact-icon"/>
            <span>skillora@gmail.com</span>
          </div>
        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">

        <p>© 2026 Skillora. All rights reserved.</p>

        <div className="footer-links">
          <span onClick={() => navigate("/about")}>
  Privacy
</span>

<span onClick={() => navigate("/about")}>
  Terms
</span>

<span onClick={() => navigate("/about")}>
  Cookies
</span>
        </div>

      </div>

    </footer>
  );
};

export default Footer;