import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import LogoutModal from "./LogoutModal/LogoutModal";
import ChangePasswordModal from "./ChangePasswordModal/ChangePasswordModal";
import PropertyModal from "./PropertyModal/PropertyModal";
import GasProductModal from "./GasProductModal/GasProductModal";
import SalesReportModal from "./SalesReportModal/SalesReportModal";
import NonGasProductModal from "./NonGasProductModal/NonGasProductModal";
import DeleteUserModal from "./DeleteUserModal/DeleteUserModal";
import "./Modal.scss";

const Modal = ({
  type,
  property,
  onClose,
  onConfirm,
  user,
  product,
  salesReport,
}) => {
  if (type === "logout") {
    return <LogoutModal onClose={onClose} onConfirm={onConfirm} />;
  }

  if (type === "changePassword") {
    return <ChangePasswordModal onClose={onClose} onConfirm={onConfirm} />;
  }

  if (
    type === "addProperty" ||
    type === "editProperty" ||
    type === "deleteProperty"
  ) {
    return (
      <PropertyModal
        type={type}
        property={property}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
  }

  if (
    type === "addGasProduct" ||
    type === "editGasProduct" ||
    type === "deleteGasProduct"
  ) {
    return (
      <GasProductModal
        type={type}
        product={product}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
  }

  if (
    type === "addNonGasProduct" ||
    type === "editNonGasProduct" ||
    type === "deleteNonGasProduct"
  ) {
    return (
      <NonGasProductModal
        type={type}
        product={product}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
  }

  if (type === "deleteUser") {
    return (
      <DeleteUserModal
        type={type}
        user={user}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    );
  }

  if (
    type === "addSalesReport" ||
    type === "editSalesReport" ||
    type === "deleteSalesReport"
  ) {
    return (
      <SalesReportModal
        type={type}
        salesReport={salesReport}
        onClose={onClose}
        onConfirm={onConfirm}
        property={property}
        product={product}
      />
    );
  }
};

Modal.propTypes = {
  type: PropTypes.string,
  property: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  user: PropTypes.object,
  product: PropTypes.object,
  salesReport: PropTypes.object,
};

export default Modal;
