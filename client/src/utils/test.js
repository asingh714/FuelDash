import { useState, useEffect } from "react";

import DateSelector from "../DatePicker/DatePicker";

function toDisplayFormat(value) {
  return `$${(parseInt(value, 10) / 100).toFixed(2)}`;
}

function toBackendFormat(value) {
  return parseInt(value, 10);
}

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
  const [gasProduct, setGasProduct] = useState({
    gasType: product?.gasType || "",
    quantityInGallons: product?.quantityInGallons || 0,
    costPerGallon: product?.costPerGallon || 0,
    receivedDate: product?.receivedDate || getCurrentLocalDate(),
  });

  const [nonGasProduct, setNonGasProduct] = useState({
    name: product?.name || "",
    category: product?.category || "",
    quantity: product?.quantity || 0,
    costPerItem: product?.costPerItem || 0,
    receivedDate: product?.receivedDate || getCurrentLocalDate(),
  });

  useEffect(() => {
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
  }, [type, product]);

  function handleGasCostChange(e) {
    const value = e.target.value.replace(/\D/g, "");
    setGasProduct({
      ...gasProduct,
      costPerGallon: value,
    });
  }

  function handleFocus(e) {
    e.target.value = gasProduct.costPerGallon;
  }

  function handleBlur(e) {
    e.target.value = toDisplayFormat(gasProduct.costPerGallon);
  }

  const handleSubmit = () => {
    if (type === "addGasProduct" || type === "editGasProduct") {
      onConfirm({
        ...gasProduct,
        costPerGallon: toBackendFormat(gasProduct.costPerGallon),
      });
    }
  };

  return (
    <div>
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
            <label htmlFor="gasQuantity">Quantity (Gallons)</label>
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
              value={toDisplayFormat(gasProduct.costPerGallon)}
              onChange={handleGasCostChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
    </div>
  );
};
