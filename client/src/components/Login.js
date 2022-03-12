import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login",
        {
          email: email,
          password: password,
        },
        {
          //this will force the sending of the credentials / cookies so they con be
          // XMLHTTP request from a different domain cannot set cookie values for
          // unless withCredntials is set to true before making the request
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err.response.data);
        setErrorMessage(err.response.data.message);
      });
  };
  return (
    <div>
      <h1>Login</h1>
      <p>{errorMessage ? errorMessage : ""}</p>
      <form onSubmit={login}>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="center">
          <button> Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
