import "./Navbar.css";
import LocationModal from "../Location/LocationModal";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiUser, FiMenu, FiX } from "react-icons/fi";

function Navbar() {

  const API = import.meta.env.VITE_API_URL;

  const [location, setLocation] = useState("Detecting location...");
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // =========================================
  // LOGIN CHECK
  // =========================================

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  // =========================================
  // AUTO LOCATION FETCH
  // =========================================

  useEffect(() => {

    const savedLocation = localStorage.getItem("userLocation");

    if (savedLocation) {
      setLocation(savedLocation);
    }

    fetchUserLocation();

  }, []);

  // =========================================
  // FETCH LIVE LOCATION
  // =========================================

  const fetchUserLocation = () => {

    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(

      async (position) => {

        try {

          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // =========================================
          // REVERSE GEOCODING
          // =========================================

const response = await fetch(
  `https://us1.locationiq.com/v1/reverse?key=${import.meta.env.VITE_LOCATIONIQ_KEY}&lat=${lat}&lon=${lng}&format=json`
);

const data = await response.json();

console.log(data);
console.log(data.address);
console.log(data.display_name);

const address = data.address;

          // =========================================
          // FULL ADDRESS FORMAT
          // =========================================
const area = data.display_name
  ?.split(",")
  .slice(0, 2)
  .join(",")
  .trim();

const pincode = data.address.postcode || "";

const fullAddress = `${area} - ${pincode}`;

          // =========================================
          // SAVE TO STATE
          // =========================================

          setLocation(fullAddress);

          // =========================================
          // SAVE TO LOCAL STORAGE
          // =========================================

          localStorage.setItem("userLocation", fullAddress);

          localStorage.setItem(
            "userCoordinates",
            JSON.stringify({
              lat,
              lng
            })
          );

          // =========================================
          // SAVE TO BACKEND
          // =========================================

          await fetch(`${API}/api/users/location`, {
            
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`
            },
            body: JSON.stringify({
  lat,
  lng,
  fullAddress,
  pincode,
  address
})
          });

          await fetch(`${API}/api/users/address`, {

  method: "POST",

  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("userToken")}`
  },

  body: JSON.stringify({

    fullAddress,

    pincode,

    lat,

    lng,

    type: "Home"

  })

});

        } catch (error) {

          console.log(error);
          setLocation("Location unavailable");

        } finally {

          setLoading(false);

        }

      },

      (error) => {

        console.log(error);

        setLoading(false);

        if (error.code === 1) {
          setLocation("Permission denied");
        } else {
          setLocation("Unable to fetch");
        }

      },

      // =========================================
      // HIGH ACCURACY OPTIONS
      // =========================================

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }

    );

  };

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = () => {

    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    setIsLoggedIn(false);
    setMenuOpen(false);

    navigate("/auth");

  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (

    <header className="navbar">

      <div className="nav-container">

        <div className="nav-logo">
          Skill<span>ora</span>
        </div>

        {/* Desktop Links */}

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/professionals">Professionals</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* RIGHT */}

        <div className="nav-right">

          <div
            className="nav-location"
           onClick={() => setShowLocationModal(true)}
          >
            📍 {loading ? "Detecting..." : location}
          </div>

          <Link to="/wishlist">
            <FiHeart className="nav-icon" />
          </Link>

          <Link to="/account">
            <FiUser className="nav-icon" />
          </Link>

          {isLoggedIn ? (

            <button
              className="nav-signin-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          ) : (

            <Link to="/auth">
              <button className="nav-signin-btn">
                Sign In
              </button>
            </Link>

          )}

        </div>

        {/* MOBILE */}

        <div
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

      </div>

      {/* MOBILE MENU */}

      <div className={`mobile-menu ${menuOpen ? "show-menu" : ""}`}>

        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/services" onClick={closeMenu}>Services</Link>
        <Link to="/professionals" onClick={closeMenu}>Professionals</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/wishlist" onClick={closeMenu}>Wishlist</Link>
        <Link to="/account" onClick={closeMenu}>Account</Link>

        {isLoggedIn ? (

          <button
            className="mobile-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        ) : (

          <Link to="/auth" onClick={closeMenu}>
            <button className="mobile-btn">
              Sign In
            </button>
          </Link>

        )}

      </div>
{
  showLocationModal && (

    <LocationModal
      closeModal={() =>
        setShowLocationModal(false)
      }
      fetchUserLocation={fetchUserLocation}
      setLocation={setLocation}
    />

  )
}

    </header>

  );

}

export default Navbar;