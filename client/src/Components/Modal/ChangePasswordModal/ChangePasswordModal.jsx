import React, { useState } from "react";
import PropTypes from "prop-types";
import "../Modal.scss";

const ChangePasswordModal = ({ onClose, onConfirm }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = (e) => {
    e.preventDefault();
    onConfirm(currentPassword, newPassword);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h4>Change Password</h4>
        <form action="">
          <div className="modal-input-group">
            <label htmlFor="currentPassword">Current Password</label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder="Your password"
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
          <div className="modal-button-container">
            <div className="modal-button" onClick={onClose}>
              Cancel
            </div>
            <div
              className="modal-button confirm-button"
              onClick={handlePasswordChange}
            >
              Confirm
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ChangePasswordModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ChangePasswordModal;
