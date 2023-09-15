import { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="navbar-container">
      <Link to="/" className="logo">
        <img src="/fueldash_logo.png" alt="" />
        <span>FuelDash</span>
      </Link>

      <div className="links-container">
        <div className="resources-container">
          <span id="resource-link">
            Resources
            <div className="resources-menu">
              <Link to="/about">About</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/customers">Customers</Link>
              <Link to="/faqs">FAQs</Link>
            </div>
          </span>
        </div>
        <Link to="/login" id="login-link">
          Login
        </Link>
        <Link to="/signup" id="signup-link">
          Start Now →
        </Link>

        <div
          className={`hamburger-menu ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
