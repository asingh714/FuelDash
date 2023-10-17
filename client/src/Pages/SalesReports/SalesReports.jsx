import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import PropertyDropdown from "../../Components/PropertyDropdown/PropertyDropdown";
import DataTable from "../../Components/DataTable/DataTable";
import newRequest from "../../utils/newRequest";
import Modal from "../../Components/Modal/Modal";

import "./SalesReports.scss";

const SalesReports = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedSalesReport, setSelectedSalesReport] = useState(undefined);
  const [selectedProperty, setSelectedProperty] = useState(undefined); // null
  const [expandedRows, setExpandedRows] = useState({});

  // console.log("expandedRows", expandedRows);

  const { data, error, loading } = useQuery(
    ["sales", selectedProperty],
    async () => {
      if (!selectedProperty) return null;
      const response = await newRequest.get(`/sales/${selectedProperty}`);
      if (!response.data) {
        throw new Error("No data returned");
      }
      return response.data;
    },
    {
      enabled: !!selectedProperty,
    }
  );

  const handlePropertyChange = (propertyId) => {
    setSelectedProperty(propertyId);
  };

  const handleModalConfirm = (salesReport) => {
    console.log(salesReport);
  };

  const toggleRowExpansion = (rowId) => {
    console.log("rowId", rowId); // undefined
    setExpandedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const columns = [
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Revenue",
      accessorKey: "totalRevenue",
    },
    {
      header: "Cash Payments",
      accessorKey: "dailyCashPayments",
    },
    {
      header: "Credit Card Payments",
      accessorKey: "dailyCreditCardPayments",
    },
    {
      header: "",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="btn-container">
          <div
            className="edit-btn"
            onClick={() => {
              // setSelectedProperty({
              //   name: row.original.name,
              //   address: row.original.address,
              //   id: row.original._id,
              // });
              console.log(row.original);
              setSelectedSalesReport(row.original);
              setModalType("editSalesReport");
              setModalOpen(true);
            }}
          >
            Edit
          </div>
          <div
            className="delete-btn"
            onClick={() => {
              // setSelectedProperty({
              //   name: row.original.name,
              //   address: row.original.address,
              //   id: row.original._id,
              // });
              setSelectedSalesReport(row.original);
              setModalType("deleteSalesReport");
              setModalOpen(true);
            }}
          >
            Delete
          </div>
        </div>
      ),
    },
    {
      header: "",
      accessorKey: "accordionAction",
      cell: (cell) => {
        const rowId = cell.row.original._id;
        return (
          <div
            className="accordion-btn"
            onClick={() => toggleRowExpansion(rowId)}
          >
            {expandedRows[rowId] ? "-" : "+"}
          </div>
        );
      },
    },
  ];

  const gasolineColumns = [
    {
      header: "Gas Type",
      accessorKey: "gasType",
    },
    {
      header: "Gallons Sold",
      accessorKey: "gallonsSold",
    },
    {
      header: "Price Sold At",
      accessorKey: "priceSoldAt",
    },
  ];

  const nonGasolineSalesColumns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Quantity Sold",
      accessorKey: "quantitySold",
    },
    {
      header: "Price Sold At",
      accessorKey: "priceSoldAt",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="sales-report-page-container">
      <DashboardMenu />
      <div className="sales-report-container">
        <hr />
        <PropertyDropdown
          onPropertiesFetched={(properties) => {
            if (properties?.length > 0 && !selectedProperty) {
              setSelectedProperty(properties[0]._id);
            }
          }}
          onPropertyChange={handlePropertyChange}
          defaultSelected={selectedProperty}
        />

        {data && (
          <DataTable
            tableData={data.dailySalesMetrics}
            columns={columns}
            mainTable={true}
            expandedContent={(row) => {
              if (expandedRows[row._id]) {
                return (
                  <>
                    <DataTable
                      tableData={row.gasolineSales}
                      columns={gasolineColumns}
                      mainTable={false}
                    />

                    <DataTable
                      tableData={row.nonGasolineSales}
                      columns={nonGasolineSalesColumns}
                      mainTable={false}
                    />
                  </>
                );
              }
              return null;
            }}
          />
        )}
      </div>
      {isModalOpen && (
        <Modal
          type={modalType}
          salesReport={selectedSalesReport}
          onClose={() => setModalOpen(false)}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

export default SalesReports;
