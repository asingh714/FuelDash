import DashboardContainer from "../../Components/DashboardContainer/DashboardContainer";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import "./Dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard-page-container">
      <DashboardMenu />
      <DashboardContainer />
    </div>
  );
};

export default Dashboard;
