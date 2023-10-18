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

const Modal = ({
  type,
  property,
  onClose,
  onConfirm,
  user,
  product,
  salesReport,
}) => {
  const [name, setName] = useState(property?.name || "");
  const [address, setAddress] = useState(property?.address || "");
  const [nonGasProduct, setNonGasProduct] = useState({
    name: product?.name || "",
    category: product?.category || "",
    quantity: product?.quantity || "",
    costPerItem: product?.costPerItem || "",
    receivedDate: product?.receivedDate || getCurrentLocalDate(),
  });

  const [gasProduct, setGasProduct] = useState({
    gasType: product?.gasType || "",
    quantityInGallons: product?.quantityInGallons || "",
    costPerGallon: product?.costPerGallon || "",
    receivedDate: product?.receivedDate || getCurrentLocalDate(),
  });

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
    if (type === "editGasProduct" || (type === "deleteGasProduct" && product)) {
      setGasProduct({
        id: product._id,
        gasType: product.gasType,
        quantityInGallons: product.quantityInGallons,
        costPerGallon: product.costPerGallon,
        receivedDate: product.receivedDate,
      });
    }

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
    } else if (type === "addGasProduct" || type === "editGasProduct") {
      onConfirm(gasProduct);
    } else if (type === "deleteGasProduct") {
      onConfirm(gasProduct);
    } else if (type === "editSalesReport") {
      onConfirm(salesReportData);
    } else if (type === "addSalesReport") {
      onConfirm(salesReportData);
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
    setGasProduct({
      gasType: product?.gasType || "",
      quantityInGallons: product?.quantityInGallons || "",
      costPerGallon: product?.costPerGallon || "",
      receivedDate: product?.receivedDate || getCurrentLocalDate(),
    });

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

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-container ${
          type === "editSalesReport" || type === "addSalesReport" ? "wide" : ""
        } `}
        onClick={handleContainerClick}
      >
        {/* EDIT SALES REPORT  */}
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
                  value={salesReportData.totalRevenue}
                  onChange={(e) =>
                    setSalesReportData({
                      ...salesReportData,
                      totalRevenue: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="row">
              <div className="modal-input-group">
                <label htmlFor="cashPayments">Cash Payments</label>
                <input
                  type="text"
                  id="cashPayments"
                  value={salesReportData.dailyCashPayments}
                  onChange={(e) =>
                    setSalesReportData({
                      ...salesReportData,
                      dailyCashPayments: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-input-group">
                <label htmlFor="creditCardPayments">Credit Card Payments</label>
                <input
                  type="text"
                  id="creditCardPayments"
                  value={salesReportData.dailyCreditCardPayments}
                  onChange={(e) =>
                    setSalesReportData({
                      ...salesReportData,
                      dailyCreditCardPayments: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <hr />

            <h4>Gasoline Sales:</h4>
            {salesReportData?.gasolineSales?.map((gasolineSale) => (
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
                      type="number"
                      value={gasolineSale.priceSoldAt}
                      onChange={(e) => {
                        const updatedGasolineSales =
                          salesReportData.gasolineSales.map((sale) =>
                            sale._id === gasolineSale._id
                              ? { ...sale, priceSoldAt: e.target.value }
                              : sale
                          );
                        setSalesReportData({
                          ...salesReportData,
                          gasolineSales: updatedGasolineSales,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="add-btn" onClick={addGasolineSale}>
              Add Gasoline Sale
            </div>

            <hr />
            <h4>Non Gasoline Sales:</h4>

            {salesReportData?.nonGasolineSales?.map((nonGasolineSale) => (
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
                      type="number"
                      value={nonGasolineSale.priceSoldAt}
                      onChange={(e) => {
                        const updatedNonGasolineSales =
                          salesReportData.nonGasolineSales.map((sale) =>
                            sale._id === nonGasolineSale._id
                              ? { ...sale, priceSoldAt: e.target.value }
                              : sale
                          );
                        setSalesReportData({
                          ...salesReportData,
                          nonGasolineSales: updatedNonGasolineSales,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div className="add-btn" onClick={addNonGasolineSale}>
              Add Non Gasoline Sale
            </div>
          </form>
        ) : null}

        {type === "editNonGasProduct" || type === "addNonGasProduct" ? (
          <form>
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

        {type === "editGasProduct" || type === "addGasProduct" ? (
          <form>
            <div className="modal-input-group">
              <label htmlFor="gasType">Gas Type</label>
              <select
                id="gasType"
                value={gasProduct.gasType}
                onChange={(e) =>
                  setGasProduct({ ...gasProduct, gasType: e.target.value })
                }
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
            </div>

            <div className="modal-input-group">
              <label htmlFor="gasQuantity">Quantity</label>
              <input
                type="number"
                id="gasQuantity"
                value={gasProduct.quantityInGallons}
                onChange={(e) =>
                  setGasProduct({
                    ...gasProduct,
                    quantityInGallons: e.target.value,
                  })
                }
              />
            </div>

            <div className="modal-input-group">
              <label htmlFor="gasCost">Cost Per Gallon</label>
              <input
                type="text"
                id="gasCost"
                value={gasProduct.costPerGallon}
                onChange={(e) =>
                  setGasProduct({
                    ...gasProduct,
                    costPerGallon: e.target.value,
                  })
                }
              />
            </div>

            <div className="modal-input-group">
              <label>Received Date</label>
              <DateSelector
                currentDate={gasProduct.receivedDate}
                onDateChange={(date) =>
                  setGasProduct({ ...gasProduct, receivedDate: date })
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

        {/* MODAL MESSAGES */}
        {type === "logout" && <span>Are you sure you want to log out?</span>}

        {type === "deleteProperty" && (
          <span>Are you sure you want to delete this property?</span>
        )}
        {type === "deleteUser" && (
          <span>Are you sure you want to delete your account?</span>
        )}
        {type === "deleteNonGasProduct" && (
          <span>Are you sure you want to delete this product?</span>
        )}

        {type === "deleteGasProduct" && (
          <span>Are you sure you want to delete this product?</span>
        )}

        {/* BUTTONS */}

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

          {type === "deleteGasProduct" && (
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
          {type === "addGasProduct" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Add Product
            </div>
          )}
          {type === "editGasProduct" && (
            <div className="modal-button confirm-button" onClick={handleSubmit}>
              Edit Product
            </div>
          )}

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
