import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-lg",
};

const variants = {
    fill: {
      gray_50: "bg-gray text-black-900_66",
    },
};

const sizes = {
  xs: "h-[52px] px-3 text-[16px]",
};

const Input = React.fowardRef(
  (
    {
      children,
      name = "",
      placeholder = "",
      type = "text",
      label = "",
      prefix,
      suffix,
      onChange,
      shape,
      variant= "fill",
      size = "xs",
      color = "gray_50",
      ...restProps
    },
    ref,
  ) => {
    return (
      <label
        className={'$className} flex items-center justify-center cursor-text text-black-900_66 text-[16px] bg-gray-50 rounded-lg ${shape && shapes[shape]} ${variant && variants[variant]?.[color]}'} ${size && sizes[size]}
       >
        {!!label && label}
        {!!prefix && prefix}
        {input ref={ref} type={type} name={name} placeholder={placeholder} onChange={onChange} {...restProps} />
        {!!suffix && suffix}
      </label>
    );
  };
);
Input.propTypes= {
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

export { Input };
