import React, { useState } from "react";
import "./Contact.css";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const Contact = () => {

  const [formData, setFormData] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleChange = (e) => {

  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

};

const handleSubmit = async () => {

  try {

    const response = await fetch(

      `${import.meta.env.VITE_API_URL}/api/contact`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (data.success) {

      alert("Message Sent Successfully ✅");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

    }

  } catch (error) {

    console.log(error);

    alert("Something went wrong");

  }

};

  return (
    <section className="contact-section">

      <h1 className="contact-title">Get in Touch</h1>

      <p className="contact-subtitle">
        Have a question or need support? We'd love to hear from you.
      </p>

      <div className="contact-container">

        {/* LEFT SIDE */}

        <div className="contact-info">

          <div className="info-card">
            <div className="info-icon">
              <FiMail />
            </div>

            <div>
              <h3>Email</h3>
              <p className="info-main">hello@skillora.com</p>
              <p className="info-sub">We respond within 24 hours</p>
            </div>
          </div>


          <div className="info-card">
            <div className="info-icon">
              <FiPhone />
            </div>

            <div>
              <h3>Phone</h3>
              <p className="info-main">+91 9437989788</p>
              <p className="info-sub">Mon–Fri, 9am–6pm IST</p>
            </div>
          </div>


          <div className="info-card">
            <div className="info-icon">
              <FiMapPin />
            </div>

            <div>
              <h3>Office</h3>
              <p className="info-main">Nagpur, Maharashtra</p>
              <p className="info-sub">Visit us in person</p>
            </div>
          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="contact-form">

          <h2>Send a Message</h2>

          <div className="form-row">
            <input
  type="text"
  placeholder="Your name"
  name="name"
  value={formData.name}
  onChange={handleChange}
/>
<input
  type="email"
  placeholder="Your email"
  name="email"
  value={formData.email}
  onChange={handleChange}
/>    
      </div>


          <input
  className="full"
  type="text"
  placeholder="Subject"
  name="subject"
  value={formData.subject}
  onChange={handleChange}
/>

         <textarea
  rows="6"
  placeholder="Your message..."
  name="message"
  value={formData.message}
  onChange={handleChange}
></textarea>

          <button className="send-btn" onClick={handleSubmit}>
            <FiSend /> Send Message
          </button>

        </div>

      </div>

    </section>
  );
};

export default Contact;