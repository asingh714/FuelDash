import { useQuery } from "@tanstack/react-query";

import newRequest from "../../utils/newRequest";
import TinyChartBox from "../TinyChartBox/TinyChartBox";
import TopProductSalesBox from "../TopProductSalesBox/TopProductSalesBox";

import "./DashboardContainer.scss";

const DashboardContainer = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      newRequest
        .get("/sales/64ff54c0b485b42210278316/6500a125cb0d5cb6450b6ca5")
        .then((res) => res.data),
  });

  // Handle potential errors
  if (error) {
    console.error(error);
    return <div>Error loading data</div>;
  }

  // Handle loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render component
  return (
    <div className="dashboard-container">
      <div className="box box1">
        <TopProductSalesBox />
      </div>
      <div className="box box2">
        <TinyChartBox
          color="#84cc16"
          icon="./revenue.svg"
          title="Revenue"
          revenue={data.totalRevenue}
          chartData={data.sevenDaysRevenue}
        />
      </div>
      <div className="box box3">{/* <TinyChartBox /> */}</div>
      <div className="box box4">4</div>
      <div className="box box5">{/* <TinyChartBox /> */}</div>
      <div className="box box6">{/* <TinyChartBox /> */}</div>
      <div className="box box7">7</div>
      <div className="box box8">8</div>
    </div>
  );
};

export default DashboardContainer;
