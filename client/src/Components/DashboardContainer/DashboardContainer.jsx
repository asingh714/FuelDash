import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import TinyChartBox from "../TinyChartBox/TinyChartBox";
import TopProductSalesBox from "../TopProductSalesBox/TopProductSalesBox";

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
          color="#84cc16"
          icon="/revenue.svg"
          title="Revenue"
          total={data?.totalRevenue}
          chartData={data?.sevenDaysRevenue}
          myDataKey="revenue"
        />
      </div>
      <div className="box box3">
        <TinyChartBox
          color="#3b82f6"
          icon="/gas-station.svg"
          title="Gallons Sold"
          total={data?.totalGallonsSold}
          chartData={data?.sevenDaysTotalGallons}
          myDataKey="Gallons Sold"
        />
      </div>
      <div className="box box4">4</div>
      <div className="box box5">
        <TinyChartBox
          color="#7c3aed"
          icon="/credit-card.svg"
          title="Credit Card Payments"
          total={data?.dailyCreditCardPayments}
          chartData={data?.sevenDaysPaymentTotals}
          myDataKey="Total Credit Card Payments"
        />
      </div>
      <div className="box box6">
        <TinyChartBox
          color="#0d9488"
          icon="/cash.svg"
          title="Cash Payments"
          total={data?.dailyCashPayments}
          chartData={data?.sevenDaysPaymentTotals}
          myDataKey="Total Cash Payments"
        />
      </div>
      <div className="box box7">7</div>
      <div className="box box8">8</div>
    </div>
  );
};

export default DashboardContainer;
