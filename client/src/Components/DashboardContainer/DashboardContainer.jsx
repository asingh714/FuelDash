import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import PieChartBox from "../PieChartBox/PieChartBox";
import TinyChartBox from "../TinyChartBox/TinyChartBox";
import TopProductSalesBox from "../TopProductSalesBox/TopProductSalesBox";
import BarChartBox from "../BarChartBox/BarChartBox";

import "./DashboardContainer.scss";

const DashboardContainer = () => {
  const { propertyId, salesId } = useParams();
  const { isLoading, error, data } = useQuery(
    [propertyId, salesId],
    async () => {
      const response = await newRequest.get(`/sales/${propertyId}/${salesId}`);
      if (!response.data) {
        throw new Error("No data returned");
      }
      return response.data;
    }
  );

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
        <TopProductSalesBox chartData={data?.topNonGasProducts} />
      </div>
      <div className="box box2">
        <TinyChartBox
          money={true}
          color="#84cc16"
          icon="/revenue.svg"
          title="Revenue"
          total={data?.totalRevenue}
          chartData={data?.sevenDaysRevenue}
          myDataKey="Revenue"
          lineDataKey="date"
        />
      </div>
      <div className="box box3">
        <TinyChartBox
          money={false}
          color="#3b82f6"
          icon="/gas-station.svg"
          title="Gallons Sold"
          total={data?.totalGallonsSold}
          chartData={data?.sevenDaysTotalGallons}
          myDataKey="Gallons Sold"
          lineDataKey="day"
        />
      </div>
      <div className="box box4">
        <PieChartBox
          title="Top Selling Gasoline Products"
          chartData={data?.topGasProducts}
        />
      </div>
      <div className="box box5">
        <TinyChartBox
          money={true}
          color="#0d9488"
          icon="/cash.svg"
          title="Cash Payments"
          total={data?.dailyCashPayments}
          chartData={data?.sevenDaysPaymentTotals}
          myDataKey="Total Cash"
          lineDataKey="day"
        />
      </div>
      <div className="box box6">
        <TinyChartBox
          money={true}
          color="#7c3aed"
          icon="/credit-card.svg"
          title="Credit Card Payments"
          total={data?.dailyCreditCardPayments}
          chartData={data?.sevenDaysPaymentTotals}
          myDataKey="Total Credit Card"
          lineDataKey="day"
        />
      </div>
      <div className="box box7">
        <BarChartBox
          chartData={data?.sevenDaysRevenue}
          color="#0d9488"
          title="7 Day Revenue"
          bar="revenue"
          xaxis="day"
        />
      </div>
      <div className="box box8">
        <BarChartBox
          chartData={data?.sevenDaysTotalGallons}
          color="#3b82f6"
          title="7 Day Gallons Sold"
          bar="Gallons Sold"
          xaxis="day"
        />
      </div>
    </div>
  );
};

export default DashboardContainer;
