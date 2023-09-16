import TopProductSalesBox from "../TopProductSalesBox/TopProductSalesBox";

import "./DashboardContainer.scss";

const DashboardContainer = () => {
  return (
    <div className="dashboard-container">
      <div className="box box1">
        <TopProductSalesBox />
      </div>
      <div className="box box2">2</div>
      <div className="box box3">3</div>
      <div className="box box4">4</div>
      <div className="box box5">5</div>
      <div className="box box6">6</div>
      <div className="box box7">7</div>
      <div className="box box8">8</div>
    </div>
  );
};

export default DashboardContainer;
