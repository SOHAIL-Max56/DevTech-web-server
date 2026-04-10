import React from "react";
import { useState } from "react";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${APP_BASE_URL}/signup`,
        {
          firstname,
          lastname,
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.error(error);
      // Get the actual error message from backend response
      setErrorMessage(error.response?.data || error.message);
    }
  };

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
        <legend className="fieldset-legend mx-27 ">
          {isSignup ? "Sign Up" : "Login"}
        </legend>
        {isSignup && (
          <>
            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              //   placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label className="label">Last Name</label>
            <input
              type="text"
              className="input"
              //   placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </>
        )}
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
        <button
          className="btn btn-neutral mt-4"
          onClick={isSignup ? handleSignup : handleLogin}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
        <p className="mt-2 text-sm ">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-500 underline cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login here" : "Sign up here"}
          </button>
        </p>
      </fieldset>
    </div>
  );
};

export default Login;
