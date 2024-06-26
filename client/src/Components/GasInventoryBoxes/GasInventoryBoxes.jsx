import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./GasInventoryBoxes.scss";
import newRequest from "../../utils/newRequest";
import { formatNumberToTwoDecimalPlaces } from "../../utils/formatCurrency";
import OvalLoader from "../OvalLoader/OvalLoader";

const colors = {
  Midgrade: "#84cc16",
  Regular: "#3b82f6",
  Premium: "#7c3aed",
  Diesel: "#0d9488",
  E85: "#c026d3",
};

const GasInventoryBoxes = ({ propertyId }) => {
  const [errorMsg, setErrorMsg] = useState(null);

  const { isLoading, error, data } = useQuery(
    ["gasInventory", propertyId],
    async () => {
      if (!propertyId) return null;
      const response = await newRequest.get(
        `/gasoline/${propertyId}/inventory`
      );
      if (!response.data || error) {
        setErrorMsg("No data returned");
      }
      return response.data.gasProductInventory;
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
      <h2>Tank Volume</h2>
      <div className="inventory-boxes">
        {data &&
          data.map(({ gasType, quantityInGallons }, index) => (
            <div key={index} className={"single-gas-inventory-box-container"}>
              <div className="dot-text">
                <div
                  className="dot"
                  style={{ backgroundColor: colors[gasType] }}
                />
                <div>{gasType}</div>
              </div>

              {quantityInGallons && (
                <div>
                  Gallons: {formatNumberToTwoDecimalPlaces(quantityInGallons)}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

GasInventoryBoxes.propTypes = {
  propertyId: PropTypes.string,
};

export default GasInventoryBoxes;
