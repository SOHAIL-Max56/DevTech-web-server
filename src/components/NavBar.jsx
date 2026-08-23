import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import {
  FaHome,
  FaUser,
  FaUserFriends,
  FaEnvelope,
  FaSignOutAlt,
  FaCode,
  FaBell
} from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.post(
        APP_BASE_URL + "/logout",
        {},
        { withCredentials: true }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Feed", icon: <FaHome className="w-4 h-4" /> },
    { path: "/connections", label: "Connections", icon: <FaUserFriends className="w-4 h-4" /> },
    { path: "/requests", label: "Requests", icon: <FaEnvelope className="w-4 h-4" /> },
  ];

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-md border-b border-base-200 sticky top-0 z-50 shadow-sm">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          {user && (
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52 border border-base-200">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className={`gap-3 ${isActive(link.path) ? 'active bg-primary/10 text-primary' : ''}`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl gap-2 hover:bg-transparent">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <FaCode className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold tracking-tight">DevTech</span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      {user && (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`gap-2 rounded-lg transition-all ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'hover:bg-base-200'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Right Side */}
      <div className="navbar-end gap-2">
        {user ? (
          <div className="flex items-center gap-3">
            {/* Welcome Text - Hidden on mobile */}
            <span className="hidden sm:flex items-center gap-2 text-sm font-medium text-base-content/70">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
              {user?.firstname}
            </span>

            {/* Notification Bell */}
            {/* <button className="btn btn-ghost btn-circle btn-sm relative">
              <FaBell className="w-4 h-4" />
              <span className="badge badge-error badge-xs 
              absolute -top-1 -right-1">3</span>
            </button> */}

            {/* Profile Dropdown */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition-colors"
              >
                <div className="w-9 h-9 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-base-100">
                  <img
                    alt={user?.firstname || "Profile"}
                    src={user?.photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-box w-56 border border-base-200/80"
              >
                <li className="menu-title px-4 py-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-base-content/40">
                    My Account
                  </span>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className={`gap-3 py-2.5 ${isActive('/profile') ? 'active bg-primary/10 text-primary' : ''}`}
                  >
                    <FaUser className="w-4 h-4" />
                    Profile
                    <span className="badge badge-sm badge-ghost ml-auto">Edit</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/connections" 
                    className={`gap-3 py-2.5 lg:hidden ${isActive('/connections') ? 'active bg-primary/10 text-primary' : ''}`}
                  >
                    <FaUserFriends className="w-4 h-4" />
                    Connections
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/requests" 
                    className={`gap-3 py-2.5 lg:hidden ${isActive('/requests') ? 'active bg-primary/10 text-primary' : ''}`}
                  >
                    <FaEnvelope className="w-4 h-4" />
                    Requests
                  </Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button 
                    onClick={handleLogout} 
                    className="gap-3 py-2.5 text-error hover:bg-error/10"
                  >
                    <FaSignOutAlt className="w-4 h-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary btn-sm gap-2">
            <MdPersonOutline className="w-4 h-4" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;