import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import DateSelector from "../../DatePicker/DatePicker";

const getCurrentLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const EditSalesReport = ({ salesReport, product }) => {
  const [salesReportData, setSalesReportData] = useState({
    date: salesReport?.date || "",
    totalRevenue: salesReport?.totalRevenue || "",
    dailyCashPayments: salesReport?.dailyCashPayments || "",
    dailyCreditCardPayments: salesReport?.dailyCreditCardPayments || "",
    gasolineSales: salesReport?.gasolineSales || [],
    nonGasolineSales: salesReport?.nonGasolineSales || [],
  });

  const [gasProduct, setGasProduct] = useState({
    gasType: product?.gasType || "",
    quantityInGallons: product?.quantityInGallons || "",
    costPerGallon: product?.costPerGallon || "",
    receivedDate: product?.receivedDate || getCurrentLocalDate(),
  });

  useEffect(() => {
    if (salesReport) {
      setSalesReportData({
        id: salesReport._id,
        date: salesReport.date,
        totalRevenue: salesReport.totalRevenue,
        dailyCashPayments: salesReport.dailyCashPayments,
        dailyCreditCardPayments: salesReport.dailyCreditCardPayments,
        gasolineSales: salesReport.gasolineSales,
        nonGasolineSales: salesReport.nonGasolineSales,
      });
    }
  }, [salesReport]);

  return (
    <form className="wide-form">
      {/* Date */}
      <div className="modal-input-group">
        <label>Date</label>
        <DateSelector
          currentDate={salesReportData.date}
          onDateChange={(date) =>
            setSalesReportData({ ...salesReportData, date: date })
          }
        />
      </div>
      {/* Total Revenue */}
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
      {/* Cash Payments */}
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
      {/* Credit Card Payments */}
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
      {/* Gasoline Sales */}
      <h4>Gasoline Sales:</h4>
      {salesReportData?.gasolineSales?.map((gasolineSale) => (
        <div className="modal-input-group" key={gasolineSale._id}>
          <label htmlFor={`gasType-${gasolineSale._id}`}>Gas Type</label>
          <select
            id={`gasType-${gasolineSale._id}`}
            value={gasolineSale.gasType}
            onChange={(e) =>
              // You might need to modify this logic based on your state management strategy.
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

          <label htmlFor={`gallonsSold-${gasolineSale._id}`}>
            Gallons Sold
          </label>
          <input
            id={`gallonsSold-${gasolineSale._id}`}
            type="number"
            value={gasolineSale.gallonsSold}
            readOnly
          />

          <label htmlFor={`priceSoldAt-${gasolineSale._id}`}>
            Price Sold At
          </label>
          <input
            id={`priceSoldAt-${gasolineSale._id}`}
            type="number"
            value={gasolineSale.priceSoldAt}
            readOnly
          />
        </div>
      ))}
    </form>
  );
};

EditSalesReport.propTypes = {
  salesReport: PropTypes.object.isRequired,
};

export default EditSalesReport;
