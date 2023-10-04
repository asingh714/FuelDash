import PropTypes from "prop-types";

import "./Dropdown.scss";

const Dropdown = ({ options, onChange, value, labelField, valueField }) => {
  return (
    <div className="dropdown">
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option[valueField]} value={option[valueField]}>
            {option[labelField]}
          </option>
        ))}
      </select>
    </div>
  );
};

// fill in propTypes
Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
  value: PropTypes.string,
  labelField: PropTypes.string,
  valueField: PropTypes.string,
};

export default Dropdown;
