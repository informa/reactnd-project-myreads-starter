import React from "react";
import shelves from "../data/shelves";

const BookShelfChanger = ({ shelf, handleChange }) => {
  const renderOptions = shelves.map(({ shelf, title }) => (
    <option value={shelf}>{title}</option>
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

export default BookShelfChanger;
