import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import SimpleLineChart from "../../Components/SimpleLineChart/SimpleLineChart";
import "./DetailedReports.scss";

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

  const formattedData = data?.revenueList?.map((item) => ({
    ...item,
    day: item.date.slice(0, 10), // This will give you a string in the format "YYYY-MM-DD"
  }));

  return (
    <div className="detail-report-container">
      <SimpleLineChart data={formattedData} dataKey={detailedPage} />;
    </div>
  );
};
export default DetailedReports;
