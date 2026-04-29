import "./Navbar.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHeart, FiUser, FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");

    setIsLoggedIn(false);
    setMenuOpen(false);

    alert("Logged out successfully 👋");
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

        {/* Desktop Right */}
        <div className="nav-right">
          <Link to="/wishlist">
            <FiHeart className="nav-icon" />
          </Link>

          <Link to="/account">
            <FiUser className="nav-icon" />
          </Link>

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

        {/* Mobile Hamburger */}
        <div
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </div>

      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "show-menu" : ""}`}>

        <Link to="/" onClick={closeMenu}>Home</Link>
        <Link to="/services" onClick={closeMenu}>Services</Link>
        <Link to="/professionals" onClick={closeMenu}>Professionals</Link>
        <Link to="/about" onClick={closeMenu}>About</Link>
        <Link to="/contact" onClick={closeMenu}>Contact</Link>
        <Link to="/wishlist" onClick={closeMenu}>Wishlist</Link>
        <Link to="/account" onClick={closeMenu}>Account</Link>

        {isLoggedIn ? (
          <button className="mobile-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/auth" onClick={closeMenu}>
            <button className="mobile-btn">Sign In</button>
          </Link>
        )}

      </div>
    </header>
  );
}

export default Navbar;