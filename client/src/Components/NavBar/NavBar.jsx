import { Link } from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <Link to="/" className="logo">
        <img src="/fueldash_logo.png" alt="" />
        <span>FuelDash</span>
      </Link>
      <div className="links">
        <span id="resource-link">Resources</span>
        <Link to="/login" id="login-link">
          Login
        </Link>
        <Link to="/signup" id="signup-link">
          Start Now →
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
