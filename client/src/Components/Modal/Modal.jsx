import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import DateSelector from "../DatePicker/DatePicker";

import "./Modal.scss";

const getCurrentLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Modal = ({ type, property, onClose, onConfirm, user, product }) => {
  const [name, setName] = useState(property?.name || "");
  const [address, setAddress] = useState(property?.address || "");
  const [nonGasProduct, setNonGasProduct] = useState({
    name: product?.name || "",
    category: product?.category || "",
    quantity: product?.quantity || "",
    costPerItem: product?.costPerItem || "",
    receivedDate: product?.receivedDate || getCurrentLocalDate(),
  });
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
    if (
      type === "editNonGasProduct" ||
      (type === "deleteNonGasProduct" && product)
    ) {
      setNonGasProduct({
        id: product._id,
        name: product.name,
        category: product.category,
        quantity: product.quantity,
        costPerItem: product.costPerItem,
        receivedDate: product.receivedDate,
      });
    }
  }, [type, property, product]);

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
    } else if (type === "addNonGasProduct" || type === "editNonGasProduct") {
      onConfirm(nonGasProduct);
    } else if (type === "deleteNonGasProduct") {
      onConfirm(nonGasProduct);
    }
    onClose();
    setName("");
    setAddress("");
    setCurrentPassword("");
    setNewPassword("");
    setNonGasProduct({
      name: product?.name || "",
      category: product?.category || "",
      quantity: product?.quantity || "",
      costPerItem: product?.costPerItem || "",
      receivedDate: product?.receivedDate || getCurrentLocalDate(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={handleContainerClick}>
        {type === "editNonGasProduct" || type === "addNonGasProduct" ? (
          <form>
            {/* Name */}
            <div className="modal-input-group">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                id="productName"
                value={nonGasProduct.name}
                onChange={(e) =>
                  setNonGasProduct({ ...nonGasProduct, name: e.target.value })
                }
              />
            </div>

            {/* Category */}
            <div className="modal-input-group">
              <label htmlFor="productCategory">Category</label>
              <select
                id="productCategory"
                value={nonGasProduct.category}
                onChange={(e) =>
                  setNonGasProduct({
                    ...nonGasProduct,
                    category: e.target.value,
                  })
                }
              >
                <option value="">Select a category</option>
                {[
                  "Beverages",
                  "Snacks",
                  "Tobacco Products",
                  "Automotive Supplies",
                  "Groceries",
                  "Health & Beauty",
                  "Travel and Leisure",
                ].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div className="modal-input-group">
              <label htmlFor="productQuantity">Quantity</label>
              <input
                type="number"
                id="productQuantity"
                value={nonGasProduct.quantity}
                onChange={(e) =>
                  setNonGasProduct({
                    ...nonGasProduct,
                    quantity: e.target.value,
                  })
                }
              />
            </div>

            {/* Cost Per Item */}
            <div className="modal-input-group">
              <label htmlFor="productCost">Cost Per Item</label>
              <input
                type="text"
                id="productCost"
                value={nonGasProduct.costPerItem}
                onChange={(e) =>
                  setNonGasProduct({
                    ...nonGasProduct,
                    costPerItem: e.target.value,
                  })
                }
              />
            </div>

            {/* Received Date */}
            <div className="modal-input-group">
              <label>Received Date</label>
              <DateSelector
                currentDate={nonGasProduct.receivedDate}
                onDateChange={(date) =>
                  setNonGasProduct({ ...nonGasProduct, receivedDate: date })
                }
              />
            </div>
          </form>
        ) : null}

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
        {type === "deleteNonGasProduct" && (
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

          {type === "deleteNonGasProduct" && (
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
          {type === "addNonGasProduct" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Add Product
            </div>
          )}
          {type === "editNonGasProduct" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Edit Product
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
  product: PropTypes.object,
};

export default Modal;
