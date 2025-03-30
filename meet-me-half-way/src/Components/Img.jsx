import React from "react";

const IMG = ({ className, src = "defaultNoData.png", alt = "testImg", ...restProps }) => {
  return <img className={className} src={src} alt={alt} {...restProps} loading={"lazy"} />;
};

export { Img };
