import React from "react";

const sizes = {
  textxs: "text-[16px] font-normal",
};

const Text = ({ children, className = "", as, size = "textxs", ... restProps}) => {
  const Component = as || "p";

  return (
    <Component className={'text-black-900_cc font-poppins ${className} ${sizes[size]} '} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
