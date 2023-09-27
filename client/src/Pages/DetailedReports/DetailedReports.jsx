import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import SimpleLineChart from "../../Components/SimpleLineChart/SimpleLineChart";
import "./DetailedReports.scss";

const dataKey = {
  revenue: "Revenue",
  gallons: "Gallons",
  cash: "Cash",
  credit: "Credit Card",
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
        dataKey={dataKey[detailedPage]}
      />
    </div>
  );
};
export default DetailedReports;
