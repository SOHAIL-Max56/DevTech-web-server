import React, { useEffect } from "react";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFromFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feed);
  const getFeed = async () => {
    try {
      const res = await axios.get(`${APP_BASE_URL}/feed`, {
        withCredentials: true,
      });

      dispatch(addFromFeed(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  console.log(feed);

    // Loading state
  if (!feed) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Empty feed state
  if (!feed?.data || feed.data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600">No users found</h2>
          <p className="text-gray-500 mt-2">Check back later for new connections!</p>
        </div>
      </div>
    );
  }
  
  return (
    feed && (
      <div className="flex gap-4 m-4 justify-center">
        <UserCard user={feed?.data[0]} />
      </div>
    )
  );
};

export default Feed;
