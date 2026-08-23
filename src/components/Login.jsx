import React, { useState } from "react";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaArrowRight,
  FaUserPlus,
  FaSignInAlt,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const res = await axios.post(
        `${APP_BASE_URL}/signup`,
        { firstname, lastname, email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.error || error.response?.data || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(
        `${APP_BASE_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(response.data));
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.response?.data || error.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-200/50 to-base-300/30 px-4 py-8">
      <div className="w-full max-w-md">
        
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4">
            {isSignup ? (
              <FaUserPlus className="w-8 h-8" />
            ) : (
              <FaSignInAlt className="w-8 h-8" />
            )}
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="text-base-content/50 mt-2 text-sm">
            {isSignup 
              ? "Join our community of developers" 
              : "Sign in to continue to DevTech"}
          </p>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-xl border border-base-200/50">
          <div className="card-body p-6 sm:p-8">
            
            {/* Toggle Tabs */}
            <div className="tabs tabs-boxed bg-base-200/50 p-1 rounded-xl mb-6">
              <button
                className={`tab flex-1 rounded-lg gap-2 transition-all ${!isSignup ? 'tab-active bg-primary text-primary-content shadow-sm' : 'hover:bg-base-200'}`}
                onClick={() => !isSignup || toggleMode()}
              >
                <FaSignInAlt className="w-4 h-4" />
                Login
              </button>
              <button
                className={`tab flex-1 rounded-lg gap-2 transition-all ${isSignup ? 'tab-active bg-primary text-primary-content shadow-sm' : 'hover:bg-base-200'}`}
                onClick={() => isSignup || toggleMode()}
              >
                <FaUserPlus className="w-4 h-4" />
                Sign Up
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              
              {/* First Name - Signup Only */}
              {isSignup && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <FaUser className="w-4 h-4 text-primary/70" />
                      First Name
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered 
                    focus:input-primary transition-all w-full"
                    placeholder="John"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
              )}

              {/* Last Name - Signup Only */}
              {isSignup && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MdPersonOutline className="w-4 h-4 text-primary/70" />
                      Last Name
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered focus:input-primary
                     transition-all w-full"
                    placeholder="Doe"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              )}

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaEnvelope className="w-4 h-4 text-primary/70" />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  className="input input-bordered focus:input-primary 
                  transition-all w-full"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium flex items-center gap-2">
                    <FaLock className="w-4 h-4 text-primary/70" />
                    Password
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered focus:input-primary 
                    transition-all w-full pr-12"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash className="w-4 h-4 text-base-content/50" />
                    ) : (
                      <FaEye className="w-4 h-4 text-base-content/50" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-error alert-sm py-2">
                  <FaExclamationCircle className="w-4 h-4 shrink-0" />
                  <span className="text-sm">{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                className={`btn btn-primary w-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all ${isLoading ? 'loading' : ''}`}
                onClick={isSignup ? handleSignup : handleLogin}
                disabled={isLoading}
              >
                {isSignup ? (
                  <>
                    <FaUserPlus className="w-4 h-4" />
                    Create Account
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="w-4 h-4" />
                    Sign In
                  </>
                )}
                <FaArrowRight className={`w-4 h-4 transition-transform ${isLoading ? 'opacity-0' : 'group-hover:translate-x-1'}`} />
              </button>

            </div>

            {/* Divider */}
            <div className="divider text-base-content/30 text-sm">or</div>

            {/* Toggle Link */}
            <p className="text-center text-sm text-base-content/60">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                className="btn btn-link btn-sm px-1 text-primary font-semibold hover:text-primary-focus"
                onClick={toggleMode}
              >
                {isSignup ? "Sign in here" : "Create one"}
              </button>
            </p>

          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-base-content/40 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;