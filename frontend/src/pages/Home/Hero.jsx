import "./Hero.css";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { useEffect, useState } from "react";

function Hero() {

  const API = import.meta.env.VITE_API_URL;
const [showPopup, setShowPopup] = useState(false);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("userToken");
  const locationSet = localStorage.getItem("locationSet");

  if (token && !locationSet) {
    setShowPopup(true);
  }
}, []);


const getLiveLocation = () => {
  setLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const city = "Nagpur"; // later dynamic

      await fetch(`${API}/api/users/location`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`
        },
        body: JSON.stringify({ lat, lng, city })
      });

      localStorage.setItem("locationSet", "true");

      setLoading(false);
      setShowPopup(false);
    },
    () => {
      setLoading(false);
      alert("Location permission denied ❌");
    }
  );
};


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

          <div className="search-box">

            <div className="search-input">
              <FiSearch className="search-icon"/>
              <input
                type="text"
                placeholder="What service do you need?"
              />
            </div>

            {/* <div className="location-input">
              <FiMapPin className="search-icon"/>
              <input
                type="text"
                placeholder="Your location"
              />
            </div> */}

<button className="hero-location-btn" onClick={() => setShowPopup(true)}>
  Use My Location 📍
</button>

            <button className="search-btn">
              Search
            </button>

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
{showPopup && (
  <div className="location-popup">
    <div className="location-box">

      <h3>📍 Enable Location</h3>
      <p>
        For better experience, we need your location to show nearby professionals.
      </p>

      <button onClick={getLiveLocation}>
        {loading ? "Getting location..." : "Use My Location"}
      </button>

      <span onClick={() => setShowPopup(false)}>Skip</span>

    </div>
  </div>
)}
      </div>

    </section>
  );
}

export default Hero;