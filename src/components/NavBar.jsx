import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        APP_BASE_URL + "/logout",
        {},
        { withCredentials: true },
      );
      dispatch(removeUser());
      Navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          DevTech
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 ">
          <p className="font-bold">Welcome, {user?.firstname}</p>
          {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mx-7"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl}
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
