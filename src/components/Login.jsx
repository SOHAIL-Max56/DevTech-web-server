import React from "react";
import { useState } from "react";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("leon@gmail.com");
  const [password, setPassword] = useState("Leon@123");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${APP_BASE_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
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
        <p className="text-red-500">{errorMessage}</p>
        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
