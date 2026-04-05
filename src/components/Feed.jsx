import React, { useEffect } from "react";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
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

      dispatch(addFeed(res.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  console.log(feed);
  
  return (
    feed && (
      <div className="flex gap-4 m-4 justify-center">
        <UserCard user={feed?.data[0]} />
      </div>
    )
  );
};

export default Feed;
