import PropTypes from "prop-types";
import "../Modal.scss";

const LogoutModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container">
        <span>Are you sure you want to log out?</span>
        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>
          <div
            className="modal-button logout-button"
            onClick={() => {
              onConfirm();
            }}
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
};

LogoutModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default LogoutModal;
