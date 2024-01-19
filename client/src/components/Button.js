import React, { memo } from "react";

const Button = ({ text, type, className, onClick }) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default memo(Button);
