import React from "react";
import useForm from "../hooks/useInput";
import PropTypes from "prop-types";
import PasswordToggle from "./ToggleEye";

function UserRegistrationForm({ register }) {
  const [name, handleNameChange] = useForm("");
  const [email, handleEmailChange] = useForm("");
  const [password, handlePasswordChange] = useForm("");
  const [confirmPassword, handleConfirmPasswordChange] = useForm("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Password dan Confirm Password harus sama!");
    }
    register({
      name,
      email,
      password,
    });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="name" id="name" value={name} onChange={handleNameChange} placeholder="Name" />
        </label>
        <label>
          <input type="email" name="email" id="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        </label>
        <label>
          <PasswordToggle id="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
        </label>
        <label>
          <PasswordToggle id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password" />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

UserRegistrationForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default UserRegistrationForm;
