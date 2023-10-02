import PropTypes from "prop-types";

import "./Modal.scss";

const Modal = ({ type, onClose, onConfirm }) => {
  const handleContainerClick = (e) => {
    e.stopPropagation();
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
              />
            </div>
            <div className="modal-input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
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
              />
            </div>
            <div className="modal-input-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Address"
              />
            </div>
          </form>
        )}
        {type === "password" && (
          <form action="">
            {/* <div className="modal-input-container"> */}
            <div className="modal-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Must be at least 6 characters."
                // value={formData.name}
                // onChange={handleChange}
              />
            </div>
            <div className="modal-input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Must be at least 6 characters."
                // value={formData.email}
                // onChange={handleChange}
              />
            </div>
            {/* </div> */}
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
            <div className="modal-button confirm-button">Add Property</div>
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
