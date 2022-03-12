import React, { useState, UseEffect } from "react";
import axios from "axios";

const register = () => {};

const Register = (props) => {
  const [confirmReg, setConfirmReg] = useState("");
  const [errors, setErrors] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPaswword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const register = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/register", user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setUser({
          username: "",
          email: "",
          password: "",
          confirmPaswword: "",
        });
        setConfirmReg("Thank you for Registering, you can now lgo in");
        setErrors({}); //remember to reset errors state if it was successful
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {confirmReg ? <h4 style={{ color: "green" }}>{confirmReg}</h4> : null}
      <form onSubmit={register}>
        <div>
          <label>Username</label>
          {errors.username ? (
            <span className="error-text">{errors.username.message}</span>
          ) : null}
          <input
            type="text"
            name="username"
            //   id="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          {errors.email ? (
            <span className="error-text">{errors.email.message}</span>
          ) : null}
          <input
            type="text"
            name="email"
            //   id="username"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          {errors.password ? (
            <span className="error-text">{errors.Password.message}</span>
          ) : null}
          <input
            type="password"
            name="password"
            //   id="username"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm Password</label>
          {errors.confirmPassword ? (
            <span className="error-text">{errors.confirmPassword.message}</span>
          ) : null}
          <input
            type="password"
            name="confirmPassword"
            //   id="username"
            value={user.confirmpassword}
            onChange={handleChange}
          />
        </div>
        <div className="center">
          <button type="submit">Register Me</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
