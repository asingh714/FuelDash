import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import {
  formatCurrency,
  formatNumberToTwoDecimalPlaces,
} from "../../utils/formatCurrency";
import SimpleLineChart from "../../Components/SimpleLineChart/SimpleLineChart";
import DataTable from "../../Components/DataTable/DataTable";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";

import "./DetailedReports.scss";
import OvalLoader from "../../Components/OvalLoader/OvalLoader";

const dataInfo = {
  revenue: {
    dataName: "Revenue",
    color: "#84cc16",
    title: "Revenue",
    columns: [
      {
        header: "Date",
        accessorKey: "Date",
      },
      {
        header: "Revenue",
        accessorKey: "Revenue",
        cell: ({ row }) => formatCurrency(row.original.Revenue),
      },
    ],
  },
  gallons: {
    dataName: "Gallons",
    color: "#3b82f6",
    title: "Gallons Sold",
    columns: [
      {
        header: "Date",
        accessorKey: "Date",
      },
      {
        header: "Gallons",
        accessorKey: "Gallons",
        cell: ({ row }) => formatNumberToTwoDecimalPlaces(row.original.Gallons),
      },
    ],
  },
  cash: {
    dataName: "Cash",
    color: "#0d9488",
    title: "Cash Payments",
    columns: [
      {
        header: "Date",
        accessorKey: "Date",
      },
      {
        header: "Cash",
        accessorKey: "Cash",
        cell: ({ row }) => formatCurrency(row.original.Cash),
      },
    ],
  },
  credit: {
    dataName: "Credit Card",
    color: "#7c3aed",
    title: "Credit Card Payments",
    columns: [
      {
        header: "Date",
        accessorKey: "Date",
      },
      {
        header: "Credit Card",
        accessorKey: "Credit Card",
        cell: ({ row }) => formatCurrency(row.original["Credit Card"]),
      },
    ],
  },
};

const DetailedReports = () => {
  const { propertyId, detailedPage } = useParams();
  const query1 = useQuery(
    [`${propertyId}-${detailedPage}-query1`, propertyId, detailedPage],
    async () => {
      const response = await newRequest.get(
        `/total/${propertyId}/${detailedPage}/ascending`
      );
      if (!response.data) {
        throw new Error("No data returned");
      }
      console.log(query1.data?.results);

      return response.data;
    }
  );

  const query2 = useQuery(
    [`${propertyId}-${detailedPage}-query2`, propertyId, detailedPage],
    async () => {
      const response = await newRequest.get(
        `/total/${propertyId}/${detailedPage}/descending`
      );
      if (!response.data) {
        throw new Error("No data returned");
      }
      return response.data;
    }
  );

  if (query1.isLoading || query2.isLoading) {
    return <OvalLoader />;
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
        <DataTable
          tableData={query2.data?.results}
          columns={dataInfo[detailedPage].columns}
          className="table"
          mainTable={true}
        />
      </div>
    </div>
  );
};
export default DetailedReports;
