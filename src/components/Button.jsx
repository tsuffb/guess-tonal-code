import React from "react";
import "./../assets/styles/Button.css";

const Button = ({ text, onClick, style }) => {
  return (
    <button className="custom-button" onClick={onClick} style={style}>
      {text}
    </button>
  );
};

export default Button;
