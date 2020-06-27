import React from "react";
import PropTypes from "prop-types";
import shelves from "../data/shelves";

const BookShelfChanger = ({ shelf, handleChange }) => {
  const renderOptions = shelves.map(({ shelf, title }) => (
    <option key={shelf} value={shelf}>
      {title}
    </option>
  ));

  return (
    <select
      value={shelf}
      onChange={(event) => handleChange(event.target.value)}
    >
      <option value="move" disabled>
        Move to...
      </option>
      {renderOptions}
      <option value="none">None</option>
    </select>
  );
};

BookShelfChanger.propTypes = {
  shelf: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BookShelfChanger;
