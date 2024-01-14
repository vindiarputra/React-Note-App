// pages LoginPages

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { login } from "../utils/api";
import LoginForm from "../components/LoginInput";


function LoginPage({ loginSuccess }) {

  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });
    if (!error) {
      loginSuccess(data);
    }
  }

  return (
    <div className="LoginPage">
      <h2>User LogIn</h2>
      <LoginForm login={onLogin} />
      <p>
        Don't have an account yet?<Link to={"/register"}>Register here</Link>
      </p>
    </div>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
