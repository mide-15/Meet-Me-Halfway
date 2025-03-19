import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
};
const variants = {
    fill: {
      cyan_300: "bg-cyan text-black-900",
    },
};
const sizes = {
  xs: "h-[58px] px-3.5 text-[24px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant= "fill",
  size = "xs",
  color = "cyan_300",
  ...restProps
}) => {
  return (
    <button
      className={'$className} flex flex-row items-center justify-center md:ml-0 text-center cursor pointer whitespace-nowrap text-black-900 text-[24px] bg-cyan-300 min-w-[168px] md:text-[22px] ${shape && shapes[shape]} ${size && sizes[size]} ${variant && variants[variant]?.[color]}'}
      {...restProps]
       >
        {!!leftIcon && leftIcon}
        {children}
        {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes= {
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
