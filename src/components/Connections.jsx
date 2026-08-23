import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { APP_BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiMessageCircle,
  FiChevronRight,
  FiUsers,
  FiUser,
} from "react-icons/fi";

const DEFAULT_AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connections = useSelector((state) => state.connection);
  const user = useSelector((state) => state.user);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchConnections = async () => {
    try {
      setLoading(true);

      const res = await axios.get(APP_BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  const handleConnectionClick = (connection) => {
    navigate(`/chat/${connection._id}`, {
      state: {
        targetUser: connection,
      },
    });
  };

  const filteredConnections = useMemo(() => {
    if (!connections) return [];

    return connections.filter((connection) => {
      const fullName = `${connection.firstname || ""} ${
        connection.lastname || ""
      }`.toLowerCase();

      return fullName.includes(search.toLowerCase());
    });
  }, [connections, search]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/40 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <FiUsers size={24} />
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">
                    Connections
                  </h1>

                  <p className="text-sm text-base-content/60">
                    People you're connected with
                  </p>
                </div>
              </div>
            </div>

            {/* Connection count */}
            <div className="badge badge-primary badge-lg">
              {connections?.length || 0}
            </div>
          </div>

          {/* Search */}
          {connections?.length > 0 && (
            <div className="relative">
              <FiSearch
                className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50"
                size={20}
              />

              <input
                type="text"
                placeholder="Search connections..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  input input-bordered
                  w-full
                  pl-11
                  bg-base-100
                  focus:outline-none
                  focus:border-primary
                "
              />
            </div>
          )}
        </div>

        {/* Empty state */}
        {connections?.length === 0 && (
          <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body items-center text-center py-16">
              <div className="p-5 rounded-full bg-base-200 text-base-content/50 mb-4">
                <FiUser size={40} />
              </div>

              <h2 className="text-xl font-semibold">No connections yet</h2>

              <p className="text-base-content/60 max-w-sm">
                Once you connect with people, they'll appear here.
              </p>
            </div>
          </div>
        )}

        {/* No search results */}
        {connections?.length > 0 && filteredConnections.length === 0 && (
          <div className="card bg-base-100 shadow-sm border border-base-300">
            <div className="card-body items-center text-center py-12">
              <FiSearch size={36} className="text-base-content/40 mb-3" />

              <h2 className="font-semibold text-lg">No connections found</h2>

              <p className="text-sm text-base-content/60">
                Try searching with another name.
              </p>
            </div>
          </div>
        )}

        {/* Connections */}
        <div className="space-y-3">
          {filteredConnections.map((connection) => {
            const {
              _id,
              firstname,
              lastname,
              photoUrl,
              age,
              gender,
              About,
              skills,
            } = connection;

            const fullName = `${firstname || ""} ${lastname || ""}`.trim();

            return (
              <div
                key={_id}
                onClick={() => handleConnectionClick(connection)}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  p-4
                  bg-base-100
                  border
                  border-base-300
                  rounded-2xl
                  shadow-sm
                  cursor-pointer
                  transition-all
                  duration-200
                  hover:shadow-md
                  hover:-translate-y-[2px]
                  hover:border-primary/30
                "
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="avatar">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full ring-2 ring-base-200">
                      <img
                        src={photoUrl?.trim() || DEFAULT_AVATAR}
                        alt={fullName}
                        onError={(e) => {
                          e.currentTarget.src = DEFAULT_AVATAR;
                        }}
                      />
                    </div>
                  </div>

                  {/* Online indicator */}
                  <span
                    className="
                      absolute
                      bottom-1
                      right-1
                      w-4
                      h-4
                      rounded-full
                      bg-success
                      border-2
                      border-base-100
                    "
                  />
                </div>

                {/* User information */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-lg truncate">
                      {fullName}
                    </h2>
                  </div>

                  {/* Age / Gender */}
                  {(age || gender) && (
                    <p className="text-sm text-base-content/60 mt-1">
                      {age && `${age} years`}
                      {age && gender && " • "}
                      {gender}
                    </p>
                  )}

                  {/* About */}
                  {About && (
                    <p className="text-sm text-base-content/50 mt-1 truncate max-w-md">
                      {About}
                    </p>
                  )}

                  {/* Skills */}
                  {skills?.length > 0 && (
                    <div className="flex gap-1.5 mt-2 overflow-hidden">
                      {skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="badge badge-sm badge-ghost"
                        >
                          {skill}
                        </span>
                      ))}

                      {skills.length > 3 && (
                        <span className="badge badge-sm badge-ghost">
                          +{skills.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Chat button */}
                <button
                  className="
                    btn
                    btn-circle
                    btn-ghost
                    text-base-content/50
                    group-hover:text-primary
                    group-hover:bg-primary/10
                  "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConnectionClick(connection);
                  }}
                  aria-label={`Chat with ${fullName}`}
                >
                  <FiMessageCircle size={21} />
                </button>

                <FiChevronRight
                  className="
                    hidden
                    md:block
                    text-base-content/30
                    group-hover:text-primary
                    transition-colors
                  "
                  size={20}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Connections;
