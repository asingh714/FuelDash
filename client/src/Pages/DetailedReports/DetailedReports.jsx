import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import SimpleLineChart from "../../Components/SimpleLineChart/SimpleLineChart";
import "./DetailedReports.scss";

const dataInfo = {
  revenue: { dataName: "Revenue", color: "#84cc16", title: "Revenue" },
  gallons: { dataName: "Gallons", color: "#3b82f6", title: "Gallons Sold" },
  cash: { dataName: "Cash", color: "#0d9488", title: "Cash Payments" },
  credit: {
    dataName: "Credit Card",
    color: "#7c3aed",
    title: "Credit Card Payments",
  },
};

const DetailedReports = () => {
  const { propertyId, detailedPage } = useParams();
  const { isLoading, error, data } = useQuery(
    [propertyId, detailedPage],
    async () => {
      // http://localhost:5000/api/total/64ff54a2b485b42210278310/revenue
      const response = await newRequest.get(
        `/total/${propertyId}/${detailedPage}`
      );
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

  return (
    <div className="detail-report-container">
      <h2>{dataInfo[detailedPage].title}</h2>
      <SimpleLineChart
        data={data?.results}
        xaxis="Date"
        dataKey={dataInfo[detailedPage].dataName}
        color={dataInfo[detailedPage].color}
      />
    </div>
  );
};
export default DetailedReports;
