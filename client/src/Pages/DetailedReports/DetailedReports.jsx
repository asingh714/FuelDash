import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import SimpleLineChart from "../../Components/SimpleLineChart/SimpleLineChart";
import DataTable from "../../Components/DataTable/DataTable";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";

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

const columns = [
  {
    header: "Date",
    accessorKey: "Date",
  },
  {
    header: "Revenue",
    accessorKey: "Revenue",
  },
];

const DetailedReports = () => {
  const { propertyId, detailedPage } = useParams();
  const query1 = useQuery(
    [`${propertyId}-${detailedPage}-query1`, propertyId, detailedPage],
    async () => {
      const response = await newRequest.get(
        `/total/${propertyId}/${detailedPage}`
      );
      if (!response.data) {
        throw new Error("No data returned");
      }
      return response.data;
    }
  );

  const query2 = useQuery(
    [`${propertyId}-${detailedPage}-query2`, propertyId, detailedPage],
    async () => {
      const response = await newRequest.get(
        `/total/${propertyId}/${detailedPage}/reverse`
      );
      if (!response.data) {
        throw new Error("No data returned");
      }
      return response.data;
    }
  );

  if (query1.isLoading || query2.isLoading) {
    return <div>Loading...</div>;
  }

  if (query1.error) {
    console.error(query1.error);
    return <div>Error loading data for query 1</div>;
  }

  if (query2.error) {
    console.error(query2.error);
    return <div>Error loading data for query 2</div>;
  }

  return (
    <div className="detail-report-page-container">
      <DashboardMenu />
      <div className="detail-report-container">
        <h2>{dataInfo[detailedPage].title}</h2>
        <SimpleLineChart
          data={query1.data?.results}
          xaxis="Date"
          dataKey={dataInfo[detailedPage].dataName}
          color={dataInfo[detailedPage].color}
          className="chart"
        />
        {/* <DataTable
          tableData={query2.data?.results}
          columns={columns}
          className="table"
        /> */}
      </div>
    </div>
  );
};
export default DetailedReports;
