import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import PropTypes from "prop-types";

const CustomDatePicker = ({ selectedDate, onChange }) => {
  const [startDate, setStartDate] = useState(selectedDate);

  const handleChange = (date) => {
    setStartDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    onChange(formattedDate);
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      className="mt-1 block w-full bg-primary rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

CustomDatePicker.propTypes = {
  selectedDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default CustomDatePicker;
