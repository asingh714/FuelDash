import { useState } from "react";
import PropTypes from "prop-types";

import newRequest from "../../utils/newRequest";
import "./Modal.scss";

const Modal = ({ type, onClose, onConfirm }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async () => {
    if (type === "addProperty") {
      await newRequest.post("/properties", {
        name,
        address,
      });
    }
    if (type === "editProperty") {
      await newRequest.patch("/properties", {
        name,
        address,
      });
    }
    if (type === "deleteProperty") {
      await newRequest.delete("/properties"); // need id
    }
    onClose();
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
        {type === "password" && (
          <form action="">
            <div className="modal-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Must be at least 6 characters."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="modal-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Must be at least 6 characters."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </form>
        )}
        {type === "deleteProperty" && (
          <span>Are you sure you want to delete this property?</span>
        )}
        {type === "delete" && (
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
            <div className="modal-button confirm-button">Save Changes</div>
          )}
          {type === "password" && (
            <div className="modal-button confirm-button">Confirm</div>
          )}
          {(type === "delete" || type === "deleteProperty") && (
            <div className="modal-button delete-button">Delete</div>
          )}
          {type === "logout" && (
            <div className="modal-button logout-button" onClick={onConfirm}>
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
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
