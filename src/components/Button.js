import React from 'react';

const Button = ({ className, handleClick, text ,disabled}) => {
  return (
    <button className={className} onClick={handleClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
