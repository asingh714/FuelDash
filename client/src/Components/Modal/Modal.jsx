import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./Modal.scss";

const Modal = ({ type, property, onClose, onConfirm, user }) => {
  const [name, setName] = useState(property?.name || "");
  const [address, setAddress] = useState(property?.address || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (type === "editProperty" && property) {
      setName(property.name || "");
      setAddress(property.address || "");
    } else if (type === "addProperty") {
      setName("");
      setAddress("");
    }
  }, [type, property]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = () => {
    if (type === "addProperty") {
      onConfirm(name, address);
    } else if (type === "editProperty") {
      onConfirm(name, address, property.id);
    } else if (type === "deleteProperty") {
      onConfirm(property.id);
    } else if (type === "changePassword") {
      onConfirm(currentPassword, newPassword);
    } else if (type === "deleteUser") {
      onConfirm(user.id);
    } else if (type === "logout") {
      onConfirm();
    }
    onClose();
    setName("");
    setAddress("");
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={handleContainerClick}>
        {type === "addProperty" && (
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
          </form>
        )}

        {type === "editProperty" && (
          <form action="">
            <div className="modal-input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Edit the name of your property"
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
        )}
        {type === "changePassword" && (
          <form action="">
            <div className="modal-input-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="modal-input-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Must be at least 6 characters."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </form>
        )}
        {type === "deleteProperty" && (
          <span>Are you sure you want to delete this property?</span>
        )}
        {type === "deleteUser" && (
          <span>Are you sure you want to delete your account?</span>
        )}

        {type === "logout" && <span>Are you sure you want to log out?</span>}
        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>
          {type === "addProperty" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Add Property
            </div>
          )}
          {type === "editProperty" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Save Changes
            </div>
          )}
          {type === "changePassword" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Confirm
            </div>
          )}
          {type === "deleteProperty" && (
            <div className="modal-button delete-button" onClick={handleSubmit}>
              Delete
            </div>
          )}

          {type === "deleteUser" && (
            <div className="modal-button delete-button" onClick={handleSubmit}>
              Delete
            </div>
          )}

          {type === "logout" && (
            <div className="modal-button logout-button" onClick={handleSubmit}>
              Log out
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  type: PropTypes.string,
  property: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Modal;
