import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import PropertyDropdown from "../../Components/PropertyDropdown/PropertyDropdown";
import DataTable from "../../Components/DataTable/DataTable";
import Modal from "../../Components/Modal/Modal";
import newRequest from "../../utils/newRequest";
import {
  formatCurrency,
  formatNumberToTwoDecimalPlaces,
} from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
import OvalLoader from "../../Components/OvalLoader/OvalLoader";
import "./Products.scss";

const Products = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(undefined); // null
  const [selectedProduct, setSelectedProduct] = useState(undefined); // null
  const queryClient = useQueryClient();

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

  const addNonGasProductMutation = useMutation(
    (nonGasProduct) =>
      newRequest.post(`/nonGas/${selectedProperty}`, nonGasProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("nonGas");
      },
    }
  );

  const updateNonGasProductMutation = useMutation(
    (updatedProduct) =>
      newRequest.patch(`/nonGas/${updatedProduct.id}`, updatedProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("nonGas");
      },
    }
  );

  const deleteNonGasProductMutation = useMutation(
    (productId) => newRequest.delete(`/nonGas/${productId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("nonGas");
      },
    }
  );

  const addGasProductMutation = useMutation(
    (nonGasProduct) =>
      newRequest.post(`/gasoline/${selectedProperty}`, nonGasProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gasoline");
      },
    }
  );

  const updateGasProductMutation = useMutation(
    (updatedProduct) =>
      newRequest.patch(`/gasoline/${updatedProduct.id}`, updatedProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gasoline");
      },
    }
  );

  const deleteGasProductMutation = useMutation(
    (productId) => newRequest.delete(`/gasoline/${productId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gasoline");
      },
    }
  );

  const handleModalConfirm = (product) => {
    if (modalType === "addNonGasProduct") {
      addNonGasProductMutation.mutate(product);
    } else if (modalType === "editNonGasProduct") {
      updateNonGasProductMutation.mutate(product);
    } else if (modalType === "deleteNonGasProduct") {
      deleteNonGasProductMutation.mutate(product.id);
    } else if (modalType === "addGasProduct") {
      addGasProductMutation.mutate(product);
    } else if (modalType === "editGasProduct") {
      updateGasProductMutation.mutate(product);
    } else if (modalType === "deleteGasProduct") {
      deleteGasProductMutation.mutate(product.id);
    }
  };

  const columns = {
    gasProducts: [
      {
        header: "Gas Type",
        accessorKey: "gasType",
      },
      {
        header: "Quantity",
        accessorKey: "quantityInGallons",
        cell: ({ row }) =>
          formatNumberToTwoDecimalPlaces(row.original.quantityInGallons),
      },
      {
        header: "Cost Per Gallons",
        accessorKey: "costPerGallon",
        cell: ({ row }) => formatCurrency(row.original.costPerGallon),
      },
      {
        header: "Date",
        accessorKey: "receivedDate",
        cell: ({ row }) => formatDate(row.original.receivedDate),
      },
      {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="btn-container">
            <div
              className="edit-btn"
              onClick={() => {
                setSelectedProduct(row.original);
                setModalType("editGasProduct");
                setModalOpen(true);
              }}
            >
              Edit
            </div>
            <div
              className="delete-btn"
              onClick={() => {
                setSelectedProduct(row.original);
                setModalType("deleteGasProduct");
                setModalOpen(true);
              }}
            >
              Delete
            </div>
          </div>
        ),
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
        cell: ({ row }) => formatCurrency(row.original.costPerItem),
      },
      {
        header: "Date",
        accessorKey: "receivedDate",
        cell: ({ row }) => formatDate(row.original.receivedDate),
      },
      {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => (
          <div className="btn-container">
            <div
              className="edit-btn"
              onClick={() => {
                setSelectedProduct(row.original);
                setModalType("editNonGasProduct");
                setModalOpen(true);
              }}
            >
              Edit
            </div>
            <div
              className="delete-btn"
              onClick={() => {
                setSelectedProduct(row.original);
                setModalType("deleteNonGasProduct");
                setModalOpen(true);
              }}
            >
              Delete
            </div>
          </div>
        ),
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

        {/* {isGasDataLoading && isNonGasDataLoading && <OvalLoader />} */}
        {/* TODO FIX Component for empty */}
        {gasDataError && nonGasDataError && <div>Error loading products</div>}
        {gasData && (
          <div className="products-table-container">
            <div className="gas-products-container">
              <div className="products-heading-btn-container">
                <h3>Gas Products</h3>
                <div
                  className="add-btn"
                  onClick={() => {
                    setModalType("addGasProduct");
                    setModalOpen(true);
                  }}
                >
                  Add Gas Product
                </div>
              </div>
              {Array.isArray(gasData?.gasolineProducts) &&
              gasData?.gasolineProducts.length > 0 ? (
                <DataTable
                  tableData={gasData?.gasolineProducts}
                  columns={columns.gasProducts}
                  mainTable={true}
                />
              ) : null}
            </div>

            <div className="nongas-products-container">
              <div className="products-heading-btn-container">
                <h3>Non-Gas Products</h3>
                <div
                  className="add-btn"
                  onClick={() => {
                    setModalType("addNonGasProduct");
                    setModalOpen(true);
                  }}
                >
                  Add Non Gas Product
                </div>
              </div>
              {Array.isArray(nonGasData?.nonGasolineProducts) &&
              nonGasData?.nonGasolineProducts.length > 0 ? (
                <DataTable
                  tableData={nonGasData?.nonGasolineProducts}
                  columns={columns.nonGasProducts}
                  mainTable={true}

                  // className="properties-table"
                />
              ) : null}
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          type={modalType}
          product={selectedProduct}
          onClose={() => setModalOpen(false)}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

export default Products;
