import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useAuth } from "../../utils/AuthContext";
import newRequest from "../../utils/newRequest";
import Dropdown from "../Dropdown/Dropdown";
import Notification from "../Notification/Notification";
import "./PropertyDropdown.scss";

const PropertyDropdown = ({
  onPropertiesFetched = () => {},
  onPropertyChange,
  defaultSelected,
}) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser && parsedUser.user && parsedUser.user.userId) {
        setCurrentUser(parsedUser);
      } else {
        handleUnauthenticatedUser();
      }
    } else {
      handleUnauthenticatedUser();
    }
  }, []);

  const handleUnauthenticatedUser = () => {
    setNotification({
      type: "error",
      message: "You need to login",
    });
    logout();
    navigate("/login");
  };

  const currentUserId = currentUser?.user?.userId;

  const { data, isLoading, error } = useQuery(
    ["properties", currentUserId],
    async () => {
      if (!currentUserId) return [];
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
    <>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          duration={5000}
          onClose={() => setNotification(null)}
        />
      )}
      <Dropdown
        options={data}
        onChange={handleChange}
        valueField="_id"
        labelField="name"
        value={defaultSelected}
      />
    </>
  );
};

PropertyDropdown.propTypes = {
  onPropertyChange: PropTypes.func.isRequired,
  defaultSelected: PropTypes.string,
  onPropertiesFetched: PropTypes.func,
};

export default PropertyDropdown;
