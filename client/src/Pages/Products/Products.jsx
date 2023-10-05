import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import PropertyDropdown from "../../Components/PropertyDropdown/PropertyDropdown";
import DataTable from "../../Components/DataTable/DataTable";
import newRequest from "../../utils/newRequest";
import "./Products.scss";

const Products = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [allProperties, setAllProperties] = useState([]);

  const { data, isLoading, error } = useQuery(
    ["properties"],
    async () => {
      if (!selectedProperty) return null; // Don't fetch if no property is selected
      const response = await newRequest.get(`/gasoline/${selectedProperty}`);
      if (!response.data) {
        throw new Error("No data returned");
      }
      console.log(response.data);
      return response.data;
    },
    {
      enabled: !!selectedProperty, // Only run the query if a property is selected
    }
  );

  useEffect(() => {
    if (!isLoading && data) {
      setAllProperties(data);
      setSelectedProperty(data[0]?._id);
    }
  }, [data, isLoading]);

  const columns = [
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
  ];

  return (
    <div>
      <PropertyDropdown
        onPropertyChange={setSelectedProperty}
        defaultSelected={selectedProperty}
      />
      {isLoading && <div>Loading products...</div>}
      {error && <div>Error loading products</div>}
      {data && (
        <div>
          <div>
            <h3>Gas Products</h3>
            {data && data.gasolineProducts ? (
              <DataTable
                tableData={data.gasolineProducts}
                columns={columns}
                className="properties-table"
              />
            ) : null}
          </div>
          <div>
            <h3>Non-Gas Products</h3>
            {/* <Table products={products.nonGas} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
