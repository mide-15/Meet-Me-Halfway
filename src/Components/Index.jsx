import React from "react";
import PropTypes from "prop-types";

// SVG Icon Component
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

// Input Component
const shapes = {
  round: "rounded-lg",
};

const variants = {
  fill: {
    gray_50: "bg-gray-50 text-black-900_66",
  },
};

const sizes = {
  xs: "h-[52px] px-8 text-[16px]",
};

const Input = React.forwardRef(
  (
    {
      className = "",
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant = "fill",
      size = "xs",
      color = "gray_50",
      ...restProps
    },
    ref
  ) => {
    return (
      <label
        className={`${className} flex items-center justify-center sm:px-5 cursor-text text-black-900_66 ${shape && shapes[shape]} ${variant && (variants[variant]?.[color] || variants[variant])} ${size && sizes[size]}`}
      >
        {!!label && label}
        {!!prefix && prefix}
        <input
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="bg-transparent outline-none w-full"
          {...restProps}
        />
        {!!suffix && suffix}
      </label>
    );
  }
);

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  suffix: PropTypes.node,
  shape: PropTypes.oneOf(["round"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["gray_50"]),
};

// Exporting both components
export { Input, CloseSVG };
