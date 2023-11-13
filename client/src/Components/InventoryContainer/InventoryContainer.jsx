import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import newRequest from "../../utils/newRequest";
import defaultImages from "../../utils/imageData";
import "../GasInventoryBoxes/GasInventoryBoxes.scss";

const InventoryContainer = ({ propertyId }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const { isLoading, error, data } = useQuery(
    ["nonGas", propertyId],
    async () => {
      if (!propertyId) return null;
      const response = await newRequest.get(`/nonGas/${propertyId}/inventory`);
      console.log(response.data.nonGasProductInventory);
      if (!response.data || error) {
        setErrorMsg("No data returned");
      }
      return response.data.nonGasProductInventory;
    }
  );

  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{errorMsg}</div>;
  }

  return (
    <div className="inventory-box-container">
      <h2>Product Inventory</h2>
      <div className="nongas-inventory-boxes">
        {data &&
          data?.map((inventory, index) => (
            <div
              className={`single-inventory-box-container  ${
                inventory.quantity < 150 ? "red" : ""
              }`}
              key={index}
            >
              <img
                className="product-image"
                src={defaultImages[inventory.name]}
                alt=""
              />
              <div className="right-container">
                <div className="inventory-name">{inventory.name}</div>
                <div className="inventory-quantity">{inventory.quantity}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

InventoryContainer.propTypes = {
  propertyId: PropTypes.string,
};

export default InventoryContainer;
