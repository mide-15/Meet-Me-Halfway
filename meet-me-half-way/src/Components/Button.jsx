import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
};

const variants = {
  fill: {
    cyan_300: "bg-cyan-300 text-black",
  },
};

const sizes = {
  xs: "h-[58px] px-6 text-[36px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xs",
  color = "cyan_300",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center sm:px-5 text-center cursor-pointer whitespace-nowrap text-black font-schibstedgrotesk text-[36px] bg-cyan-300 min-w-[168px] md:text-[34px] sm:text-[32px] 
        ${shape ? shapes[shape] : ""} 
        ${size ? sizes[size] : ""} 
        ${variant ? variants[variant]?.[color] : ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square"]),
  size: PropTypes.oneOf(["xs"]),
  variant: PropTypes.oneOf(["fill"]),
  color: PropTypes.oneOf(["cyan_300"]),
};

export { Button };
