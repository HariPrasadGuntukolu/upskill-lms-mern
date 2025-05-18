import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-page">
      <div className="glow-loader">
        <span className="rotating-circle"></span>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
