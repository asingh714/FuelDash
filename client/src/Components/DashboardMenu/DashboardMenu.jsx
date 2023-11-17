import { Link } from "react-router-dom";
import "./DashboardMenu.scss";

const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <Link to="/" className="logo">
        <div className="logo-container">
          <img src="/fueldash_logo.png" alt="" />
          <span>FuelDash</span>
        </div>
      </Link>

      <div className="dashboard-menu-links">
        <Link to="/dashboard" className="active">
          <img src="/home.svg" alt="logo" className="logo" />
          Home
        </Link>
        <Link to="/profile">
          <img src="/profile.svg" alt="logo" className="logo" />
          Profile
        </Link>
        <Link to="/properties">
          <img src="/gas-station.svg" alt="logo" className="gas-logo" />
          Properties
        </Link>
        <Link to="/products">
          <img src="/basket.svg" alt="logo" className="gas-logo" />
          Products
        </Link>
        <Link to="/sales-reports">
          <img src="/sales.svg" alt="logo" className="gas-logo" />
          Sales Reports
        </Link>
      </div>
    </div>
  );
};

export default DashboardMenu;
