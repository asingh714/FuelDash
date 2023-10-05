import { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

import "./DatePicker.scss";

const DateSelector = ({ currentDate, propertyId }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date(currentDate));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    navigate(`/dashboard/${propertyId}/${date.toISOString().split("T")[0]}`);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
    />
  );
};

DateSelector.propTypes = {
  currentDate: PropTypes.string,
  propertyId: PropTypes.string,
};

export default DateSelector;
