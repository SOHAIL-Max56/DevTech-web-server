import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("sohail@gmail.com");
  const [password, setPassword] = useState("Sohail@123");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="flex justify-center my-6">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend mx-27 ">Login</legend>

        <label className="label">Email ID:</label>
        <input
          type="email"
          className="input"
          //   placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          //   placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
