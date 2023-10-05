import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import PropertyDropdown from "../../Components/PropertyDropdown/PropertyDropdown";
import DataTable from "../../Components/DataTable/DataTable";
import newRequest from "../../utils/newRequest";
import "./Products.scss";

const Products = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const handlePropertyChange = (propertyId) => {
    setSelectedProperty(propertyId);
  };

  const {
    data: gasData,
    isLoading: isGasDataLoading,
    error: gasDataError,
  } = useQuery(
    ["gasoline", selectedProperty],
    async () => {
      if (!selectedProperty) return null;
      const response = await newRequest.get(`/gasoline/${selectedProperty}`);
      if (!response.data) {
        throw new Error("No data returned");
      }
      return response.data;
    },
    {
      enabled: !!selectedProperty,
    }
  );

  const {
    data: nonGasData,
    isLoading: isNonGasDataLoading,
    error: nonGasDataError,
  } = useQuery(
    ["nonGas", selectedProperty],
    async () => {
      if (!selectedProperty) return null;
      const response = await newRequest.get(`/nonGas/${selectedProperty}`);
      if (!response.data) {
        throw new Error("No data returned");
      }
      return response.data;
    },
    {
      enabled: !!selectedProperty,
    }
  );

  const columns = {
    gasProducts: [
      {
        header: "Gas Type",
        accessorKey: "gasType",
      },
      {
        header: "Quantity",
        accessorKey: "quantityInGallons",
      },
      {
        header: "Cost Per Gallons",
        accessorKey: "costPerGallon",
      },
      {
        header: "Date",
        accessorKey: "receivedDate",
      },
      {
        header: "",
        accessorKey: "actions",
        // cell: ({ row }) => (
        //   <div className="btn-container">
        //     <div
        //       className="edit-btn"
        //       onClick={() => {
        //         setSelectedProperty({
        //           name: row.original.name,
        //           address: row.original.address,
        //           id: row.original._id,
        //         });
        //         setModalType("editProperty");
        //         setModalOpen(true);
        //       }}
        //     >
        //       Edit
        //     </div>
        //     <div
        //       className="delete-btn"
        //       onClick={() => {
        //         setSelectedProperty({
        //           name: row.original.name,
        //           address: row.original.address,
        //           id: row.original._id,
        //         });
        //         setModalType("deleteProperty");
        //         setModalOpen(true);
        //       }}
        //     >
        //       Delete
        //     </div>
        //   </div>
        // ),
      },
    ],
    nonGasProducts: [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Category",
        accessorKey: "category",
      },
      {
        header: "Quantity",
        accessorKey: "quantity",
      },
      {
        header: "Cost Per Item",
        accessorKey: "costPerItem",
      },
      {
        header: "Date",
        accessorKey: "receivedDate",
      },
      {
        header: "",
        accessorKey: "actions",
        // cell: ({ row }) => (
        //   <div className="btn-container">
        //     <div
        //       className="edit-btn"
        //       onClick={() => {
        //         setSelectedProperty({
        //           name: row.original.name,
        //           address: row.original.address,
        //           id: row.original._id,
        //         });
        //         setModalType("editProperty");
        //         setModalOpen(true);
        //       }}
        //     >
        //       Edit
        //     </div>
        //     <div
        //       className="delete-btn"
        //       onClick={() => {
        //         setSelectedProperty({
        //           name: row.original.name,
        //           address: row.original.address,
        //           id: row.original._id,
        //         });
        //         setModalType("deleteProperty");
        //         setModalOpen(true);
        //       }}
        //     >
        //       Delete
        //     </div>
        //   </div>
        // ),
      },
    ],
  };

  return (
    <div className="products-page-container">
      <DashboardMenu />
      <div className="products-container">
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
        {isGasDataLoading && isNonGasDataLoading && (
          <div>Loading products...</div>
        )}
        {gasDataError && nonGasDataError && <div>Error loading products</div>}
        {gasData && (
          <div className="products-table-container">
            <div>
              <h3>Gas Products</h3>
              {gasData && gasData.gasolineProducts ? (
                <DataTable
                  tableData={gasData.gasolineProducts}
                  columns={columns.gasProducts}
                  className="properties-table"
                />
              ) : null}
            </div>
            <div>
              <h3>Non-Gas Products</h3>
              {nonGasData && nonGasData.nonGasolineProducts ? (
                <DataTable
                  tableData={nonGasData.nonGasolineProducts}
                  columns={columns.nonGasProducts}
                  className="properties-table"
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
