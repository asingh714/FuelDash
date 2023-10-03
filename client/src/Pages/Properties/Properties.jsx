import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import DataTable from "../../Components/DataTable/DataTable";
import Modal from "../../Components/Modal/Modal";
import newRequest from "../../utils/newRequest";
import "./Properties.scss";

const Properties = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const queryClient = useQueryClient();

  const { loading, error, data } = useQuery(["properties"], async () => {
    const response = await newRequest.get(`/properties`);
    if (!response.data) {
      throw new Error("No data returned");
    }
    return response.data;
  });

  const addPropertyMutation = useMutation(
    (property) => newRequest.post("/properties", property),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("properties");
      },
    }
  );

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
              setSelectedProperty(row);
              setModalType("editProperty");
              setModalOpen(true);
            }}
          >
            Edit
          </div>
          <div
            className="delete-btn"
            onClick={() => {
              setSelectedProperty(row);
              setModalType("deleteProperty");
              setModalOpen(true);
            }}
          >
            Delete
          </div>
        </div>
      ),
    },
  ];

  const handleModalConfirm = (name, address) => {
    if (modalType === "addProperty") {
      addPropertyMutation.mutate({ name, address });
    } else if (modalType === "editProperty") {
      // Add your edit logic here...
    } else if (modalType === "deleteProperty") {
      // Add your delete logic here...
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
              setModalOpen(true);
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
      {isModalOpen && (
        <Modal
          type={modalType}
          property={selectedProperty}
          onClose={() => setModalOpen(false)}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

export default Properties;
