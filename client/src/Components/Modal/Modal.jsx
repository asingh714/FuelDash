import "./Modal.scss";

const Modal = ({ message }) => {
  return (
    <div className="modal-container">
      <span>{message}</span>
    </div>
  );
};

export default Modal;
