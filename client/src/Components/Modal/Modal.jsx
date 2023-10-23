import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import DateSelector from "../DatePicker/DatePicker";
import LogoutModal from "./LogoutModal/LogoutModal";
import ChangePasswordModal from "./ChangePasswordModal/ChangePasswordModal";
import PropertyModal from "./PropertyModal/PropertyModal";
import GasProductModal from "./GasProductModal/GasProductModal";
import getCurrentLocalDate from "../../utils/getCurrentLocalDate";
import { toDisplayFormat, toBackendFormat } from "../../utils/formatCurrency";

import "./Modal.scss";
import NonGasProductModal from "./NonGasProductModal/NonGasProductModal";
import DeleteUserModal from "./DeleteUserModal/DeleteUserModal";

const Modal = ({
  type,
  property,
  onClose,
  onConfirm,
  user,
  product,
  salesReport,
}) => {
  const [salesReportData, setSalesReportData] = useState({
    id: salesReport?._id || 0,
    date: salesReport?.date || getCurrentLocalDate(),
    totalRevenue: salesReport?.totalRevenue || 0,
    dailyCashPayments: salesReport?.dailyCashPayments || 0,
    dailyCreditCardPayments: salesReport?.dailyCreditCardPayments || 0,
    gasolineSales: salesReport?.gasolineSales || [
      { gasType: "", gallonsSold: 0, priceSoldAt: 0 },
    ],
    nonGasolineSales: salesReport?.nonGasolineSales || [
      { name: "", quantitySold: 0, priceSoldAt: 0 },
    ],
  });

  useEffect(() => {
    if (
      type === "editSalesReport" ||
      (type === "deleteSalesReport" && salesReport)
    ) {
      setSalesReportData({
        id: salesReport._id,
        date: salesReport.date,
        totalRevenue: salesReport.totalRevenue,
        dailyCashPayments: salesReport.dailyCashPayments,
        dailyCreditCardPayments: salesReport.dailyCreditCardPayments,
        gasolineSales:
          salesReport.gasolineSales?.length > 0
            ? salesReport.gasolineSales
            : [{ gasType: "", gallonsSold: 0, priceSoldAt: 0 }],
        nonGasolineSales:
          salesReport.nonGasolineSales?.length > 0
            ? salesReport.nonGasolineSales
            : [{ name: "", quantitySold: 0, priceSoldAt: 0 }],
      });
    }
  }, [type, property, product, salesReport]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = () => {
    if (type === "deleteUser") {
      onConfirm(user.id);
    } else if (type === "editSalesReport") {
      onConfirm(salesReportData);
    } else if (type === "addSalesReport") {
      onConfirm(salesReportData);
    } else if (type === "deleteSalesReport") {
      onConfirm(salesReportData.id);
    }
    onClose();

    setSalesReportData({
      id: salesReport?._id || 0,
      date: salesReport?.date || getCurrentLocalDate(),
      totalRevenue: salesReport?.totalRevenue || 0,
      dailyCashPayments: salesReport?.dailyCashPayments || 0,
      dailyCreditCardPayments: salesReport?.dailyCreditCardPayments || 0,
      gasolineSales: salesReport?.gasolineSales || [
        { gasType: "", gallonsSold: 0, priceSoldAt: 0 },
      ],
      nonGasolineSales: salesReport?.nonGasolineSales || [
        { name: "", quantitySold: 0, priceSoldAt: 0 },
      ],
    });
  };

  const addGasolineSale = () => {
    setSalesReportData((prevState) => ({
      ...prevState,
      gasolineSales: [
        ...prevState.gasolineSales,
        { gasType: "", gallonsSold: 0, priceSoldAt: 0 },
      ],
    }));
  };

  const addNonGasolineSale = () => {
    setSalesReportData((prevState) => ({
      ...prevState,
      nonGasolineSales: [
        ...prevState.nonGasolineSales,
        { name: "", quantitySold: 0, priceSoldAt: 0 },
      ],
    }));
  };

  const removeGasolineSale = (index) => {
    const newGasolineSales = [...salesReportData.gasolineSales];
    newGasolineSales.splice(index, 1);
    setSalesReportData({
      ...salesReportData,
      gasolineSales: newGasolineSales,
    });
  };

  const removeNonGasolineSale = (index) => {
    const newNonGasolineSales = [...salesReportData.nonGasolineSales];
    newNonGasolineSales.splice(index, 1);
    setSalesReportData({
      ...salesReportData,
      nonGasolineSales: newNonGasolineSales,
    });
  };

  function handleMoneyChange(e, field) {
    const valueInCents = toBackendFormat(e.target.value);
    setSalesReportData((prev) => ({
      ...prev,
      [field]: valueInCents,
    }));
  }

  function handleMoneyFocus(e, value) {
    e.target.value = value.toString(); // display the value in cents on focus
  }

  function handleMoneyBlur(e, field) {
    const valueInDollars = toDisplayFormat(e.target.value);
    e.target.value = valueInDollars; // display the value in dollars on blur
  }

  function handleNestedMoneyChange(e, arrayField, index, field) {
    const valueInCents = toBackendFormat(e.target.value);
    const updatedArray = salesReportData[arrayField].map((item, idx) =>
      idx === index ? { ...item, [field]: valueInCents } : item
    );
    setSalesReportData((prev) => ({
      ...prev,
      [arrayField]: updatedArray,
    }));
  }

  function handleNestedMoneyFocus(e, arrayField, index, field) {
    e.target.value = salesReportData[arrayField][index][field].toString(); // display the value in cents on focus
  }

  function handleNestedMoneyBlur(e, arrayField, index, field) {
    const valueInDollars = toDisplayFormat(
      salesReportData[arrayField][index][field]
    );
    e.target.value = valueInDollars; // display the value in dollars on blur
  }

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${
          type === "editSalesReport" || type === "addSalesReport" ? "wide" : ""
        } `}
        onClick={handleContainerClick}
      >
        {/* EDIT AND ADD SALES REPORT  */}
        {type === "editSalesReport" || type === "addSalesReport" ? (
          <form className="wide-form">
            <h3>{`${
              type === "editSalesReport" ? "Edit" : "Add"
            } Sales Report`}</h3>

            <div className="row">
              <div className="modal-input-group">
                <label>Date</label>
                <DateSelector
                  currentDate={salesReportData.date}
                  onDateChange={(date) =>
                    setSalesReportData({ ...salesReportData, date: date })
                  }
                />
              </div>

              <div className="modal-input-group">
                <label htmlFor="totalRevenue">Total Revenue</label>
                <input
                  type="text"
                  id="totalRevenue"
                  value={toDisplayFormat(salesReportData.totalRevenue)}
                  onChange={(e) => handleMoneyChange(e, "totalRevenue")}
                  onFocus={(e) =>
                    handleMoneyFocus(e, salesReportData.totalRevenue)
                  }
                  onBlur={(e) => handleMoneyBlur(e, "totalRevenue")}
                />
              </div>
            </div>

            <div className="row">
              <div className="modal-input-group">
                <label htmlFor="cashPayments">Cash Payments</label>
                <input
                  type="text"
                  id="cashPayments"
                  value={toDisplayFormat(salesReportData.dailyCashPayments)}
                  onChange={(e) => handleMoneyChange(e, "dailyCashPayments")}
                  onFocus={(e) =>
                    handleMoneyFocus(e, salesReportData.dailyCashPayments)
                  }
                  onBlur={(e) => handleMoneyBlur(e, "dailyCashPayments")}
                />
              </div>

              <div className="modal-input-group">
                <label htmlFor="creditCardPayments">Credit Card Payments</label>
                <input
                  type="text"
                  id="creditCardPayments"
                  value={toDisplayFormat(
                    salesReportData.dailyCreditCardPayments
                  )}
                  onChange={(e) =>
                    handleMoneyChange(e, "dailyCreditCardPayments")
                  }
                  onFocus={(e) =>
                    handleMoneyFocus(e, salesReportData.dailyCreditCardPayments)
                  }
                  onBlur={(e) => handleMoneyBlur(e, "dailyCreditCardPayments")}
                />
              </div>
            </div>

            <hr />

            <h4>Gasoline Sales:</h4>
            {salesReportData?.gasolineSales?.map((gasolineSale, index) => (
              <div className="modal-input-group" key={gasolineSale._id}>
                <label htmlFor={`gasType-${gasolineSale._id}`}>Gas Type</label>
                <select
                  id={`gasType-${gasolineSale._id}`}
                  value={gasolineSale.gasType}
                  onChange={(e) => {
                    const updatedGasolineSales =
                      salesReportData.gasolineSales.map((sale) =>
                        sale._id === gasolineSale._id
                          ? { ...sale, gasType: e.target.value }
                          : sale
                      );
                    setSalesReportData({
                      ...salesReportData,
                      gasolineSales: updatedGasolineSales,
                    });
                  }}
                >
                  <option value="">Select a gas type</option>
                  {["Regular", "Midgrade", "Premium", "Diesel", "E85"].map(
                    (gasType) => (
                      <option key={gasType} value={gasType}>
                        {gasType}
                      </option>
                    )
                  )}
                </select>

                <div className="row">
                  <div className="modal-input-group">
                    <label htmlFor={`gallonsSold-${gasolineSale._id}`}>
                      Gallons Sold
                    </label>
                    <input
                      id={`gallonsSold-${gasolineSale._id}`}
                      type="number"
                      value={gasolineSale.gallonsSold}
                      onChange={(e) => {
                        const updatedGasolineSales =
                          salesReportData.gasolineSales.map((sale) =>
                            sale._id === gasolineSale._id
                              ? { ...sale, gallonsSold: e.target.value }
                              : sale
                          );
                        setSalesReportData({
                          ...salesReportData,
                          gasolineSales: updatedGasolineSales,
                        });
                      }}
                    />
                  </div>
                  <div className="modal-input-group">
                    <label htmlFor={`priceSoldAt-${gasolineSale._id}`}>
                      Price Sold At
                    </label>
                    <input
                      id={`priceSoldAt-${gasolineSale._id}`}
                      type="text"
                      value={toDisplayFormat(gasolineSale.priceSoldAt)}
                      onChange={(e) =>
                        handleNestedMoneyChange(
                          e,
                          "gasolineSales",
                          index,
                          "priceSoldAt"
                        )
                      }
                      onFocus={(e) =>
                        handleNestedMoneyFocus(
                          e,
                          "gasolineSales",
                          index,
                          "priceSoldAt"
                        )
                      }
                      onBlur={(e) =>
                        handleNestedMoneyBlur(
                          e,
                          "gasolineSales",
                          index,
                          "priceSoldAt"
                        )
                      }
                    />
                  </div>
                </div>
                {type === "addSalesReport" && (
                  <div
                    className="delete-btn"
                    onClick={() => removeGasolineSale(index)}
                  >
                    Remove
                  </div>
                )}
              </div>
            ))}
            {type === "addSalesReport" && (
              <div className="add-btn" onClick={addGasolineSale}>
                Add Gasoline Sale
              </div>
            )}

            <hr />
            <h4>Non Gasoline Sales:</h4>

            {salesReportData?.nonGasolineSales?.map(
              (nonGasolineSale, index) => (
                <div className="modal-input-group" key={nonGasolineSale._id}>
                  <label htmlFor={`name-${nonGasolineSale._id}`}>Name</label>
                  <input
                    id={`name-${nonGasolineSale._id}`}
                    type="text"
                    value={nonGasolineSale.name}
                    onChange={(e) => {
                      const updatedNonGasolineSales =
                        salesReportData.nonGasolineSales.map((sale) =>
                          sale._id === nonGasolineSale._id
                            ? { ...sale, name: e.target.value }
                            : sale
                        );
                      setSalesReportData({
                        ...salesReportData,
                        nonGasolineSales: updatedNonGasolineSales,
                      });
                    }}
                  />
                  <div className="row">
                    <div className="modal-input-group">
                      <label htmlFor={`quantitySold-${nonGasolineSale._id}`}>
                        Quantity Sold
                      </label>
                      <input
                        id={`quantitySold-${nonGasolineSale._id}`}
                        type="number"
                        value={nonGasolineSale.quantitySold}
                        onChange={(e) => {
                          const updatedNonGasolineSales =
                            salesReportData.nonGasolineSales.map((sale) =>
                              sale._id === nonGasolineSale._id
                                ? { ...sale, quantitySold: e.target.value }
                                : sale
                            );
                          setSalesReportData({
                            ...salesReportData,
                            nonGasolineSales: updatedNonGasolineSales,
                          });
                        }}
                      />
                    </div>

                    <div className="modal-input-group">
                      <label htmlFor={`quantitySold-${nonGasolineSale._id}`}>
                        Price Sold At
                      </label>
                      <input
                        id={`priceSoldAt-${nonGasolineSale._id}`}
                        type="text"
                        value={toDisplayFormat(nonGasolineSale.priceSoldAt)}
                        onChange={(e) =>
                          handleNestedMoneyChange(
                            e,
                            "nonGasolineSales",
                            index,
                            "priceSoldAt"
                          )
                        }
                        onFocus={(e) =>
                          handleNestedMoneyFocus(
                            e,
                            "nonGasolineSales",
                            index,
                            "priceSoldAt"
                          )
                        }
                        onBlur={(e) =>
                          handleNestedMoneyBlur(
                            e,
                            "nonGasolineSales",
                            index,
                            "priceSoldAt"
                          )
                        }
                      />
                    </div>
                  </div>
                  {type === "addSalesReport" && (
                    <div
                      className="delete-btn"
                      onClick={() => removeNonGasolineSale(index)}
                    >
                      Remove
                    </div>
                  )}
                </div>
              )
            )}

            {type === "addSalesReport" && (
              <div className="add-btn" onClick={addNonGasolineSale}>
                Add Non Gasoline Sale
              </div>
            )}
          </form>
        ) : null}

        {type === "deleteSalesReport" && (
          <span>Are you sure you want to delete this sales report?</span>
        )}

        {/* BUTTONS */}

        <div className="modal-button-container">
          <div className="modal-button" onClick={onClose}>
            Cancel
          </div>

          {type === "editSalesReport" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Edit Sales Report
            </div>
          )}

          {type === "addSalesReport" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Add Sales Report
            </div>
          )}

          {type === "deleteSalesReport" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Delete Sales Report
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
  salesReport: PropTypes.object,
};

export default Modal;
