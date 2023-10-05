import { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

import "./DatePicker.scss";

const DateSelector = ({ currentDate, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(currentDate));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateChange(date.toISOString().split("T")[0]);
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
  currentDate: PropTypes.string.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default DateSelector;
