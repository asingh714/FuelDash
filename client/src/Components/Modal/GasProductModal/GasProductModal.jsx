import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../Modal.scss";

import getCurrentLocalDate from "../../../utils/getCurrentLocalDate";

const GasProductModal = ({ type, product, onClose, onConfirm }) => {
  const initializeState = (type, product) => {
    if (type === "editGasProduct" && product) {
      return {
        gasType: product.gasType,
        quantityInGallons: product.quantityInGallons,
        costPerGallon: product.costPerGallon,
        receivedDate: product.receivedDate,
      };
    } else {
      return {
        gasType: "",
        quantityInGallons: 0,
        costPerGallon: 0,
        receivedDate: getCurrentLocalDate(),
      };
    }
  };

  const [formData, setFormData] = useState(initializeState(type, product));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initializeState(type, product));
  }, [type, product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.gasType.trim()) {
      errors.gasType = "Gas type is required.";
    }
    if (!formData.quantityInGallons) {
      errors.quantityInGallons = "Quantity in gallons is required.";
    }
    if (!formData.costPerGallon) {
      errors.costPerGallon = "Cost per gallon is required.";
    }
    if (!formData.receivedDate) {
      errors.receivedDate = "Received date is required.";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleClose = () => {
    setFormData(initializeState(type, product));
    onClose();
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (type !== "deleteGasProduct" && !validateForm()) {
      return;
    }

    if (type === "editGasProduct") {
      onConfirm(
        formData.gasType,
        formData.quantityInGallons,
        formData.costPerGallon,
        formData.receivedDate,
        product.id
      );
    } else if (type === "addGasProduct") {
      onConfirm(
        formData.gasType,
        formData.quantityInGallons,
        formData.costPerGallon,
        formData.receivedDate
      );
    } else if (type === "deleteGasProduct") {
      onConfirm(product.id);
    }
    handleClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h4>
          {type === "editGasProduct"
            ? "Edit Product"
            : type === "addGasProduct"
            ? "Add Product"
            : ""}
        </h4>

        {type !== "deleteGasProduct" ? (
          <form>
            <div className="modal-input-group">
              <label htmlFor="gasType">Gas Type</label>
              <input
                type="text"
                name="gasType"
                id="gasType"
                placeholder="Gas Type"
                value={formData.gasType}
                onChange={handleInputChange}
              />
              {errors.gasType && <p className="error-text">{errors.gasType}</p>}
            </div>
            <div className="modal-input-group">
              <label htmlFor="quantityInGallons">Quantity (in gallons)</label>
              <input
                type="number"
                name="quantityInGallons"
                id="quantityInGallons"
                placeholder="Quantity in Gallons"
                value={formData.quantityInGallons}
                onChange={handleInputChange}
              />
              {errors.quantityInGallons && (
                <p className="error-text">{errors.quantityInGallons}</p>
              )}
            </div>
            <div className="modal-input-group">
              <label htmlFor="costPerGallon">Cost Per Gallon</label>
              <input
                type="number"
                name="costPerGallon"
                id="costPerGallon"
                placeholder="Cost per Gallon"
                value={formData.costPerGallon}
                onChange={handleInputChange}
              />
              {errors.costPerGallon && (
                <p className="error-text">{errors.costPerGallon}</p>
              )}
            </div>
            <div className="modal-input-group">
              <label htmlFor="receivedDate">Received Date</label>
              <input
                type="date"
                name="receivedDate"
                id="receivedDate"
                value={formData.receivedDate}
                onChange={handleInputChange}
              />
              {errors.receivedDate && (
                <p className="error-text">{errors.receivedDate}</p>
              )}
            </div>
          </form>
        ) : (
          <span>Are you sure you want to delete this gas product?</span>
        )}

        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>
          <div className="modal-button confirm-button" onClick={handleConfirm}>
            {type === "editGasProduct"
              ? "Save Changes"
              : type === "addGasProduct"
              ? "Add Product"
              : "Delete Product"}
          </div>
        </div>
      </div>
    </div>
  );
};

GasProductModal.propTypes = {
  type: PropTypes.oneOf(["addGasProduct", "editGasProduct", "deleteGasProduct"])
    .isRequired,
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default GasProductModal;
