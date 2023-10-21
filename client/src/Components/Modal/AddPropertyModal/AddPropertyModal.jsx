import React, { useState } from "react";
import PropTypes from "prop-types";
import "../Modal.scss";

const AddPropertyModal = ({ onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handlePropertySubmission = (e) => {
    e.preventDefault();
    onConfirm(name, address);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h4>Add Property</h4>
        <form action="">
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
          <div className="modal-button-container">
            <div className="modal-button" onClick={onClose}>
              Cancel
            </div>
            <div
              className="modal-button confirm-button"
              onClick={handlePropertySubmission}
            >
              Add Property
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AddPropertyModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default AddPropertyModal;
