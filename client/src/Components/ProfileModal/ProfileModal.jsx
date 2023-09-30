import PropTypes from "prop-types";

import "./ProfileModal.scss";

const ProfileModal = ({ type, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container">
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
        {type === "delete" && (
          <span>Are you sure you want to delete your account?</span>
        )}
        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>
          {type === "password" && (
            <div className="modal-button confirm-button">Confirm</div>
          )}
          {type === "delete" && (
            <div className="modal-button delete-button">Delete</div>
          )}
        </div>
      </div>
    </div>
  );
};
ProfileModal.propTypes = {
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default ProfileModal;
