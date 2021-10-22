import React from "react";

interface IProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  text: string;
  type: "button" | "submit" | "reset";
}

const Button: React.FC<IProps> = ({ text, type, handleClick, ...rest }) => {
  return (
    <button {...rest} type={type} onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
