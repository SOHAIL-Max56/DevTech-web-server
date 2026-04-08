import axios from "axios";
import React from "react";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";
import { useState } from "react";
const UserCard = ({ user }) => {
  // Safety check - return null or loading if no user
  const dispatch = useDispatch();
  const handleRequest = async (status, receiverId) => {
    // Implement API call to send connection request here
    try {
      const res = await axios.post(
        APP_BASE_URL + `/profile/${status}/${receiverId}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeFromFeed(receiverId));
    } catch (error) {
      console.error("Failed to send connection request:", error);
    }
  };
  if (!user) {
    return (
      <div className="card bg-base-300 w-96 shadow-sm p-10">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-slate-300 h-32 w-32 mb-4"></div>
          <div className="h-4 bg-slate-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-300 rounded w-1/2"></div>
        </div>
      </div>
    );
  }
  const { _id, firstname, lastname, age, gender, About, skills, photourl } =
    user;
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={
            photourl ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {firstname} {lastname}
        </h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        {About && skills && (
          <p>
            About: {About} <br />
            {skills?.join(", ")}
          </p>
        )}
        <div className="card-actions">
          <button
            className="btn btn-primary"
            onClick={() => handleRequest("ignored", _id)}
          >
            ignored
          </button>
          <button
            className="btn btn-secondary"

            onClick={() => handleRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
