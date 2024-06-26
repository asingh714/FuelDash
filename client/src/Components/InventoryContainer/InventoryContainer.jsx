import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import newRequest from "../../utils/newRequest";
import defaultImages from "../../utils/imageData";
import { formatNumberToWholeNumbers } from "../../utils/formatCurrency";

import "../GasInventoryBoxes/GasInventoryBoxes.scss";
import OvalLoader from "../OvalLoader/OvalLoader";

const InventoryContainer = ({ propertyId }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const { isLoading, error, data } = useQuery(
    ["nonGasInventory", propertyId],
    async () => {
      if (!propertyId) {
        throw new Error("Property ID is required");
      }
      const response = await newRequest.get(`/nonGas/${propertyId}/inventory`);
      console.log(response.data.nonGasProductInventory);
      if (!response.data) {
        setErrorMsg("No data returned");
        throw new Error("No data returned from the API");
      }
      return response.data.nonGasProductInventory;
    }
  );

  if (isLoading) {
    return <OvalLoader />;
  }

  if (error) {
    return <div className="error-message">{errorMsg}</div>;
  }

  return (
    <div className="inventory-box-container">
      <h2>Product Inventory</h2>
      <div className="nongas-inventory-boxes">
        {data &&
          data.map((inventory, index) => (
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
                <div className="inventory-quantity">
                  {formatNumberToWholeNumbers(inventory.quantity)}
                </div>
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
