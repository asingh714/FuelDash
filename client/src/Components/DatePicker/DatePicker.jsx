import { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

import "react-datepicker/dist/react-datepicker.css";

import "./DatePicker.scss";

const DateSelector = ({ currentDate, onDateChange }) => {
  const [year, month, day] = currentDate
    .split("-")
    .map((str) => parseInt(str, 10));
  const localDate = new Date(year, month - 1, day);

  const [selectedDate, setSelectedDate] = useState(localDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    onDateChange(formattedDate);
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
