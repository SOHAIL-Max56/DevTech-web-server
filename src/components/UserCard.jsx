import axios from "axios";
import React from "react";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";
import {
  FaUser,
  FaBirthdayCake,
  FaVenusMars,
  FaTools,
  FaInfoCircle,
  FaTimes,
  FaHeart,
  FaMapMarkerAlt,
  FaGraduationCap
} from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();

  const handleRequest = async (status, receiverId) => {
    try {
      const res = await axios.post(
        APP_BASE_URL + `/profile/${status}/${receiverId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFromFeed(receiverId));
    } catch (error) {
      console.error("Failed to send connection request:", error);
    }
  };

  // Loading skeleton
  if (!user) {
    return (
      <div className="card bg-base-100 w-80 sm:w-96 shadow-lg border border-base-200">
        <div className="card-body items-center p-8">
          <div className="animate-pulse flex flex-col items-center w-full">
            <div className="rounded-full bg-base-300 h-28 w-28 mb-5"></div>
            <div className="h-5 bg-base-300 rounded w-2/3 mb-3"></div>
            <div className="h-4 bg-base-300 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-base-300 rounded w-full mb-2"></div>
            <div className="h-3 bg-base-300 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  const { _id, firstname, lastname, age, gender, About, skills, photoUrl } = user;

  return (
    <div className="card bg-base-100 w-80 sm:w-96 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-200/80 hover:border-primary/20 group">
      
      {/* Image Section */}
      <figure className="px-6 pt-6 pb-2">
        <div className="relative">
          <div className="avatar">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full ring-4 ring-primary/10 ring-offset-4 ring-offset-base-100 group-hover:ring-primary/30 transition-all duration-300">
              <img
                src={
                  photoUrl ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={`${firstname} ${lastname}`}
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Online indicator */}
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-success rounded-full border-4 border-base-100"></div>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body items-center text-center p-5 pt-3">
        
        {/* Name */}
        <h2 className="card-title text-xl font-bold group-hover:text-primary transition-colors">
          {firstname} {lastname}
        </h2>

        {/* Age & Gender */}
        {(age || gender) && (
          <div className="flex items-center gap-3 text-sm text-base-content/60 mt-1">
            {age && (
              <span className="flex items-center gap-1.5">
                <FaBirthdayCake className="w-3.5 h-3.5" />
                {age} years
              </span>
            )}
            {age && gender && (
              <span className="w-1 h-1 rounded-full bg-base-content/30"></span>
            )}
            {gender && (
              <span className="flex items-center gap-1.5 capitalize">
                <FaVenusMars className="w-3.5 h-3.5" />
                {gender}
              </span>
            )}
          </div>
        )}

        {/* About */}
        {About && (
          <div className="mt-3 w-full">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-base-content/40 mb-1.5">
              <FaInfoCircle className="w-3 h-3" />
              About
            </div>
            <p className="text-sm text-base-content/70 leading-relaxed line-clamp-3">
              {About}
            </p>
          </div>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div className="mt-3 w-full">
            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-base-content/40 mb-2">
              <FaTools className="w-3 h-3" />
              Skills
            </div>
            <div className="flex flex-wrap justify-center gap-1.5">
              {skills.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-ghost badge-sm hover:badge-primary hover:text-primary-content transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
              {skills.length > 5 && (
                <span className="badge badge-outline badge-sm text-base-content/40">
                  +{skills.length - 5}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="card-actions mt-5 w-full gap-3">
            <button
              className="btn btn-ghost btn-sm flex-1 gap-2 hover:bg-error/10 hover:text-error hover:border-error/30 transition-all"
              onClick={() => handleRequest("ignored", _id)}
            >
              <FaTimes className="w-4 h-4" />
              Ignore
            </button>
            <button
              className="btn btn-primary btn-sm flex-1 gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
              onClick={() => handleRequest("interested", _id)}
            >
              <FaHeart className="w-4 h-4" />
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;