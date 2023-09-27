import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import SimpleLineChart from "../../Components/SimpleLineChart/SimpleLineChart";
import "./DetailedReports.scss";

const dataKey = {
  revenue: { dataName: "Revenue", color: "#84cc16" },
  gallons: { dataName: "Gallons", color: "#3b82f6" },
  cash: { dataName: "Cash", color: "#0d9488" },
  credit: { dataName: "Credit Card", color: "#7c3aed" },
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
      console.log(response.data);
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
      <SimpleLineChart
        data={data?.results}
        xaxis="Date"
        dataKey={dataKey[detailedPage].dataName}
        color={dataKey[detailedPage].color}
      />
    </div>
  );
};
export default DetailedReports;
