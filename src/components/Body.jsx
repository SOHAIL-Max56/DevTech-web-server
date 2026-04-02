import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Body = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigator = useNavigate();
  const fetchUser = async () => {
    try {
      const response = await axios.get(APP_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      if (error.status === 401) {
        navigator("/login");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
