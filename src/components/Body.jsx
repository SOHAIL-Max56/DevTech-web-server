import { Outlet, useNavigate, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = useSelector((state) => state.user);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await axios.get(APP_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // Only redirect if not on login page
      if (location.pathname !== "/login") {
        navigate("/login", { replace: true });
      }
    } finally {
      setIsAuthChecked(true);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  // Show loading while checking auth
  if (!isAuthChecked) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-sm text-base-content/50">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Body;