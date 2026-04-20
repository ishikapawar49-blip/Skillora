import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiUser } from "react-icons/fi";

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on load
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    setIsLoggedIn(false);

    alert("Logged out successfully 👋");
    navigate("/auth");
  };

  return (
    <header className="navbar">

      <div className="nav-container">

        <div className="nav-logo">
          Skill<span>ora</span>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/professionals">Professionals</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="nav-right">
          <Link to="/wishlist">
<FiHeart className="nav-icon"/>
</Link>
          
           <Link to="/account">
            <FiUser className="nav-icon"/>
          </Link>

           {/* 🔥 CONDITIONAL BUTTON */}
          {isLoggedIn ? (
            <button className="nav-signin-btn" onClick={handleLogout}>
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

      </div>

    </header>
  );
}

export default Navbar;