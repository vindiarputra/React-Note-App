import React, { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const ToggleTheme = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return <button onClick={toggleTheme}>{theme === "light" ? <FaMoon size={24} /> : <FaSun size={24} />}</button>;
};

export default ToggleTheme;
