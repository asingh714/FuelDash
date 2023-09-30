import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import DataTable from "../../Components/DataTable/DataTable";
import PropertyModal from "../../Components/PropertiesModal";
import newRequest from "../../utils/newRequest";
import "./Properties.scss";

const Properties = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const { loading, error, data } = useQuery(["properties"], async () => {
    const response = await newRequest.get(`/properties`);
    if (!response.data) {
      throw new Error("No data returned");
    }
    return response.data;
  });

  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Address",
      accessorKey: "address",
    },
    {
      header: "",
      accessorKey: "actions",
      cell: ({ row }) => (
        <div className="btn-container">
          <div className="edit-btn" onClick={() => handleEdit(row.original)}>
            Edit
          </div>
          <div
            className="delete-btn"
            onClick={() => handleDelete(row.original)}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  const handleEdit = (property) => {
    // Implement your edit logic here
    console.log("Edit:", property);
  };

  const handleDelete = (property) => {
    // Implement your delete logic here
    console.log("Delete:", property);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="properties-page-container">
      <DashboardMenu />
      <div className="properties-container">
        <hr />
        <div className="properties-header">
          <div className="properties-text-container">
            <h4>Your Properties</h4>
            <span>
              A list of all the properties in your account including their name,
              and address.
            </span>
          </div>
          <div className="add-prop-btn">Add Properties</div>
        </div>
        {data && data.properties ? (
          <DataTable
            tableData={data.properties}
            columns={columns}
            className="properties-table"
          />
        ) : null}
      </div>
      {(isAddModalOpen || isDeleteModalOpen || isEditModalOpen) && (
        <PropertyModal
          type={modalType}
          onClose={() => {
            setAddModalOpen(false);
            setDeleteModalOpen(false);
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Properties;
