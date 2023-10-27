import React from "react";
import { LoadingProps } from "../interface/addToDoProps.interface";

// loading component
const Loading: React.FC<LoadingProps> = ({ text }) => {
  return (
    <div className="loading">
      <div className="loading-spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
};

export default Loading;
