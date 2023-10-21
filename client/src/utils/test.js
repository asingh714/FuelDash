import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../Modal.scss";

const PropertyModal = ({ type, property, onClose, onConfirm }) => {
  const [name, setName] = useState(property?.name || "");
  const [address, setAddress] = useState(property?.address || "");
  console.log("Rendering PropertyModal with type:", type);

  useEffect(() => {
    if (property) {
      setName(property.name);
      setAddress(property.address);
    }
  }, [property]);

  const handlePropertySubmission = (e) => {
    e.preventDefault();
    if (type === "editProperty") {
      onConfirm(name, address, property.id);
    } else if (type === "addProperty") {
      onConfirm(name, address);
    } else if (type === "deleteProperty") {
      onConfirm(property.id);
    }

    setName("");
    setAddress("");
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="modal-input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </form>
        ) : (
          <span>Are you sure you want to delete this property?</span>
        )}

        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>
          <div
            className="modal-button confirm-button"
            onClick={handlePropertySubmission}
          >
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
