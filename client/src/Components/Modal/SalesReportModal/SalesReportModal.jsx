import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "../Modal.scss";
import {
  toDisplayFormat,
  toBackendFormat,
} from "../../../utils/formatCurrency";
import getCurrentLocalDate from "../../../utils/getCurrentLocalDate";
import DateSelector from "../../DatePicker/DatePicker";

const SalesReportModal = ({
  type,
  property,
  onClose,
  onConfirm,
  product,
  salesReport,
}) => {
  const initializeState = (type, salesReport) => {
    if (type === "editSalesReport" || type === "deleteSalesReport") {
      return {
        id: salesReport._id,
        date: salesReport.date,
        totalRevenue: salesReport.totalRevenue,
        dailyCashPayments: salesReport.dailyCashPayments,
        dailyCreditCardPayments: salesReport.dailyCreditCardPayments,
        gasolineSales: salesReport.gasolineSales,
        nonGasolineSales: salesReport.nonGasolineSales,
      };
    } else {
      return {
        id: 0,
        date: getCurrentLocalDate(),
        totalRevenue: 0,
        dailyCashPayments: 0,
        dailyCreditCardPayments: 0,
        gasolineSales: [{ gasType: "", gallonsSold: 0, priceSoldAt: 0 }],
        nonGasolineSales: [{ name: "", quantitySold: 0, priceSoldAt: 0 }],
      };
    }
  };

  const [formData, setFormData] = useState(initializeState(type, salesReport));
  const [errors, setErrors] = useState({});

  console.log("formData", formData);
  useEffect(() => {
    setFormData(initializeState(type, salesReport));
  }, [type, salesReport]);

  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.date) {
      errors.date = "Date is required";
    }

    if (!formData.totalRevenue) {
      errors.totalRevenue = "Total revenue is required";
    }

    if (!formData.dailyCashPayments) {
      errors.dailyCashPayments = "Daily cash payments is required";
    }

    if (!formData.dailyCreditCardPayments) {
      errors.dailyCreditCardPayments = "Daily credit card payments is required";
    }

    if (formData.gasolineSales.length === 0) {
      errors.gasolineSales = "At least one gasoline sale is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleClose = () => {
    setFormData(initializeState(type, product));
    onClose();
  };

  const handleSubmit = () => {
    if (type !== "deleteSalesReport" && !validateForm()) {
      return;
    }

    if (type === "editSalesReport") {
      onConfirm(formData);
    } else if (type === "addSalesReport") {
      onConfirm(formData);
    } else if (type === "deleteSalesReport") {
      onConfirm(formData.id);
    }
    handleClose();
  };

  const addGasolineSale = () => {
    setFormData((prevState) => ({
      ...prevState,
      gasolineSales: [
        ...prevState.gasolineSales,
        { gasType: "", gallonsSold: 0, priceSoldAt: 0 },
      ],
    }));
  };

  const addNonGasolineSale = () => {
    setFormData((prevState) => ({
      ...prevState,
      nonGasolineSales: [
        ...prevState.nonGasolineSales,
        { name: "", quantitySold: 0, priceSoldAt: 0 },
      ],
    }));
  };

  const removeGasolineSale = (index) => {
    const newGasolineSales = [...formData.gasolineSales];
    newGasolineSales.splice(index, 1);
    setFormData({
      ...formData,
      gasolineSales: newGasolineSales,
    });
  };

  const removeNonGasolineSale = (index) => {
    const newNonGasolineSales = [...formData.nonGasolineSales];
    newNonGasolineSales.splice(index, 1);
    setFormData({
      ...formData,
      nonGasolineSales: newNonGasolineSales,
    });
  };

  function handleMoneyChange(e, field) {
    const value = e.target.value;
    const numericValue = parseFloat(value.replace(/\D/g, "")); // Strip non-numeric characters
    const valueInCents = isNaN(numericValue) ? 0 : numericValue;

    setFormData((prev) => ({
      ...prev,
      [field]: valueInCents,
    }));
  }

  function handleMoneyFocus(e, value) {
    e.target.value = value.toString();
  }

  function handleMoneyBlur(e, field) {
    e.target.value = toDisplayFormat(formData[field]);
  }

  function handleNestedMoneyChange(e, arrayField, index, field) {
    const value = e.target.value;
    const numericValue = parseFloat(value.replace(/\D/g, "")); // Strip non-numeric characters
    const valueInCents = isNaN(numericValue) ? 0 : numericValue;

    const updatedArray = formData[arrayField].map((item, idx) =>
      idx === index ? { ...item, [field]: valueInCents } : item
    );
    setFormData((prev) => ({
      ...prev,
      [arrayField]: updatedArray,
    }));
  }

  function handleNestedMoneyFocus(e, arrayField, index, field) {
    e.target.value = formData[arrayField][index][field].toString();
  }

  function handleNestedMoneyBlur(e, arrayField, index, field) {
    e.target.value = toDisplayFormat(formData[arrayField][index][field]);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${
          type === "editSalesReport" || type === "addSalesReport" ? "wide" : ""
        } `}
        onClick={handleContainerClick}
      >
        {type === "editSalesReport" || type === "addSalesReport" ? (
          <form className="wide-form">
            <h3>{`${
              type === "editSalesReport" ? "Edit" : "Add"
            } Sales Report`}</h3>

            <div className="row">
              <div className="modal-input-group">
                <label>Date</label>
                <DateSelector
                  currentDate={formData.date}
                  onDateChange={(date) =>
                    setFormData({ ...formData, date: date })
                  }
                />
              </div>

              <div className="modal-input-group">
                <label htmlFor="totalRevenue">Total Revenue</label>

                <input
                  type="text"
                  id="totalRevenue"
                  value={toDisplayFormat(formData.totalRevenue)}
                  onChange={(e) => handleMoneyChange(e, "totalRevenue")}
                  onFocus={(e) => handleMoneyFocus(e, formData.totalRevenue)}
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
                  value={toDisplayFormat(formData.dailyCashPayments)}
                  onChange={(e) => handleMoneyChange(e, "dailyCashPayments")}
                  onFocus={(e) =>
                    handleMoneyFocus(e, formData.dailyCashPayments)
                  }
                  onBlur={(e) => handleMoneyBlur(e, "dailyCashPayments")}
                />
              </div>

              <div className="modal-input-group">
                <label htmlFor="creditCardPayments">Credit Card Payments</label>

                <input
                  type="text"
                  id="creditCardPayments"
                  value={toDisplayFormat(formData.dailyCreditCardPayments)}
                  onChange={(e) =>
                    handleMoneyChange(e, "dailyCreditCardPayments")
                  }
                  onFocus={(e) =>
                    handleMoneyFocus(e, formData.dailyCreditCardPayments)
                  }
                  onBlur={(e) => handleMoneyBlur(e, "dailyCreditCardPayments")}
                />
              </div>
            </div>

            <hr />

            <h4>Gasoline Sales:</h4>

            {formData?.gasolineSales?.map((gasolineSale, index) => (
              <div className="modal-input-group" key={gasolineSale._id}>
                <label htmlFor={`gasType-${gasolineSale._id}`}>Gas Type</label>
                <select
                  id={`gasType-${gasolineSale._id}`}
                  value={gasolineSale.gasType}
                  onChange={(e) => {
                    const updatedGasolineSales = formData.gasolineSales.map(
                      (sale) =>
                        sale._id === gasolineSale._id
                          ? { ...sale, gasType: e.target.value }
                          : sale
                    );
                    setFormData({
                      ...formData,
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
                        const updatedGasolineSales = formData.gasolineSales.map(
                          (sale) =>
                            sale._id === gasolineSale._id
                              ? { ...sale, gallonsSold: e.target.value }
                              : sale
                        );
                        setFormData({
                          ...formData,
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
                {type === "addSalesReport" && (
                  <div className="add-btn" onClick={addGasolineSale}>
                    Add Gasoline Sale
                  </div>
                )}
              </div>
            ))}

            <hr />
            <h4>Non Gasoline Sales:</h4>

            {formData?.nonGasolineSales?.map((nonGasolineSale, index) => (
              <div className="modal-input-group" key={nonGasolineSale._id}>
                <label htmlFor={`name-${nonGasolineSale._id}`}>Name</label>
                <input
                  id={`name-${nonGasolineSale._id}`}
                  type="text"
                  value={nonGasolineSale.name}
                  onChange={(e) => {
                    const updatedNonGasolineSales =
                      formData.nonGasolineSales.map((sale) =>
                        sale._id === nonGasolineSale._id
                          ? { ...sale, name: e.target.value }
                          : sale
                      );
                    setFormData({
                      ...formData,
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
                          formData.nonGasolineSales.map((sale) =>
                            sale._id === nonGasolineSale._id
                              ? { ...sale, quantitySold: e.target.value }
                              : sale
                          );
                        setFormData({
                          ...formData,
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
            ))}

            {type === "addSalesReport" && (
              <div className="add-btn" onClick={addNonGasolineSale}>
                Add Non Gasoline Sale
              </div>
            )}

            <hr />
            <div className="modal-button-container">
              <div className="modal-button" onClick={handleClose}>
                Cancel
              </div>
              <div
                className="modal-button confirm-button"
                onClick={handleSubmit}
              >
                Confirm
              </div>
            </div>
          </form>
        ) : (
          <div className="modal-form">
            <h3>{`Delete Sales Report`}</h3>
            <p>Are you sure you want to delete this sales report?</p>
            <div className="modal-button">
              <div className="cancel-btn" onClick={handleClose}>
                Cancel
              </div>
              <div
                className="modal-button confirm-button"
                onClick={handleSubmit}
              >
                Confirm
              </div>
            </div>
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="modal-errors">
            <ul>
              {Object.values(errors).map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

SalesReportModal.propTypes = {
  type: PropTypes.string.isRequired,
  salesReport: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  property: PropTypes.object,
  product: PropTypes.object,
};

export default SalesReportModal;
