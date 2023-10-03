import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import DataTable from "../../Components/DataTable/DataTable";
import Modal from "../../Components/Modal/Modal";
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
          <div
            className="edit-btn"
            onClick={() => {
              setModalType("editProperty");
              setEditModalOpen(true);
            }}
          >
            Edit
          </div>
          <div
            className="delete-btn"
            onClick={() => {
              setModalType("deleteProperty");
              setDeleteModalOpen(true);
            }}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  const handleModalConfirm = async () => {
    switch (modalType) {
      case "addProperty":
        await newRequest.post("/properties", {
          name,
          address,
        });
        break;

        await newRequest.patch("/properties", {
          name,
          address,
        });
        break;
      case "deleteProperty":
        // Your logic for deleting a property
        await newRequest.delete("/properties");
        break;
      default:
        console.error("Unknown modal type:", modalType);
    }
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
          <div
            className="add-prop-btn"
            onClick={() => {
              setModalType("addProperty");
              setAddModalOpen(true);
            }}
          >
            Add Properties
          </div>
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
        <Modal
          type={modalType}
          onClose={() => {
            setAddModalOpen(false);
            setDeleteModalOpen(false);
            setEditModalOpen(false);
          }}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

export default Properties;
