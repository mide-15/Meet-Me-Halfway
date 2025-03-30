import React from "react";

const sizes = {
  textxs: "text-[16px] font-normal",
  texts: "text-[32px] font-normal md:text-[30px] sm:text-[28px]", 
  textmd: "text-[40px] font-normal md:text-[38px] sm:text-[36px]",
};
  
const Text = ({ children, className = "", as, size = "textxs", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-black-900_cc font-poppins ${className} ${sizes[size]} `} {.....restProps}>
      {children}
    </Component>
  );
};

export { Text };
