import PropTypes from "prop-types";

const DeleteUserModal = ({ user, onClose, onConfirm }) => {
  const handleSubmit = () => {
    onConfirm(user.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <span>Are you sure you want to delete your account?</span>
        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>
          <div className="modal-button delete-button" onClick={handleSubmit}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

DeleteUserModal.propTypes = {
  user: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteUserModal;
