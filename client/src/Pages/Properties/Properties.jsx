import { useQuery } from "@tanstack/react-query";

import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import DataTable from "../../Components/DataTable/DataTable";
import newRequest from "../../utils/newRequest";
import "./Properties.scss";

const columns = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Address",
    accessorKey: "address",
  },
];

const Properties = () => {
  const { loading, error, data } = useQuery(["properties"], async () => {
    const response = await newRequest.get(`/properties`);
    if (!response.data) {
      throw new Error("No data returned");
    }
    console.log(response.data);
    return response.data;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading data for query 1</div>;
  }

  return (
    <div className="properties-page-container">
      <DashboardMenu />
      <div className="properties-container">
        <hr />
        <h4>Your Properties</h4>
        <DataTable
          tableData={data?.properties}
          columns={columns}
          className="properties-table"
        />
      </div>
    </div>
  );
};

export default Properties;
