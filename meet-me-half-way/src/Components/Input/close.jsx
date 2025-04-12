import React from "react";

const CloseSVG = ({ fillColor = "#000000", className = "", ...props }) => {
  return (
    <svg
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      height={props?.height || 20}
      width={props?.width || 20}
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M4.707 3.293 3.293 4.707 10.586 12 3.293 19.293 4.707 20.707 12 13.414 19.293 20.707 20.707 19.293 13.414 12 20.707 4.707 19.293 3.293 12 10.586z" />
    </svg>
  );
};

export { CloseSVG };
