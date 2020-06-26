import React from "react";

const Loader = ({ message }) => {
  return (
    <div className="loading">
      <p className="loader">{message}</p>
    </div>
  );
};

export default Loader;
