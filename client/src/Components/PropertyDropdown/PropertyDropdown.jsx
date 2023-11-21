import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import PropTypes from "prop-types";

import newRequest from "../../utils/newRequest";
import Dropdown from "../Dropdown/Dropdown";
import "./PropertyDropdown.scss";
const PropertyDropdown = ({
  onPropertiesFetched = () => {},
  onPropertyChange,
  defaultSelected,
}) => {
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

  useEffect(() => {
    if (data) {
      onPropertiesFetched(data);
    }
  }, [data, onPropertiesFetched]);

  const handleChange = (e) => {
    onPropertyChange(e.target.value);
  };

  if (isLoading) return "Loading...";
  if (error) return "Error loading properties";

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
  onPropertiesFetched: PropTypes.func,
};

export default PropertyDropdown;
