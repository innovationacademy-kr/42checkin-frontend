import React from 'react';

const Button = ({ className, handleClick, text }) => {
  return (
    <button className={className} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
