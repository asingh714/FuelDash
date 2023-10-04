import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import newRequest from "../../utils/newRequest";
import Dropdown from "../Dropdown/Dropdown";
import "./PropertyDropdown.scss";
const PropertyDropdown = ({ currentDate }) => {
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("currentUser")) || ""
  );
  const currentUserId = currentUser?.user.currentUserId;
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const selectedPropertyId = e.target.value;
    navigate(`/dashboard/${selectedPropertyId}/${currentDate}`);
  };

  if (isLoading) return "Loading...";
  if (error) return "Error loading properties";

  return (
    <Dropdown
      options={data}
      onChange={handleChange}
      valueField="_id"
      labelField="name"
    />
  );
};

PropertyDropdown.propTypes = {
  currentDate: PropTypes.string,
};

export default PropertyDropdown;
