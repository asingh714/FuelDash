import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import PropTypes from "prop-types";

import newRequest from "../../utils/newRequest";
import Dropdown from "../Dropdown/Dropdown";
import "./PropertyDropdown.scss";
const PropertyDropdown = ({ onPropertyChange, defaultSelected }) => {
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("currentUser")) || ""
  );
  const currentUserId = currentUser?.user.currentUserId;

  const { data, isLoading, error } = useQuery(
    ["properties", currentUserId],
    async () => {
      const response = await newRequest.get(
        `/properties?userId=${currentUserId}`
      );
      if (!response.data) {
        throw new Error("No data returned");
      }
      return response.data.properties;
    }
  );

  if (isLoading) return "Loading...";
  if (error) return "Error loading properties";

  const handleChange = (e) => {
    const selectedPropertyId = e.target.value;
    if (onPropertyChange) {
      onPropertyChange(selectedPropertyId); // Calling the provided callback
    }
  };

  return (
    <Dropdown
      options={data}
      onChange={handleChange}
      valueField="_id"
      labelField="name"
      value={defaultSelected}
    />
  );
};

PropertyDropdown.propTypes = {
  onPropertyChange: PropTypes.func,
  defaultSelected: PropTypes.string,
};

export default PropertyDropdown;
