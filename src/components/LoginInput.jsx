import React, { useState } from "react";
import PropTypes from "prop-types";
import  PasswordToggle  from "./ToggleEye";

function LoginForm({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      email,
      password,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <PasswordToggle id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginForm;
