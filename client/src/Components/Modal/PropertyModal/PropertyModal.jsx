import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../Modal.scss";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

const PropertyModal = ({ type, property, onClose, onConfirm }) => {
  const initializeState = (type, property) => {
    if (type === "editProperty" && property) {
      return {
        name: property.name,
        address: property.address,
      };
    } else {
      return {
        name: "",
        address: "",
      };
    }
  };

  const [formData, setFormData] = useState(initializeState(type, property));
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData(initializeState(type, property));
  }, [type, property]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }
    if (!formData.address.trim()) {
      errors.address = "Address is required.";
    }
    setErrors(errors);

    return Object.keys(errors).length === 0;
  };
  const handleClose = () => {
    setFormData(initializeState(type, property));
    onClose();
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (type !== "deleteProperty" && !validateForm()) {
      return;
    }

    if (type === "editProperty") {
      onConfirm(formData.name, formData.address, property.id);
    } else if (type === "addProperty") {
      onConfirm(formData.name, formData.address);
    } else if (type === "deleteProperty") {
      onConfirm(property.id);
    }
    handleClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h4>
          {type === "editProperty"
            ? "Edit Property"
            : type === "addProperty"
            ? "Add Property"
            : ""}
        </h4>

        {type !== "deleteProperty" ? (
          <form>
            <div className="modal-input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name of your property"
                value={formData.name}
                onChange={handleInputChange}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
            </div>
            <div className="modal-input-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                placeholder="Address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>
          </form>
        ) : (
          <span>Are you sure you want to delete this property?</span>
        )}

        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>
          <div className="modal-button confirm-button" onClick={handleConfirm}>
            {type === "editProperty"
              ? "Save Changes"
              : type === "addProperty"
              ? "Add Property"
              : "Delete Property"}
          </div>
        </div>
      </div>
    </div>
  );
};

PropertyModal.propTypes = {
  type: PropTypes.oneOf(["addProperty", "editProperty", "deleteProperty"])
    .isRequired,
  property: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default PropertyModal;
