import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "../Modal.scss";
import {
  toDisplayFormat,
  toBackendFormat,
} from "../../../utils/formatCurrency";
import getCurrentLocalDate from "../../../utils/getCurrentLocalDate";
import DateSelector from "../../DatePicker/DatePicker";

const NonGasProductModal = ({ type, product, onClose, onConfirm }) => {
  const initializeState = (type, product) => {
    if (
      (type === "editNonGasProduct" || type === "deleteNonGasProduct") &&
      product
    ) {
      return {
        id: product._id,
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        costPerItem: product.costPerItem,
        receivedDate: product.receivedDate,
      };
    } else {
      return {
        name: "",
        category: "",
        quantity: 0,
        costPerItem: 0,
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

  const handleNonGasCostChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, costPerItem: value });
  };

  const handleNonGasFocus = (e) => {
    e.target.value = formData.costPerItem;
  };

  const handleNonGasBlur = (e) => {
    e.target.value = toDisplayFormat(formData.costPerItem);
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!formData.category.trim()) {
      errors.category = "Category is required.";
    }

    if (!formData.quantity) {
      errors.quantity = "Quantity is required.";
    }

    if (!formData.costPerItem) {
      errors.costPerItem = "Cost per item is required.";
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

  const handleConfirm = () => {
    if (type !== "deleteNonGasProduct" && !validateForm()) {
      return;
    }

    if (type === "addNonGasProduct" || type === "editNonGasProduct") {
      onConfirm({
        ...formData,
        costPerItem: toBackendFormat(formData.costPerItem),
      });
    } else if (type === "deleteNonGasProduct") {
      onConfirm(formData);
    }

    handleClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h4>
          {type === "editNonGasProduct"
            ? "Edit Product"
            : type === "addNonGasProduct"
            ? "Add Product"
            : ""}
        </h4>
        {type !== "deleteNonGasProduct" ? (
          <form>
            <div className="modal-input-group">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>

            <div className="modal-input-group">
              <label htmlFor="productCategory">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                name="category"
              >
                <option value="">Select a category</option>
                {[
                  "Beverages",
                  "Snacks",
                  "Tobacco Products",
                  "Automotive Supplies",
                  "Groceries",
                  "Health & Beauty",
                  "Travel and Leisure",
                ].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="error-text">{errors.category}</p>
              )}
            </div>

            <div className="modal-input-group">
              <label htmlFor="productQuantity">Quantity</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter quantity"
                min={0}
                value={formData.quantity}
                onChange={handleInputChange}
              />
              {errors.quantity && (
                <p className="error-text">{errors.quantity}</p>
              )}
            </div>

            <div className="modal-input-group">
              <label htmlFor="productCost">Cost Per Item</label>
              <input
                type="text"
                id="costPerItem"
                name="costPerItem"
                value={toDisplayFormat(formData.costPerItem)}
                onChange={handleNonGasCostChange}
                onFocus={handleNonGasFocus}
                onBlur={handleNonGasBlur}
              />
              {errors.costPerItem && (
                <p className="error-text">{errors.costPerItem}</p>
              )}
            </div>

            <div className="modal-input-group">
              <label>Received Date</label>
              <DateSelector
                currentDate={formData.receivedDate}
                onDateChange={(date) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    receivedDate: date,
                  }))
                }
              />
              {errors.receivedDate && (
                <p className="error-text">{errors.receivedDate}</p>
              )}
            </div>
          </form>
        ) : (
          <span>Are you sure you want to delete this product?</span>
        )}

        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>
          <div className="modal-button confirm-button" onClick={handleConfirm}>
            {type === "editNonGasProduct"
              ? "Save Changes"
              : type === "addNonGasProduct"
              ? "Add Product"
              : "Delete Product"}
          </div>
        </div>
      </div>
    </div>
  );
};

NonGasProductModal.propTypes = {
  type: PropTypes.oneOf([
    "addNonGasProduct",
    "editNonGasProduct",
    "deleteNonGasProduct",
  ]).isRequired,
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default NonGasProductModal;
