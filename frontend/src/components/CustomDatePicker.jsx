import { React, useState } from "react";
import DatePicker from "react-datepicker";
import { subDays } from "date-fns";
import { format } from "date-fns";
import PropTypes from "prop-types";

const CustomDatePicker = ({
  selectedDate = null,
  onChange,
  minDate,
  maxDate,
}) => {
  const [startDate, setStartDate] = useState(selectedDate);

  if (!minDate) {
    minDate = new Date();
  }

  const handleChange = (date) => {
    setStartDate(date);
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      onChange(formattedDate);
    } else {
      onChange(null);
    }
  };

  return (
    <DatePicker
      isClearable
      minDate={subDays(minDate, 0)}
      maxDate={subDays(maxDate, 0)}
      selected={startDate}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      className="mt-1 block w-full bg-base-100  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
    />
  );
};

CustomDatePicker.propTypes = {
  selectedDate: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
};

export default CustomDatePicker;
