import React from "react";
import PropTypes from "prop-types";
import UserRegistrationForm from "../components/RegisterInput";
import { register } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

function UserRegistrationPage() {
  const navigate = useNavigate();
  async function onUserRegistration(details) {
    const { error, message } = await register(details);
    if (!error) {
      alert("Registration Successful");
      navigate("/");
    }
  }

  return (
    <div className="UserRegistrationPage">
      <h2>User Registration</h2>
      <UserRegistrationForm register={onUserRegistration} />
      <p>
        Already have an account? <Link to={"/"}>Click here to Login</Link>
      </p>
    </div>
  );
}

UserRegistrationForm.propTypes = {
  register: PropTypes.func.isRequired,
};

export default UserRegistrationPage;
