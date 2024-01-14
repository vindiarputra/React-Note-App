import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordToggle = ({ id, value, onChange, placeholder }) => {
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(<FaEyeSlash size={20} />);

  const handleToggle = (event) => {
    event.preventDefault();
    if (type === "password") {
      setIcon(<FaEye size={20} />);
      setType("text");
    } else {
      setIcon(<FaEyeSlash size={20} />);
      setType("password");
    }
  };

  return (
    <div className="password-toggle">
      <input id={id} type={type} value={value} onChange={onChange} placeholder={placeholder} />
      <button className="toggle-button" onClick={handleToggle}>
        {icon}
      </button>
    </div>
  );
};

export default PasswordToggle;
