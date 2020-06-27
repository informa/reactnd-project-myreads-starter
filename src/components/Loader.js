import React from "react";
import PropTypes from "prop-types";

const Loader = ({ message }) => {
  return (
    <div className="loading">
      <p className="loader">{message}</p>
    </div>
  );
};

Loader.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Loader;
