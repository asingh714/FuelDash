import { Link } from "react-router-dom";
import "./DashboardMenu.scss";

const DashboardMenu = () => {
  return (
    <div className="dashboard-menu">
      <Link to="/dashboard">
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
    </div>
  );
};

export default DashboardMenu;
