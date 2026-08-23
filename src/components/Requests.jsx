import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheck,
  FaTimes,
  FaUser,
  FaBriefcase,
  FaInbox,
  FaClock,
  FaRegClock,
  FaUserPlus,
  FaEllipsisH
} from "react-icons/fa";
import { IoMdTime } from "react-icons/io";

import { APP_BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const DEFAULT_PROFILE =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const user = useSelector((state) => state.user);
  const [loadingId, setLoadingId] = useState(null);

  const RequestDecision = async (status, requestId) => {
    try {
      setLoadingId(requestId);
      await axios.post(
        `${APP_BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(requestId));
    } catch (error) {
      console.error("Failed to make decision on request:", error);
    } finally {
      setLoadingId(null);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${APP_BASE_URL}/user/request/received`,
        { withCredentials: true }
      );
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-sm text-base-content/50 animate-pulse">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (request.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-base-200 to-base-300 shadow-inner">
            <FaInbox className="text-4xl text-base-content/30" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No requests yet</h2>
          <p className="text-base-content/50 leading-relaxed">
            When someone wants to connect with you, their request will appear here.
          </p>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-base-content/40">
            <FaRegClock className="animate-pulse" />
            <span>Check back later</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-base-200/30 to-base-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <FaUserPlus className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {user?.firstname}'s Requests
                </h1>
                <p className="mt-0.5 text-sm text-base-content/50">
                  Pending connection requests
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              <span className="badge badge-primary badge-lg font-semibold">
                {request.length}
              </span>
            </div>
          </div>
        </div>

        {/* Request Cards */}
        <div className="space-y-4">
          {request.map((req, index) => {
            const {
              _id,
              firstname,
              lastname,
              photoUrl,
              age,
              gender,
              About,
              skills,
            } = req.senderId;

            const isLoading = loadingId === req._id;

            return (
              <div
                key={req._id}
                className="group card bg-base-100 border border-base-200/80 shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 ease-out hover:-translate-y-0.5"
                style={{ animationDelay: `${index * 75}ms` }}
              >
                <div className="card-body p-4 sm:p-5">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                    {/* Profile Image */}
                    <div className="flex justify-center sm:block shrink-0">
                      <div className="avatar online">
                        <div className="h-20 w-20 rounded-full ring-2 ring-primary/10 ring-offset-2 ring-offset-base-100 group-hover:ring-primary/30 transition-all duration-300 sm:h-24 sm:w-24">
                          <img
                            src={photoUrl?.trim() || DEFAULT_PROFILE}
                            alt={`${firstname} ${lastname}`}
                            className="object-cover"
                            onError={(e) => {
                              e.currentTarget.src = DEFAULT_PROFILE;
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="min-w-0 flex-1 text-center sm:text-left">

                      {/* Name Row */}
                      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
                        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
                          <h2 className="text-lg font-bold group-hover:text-primary transition-colors">
                            {firstname} {lastname}
                          </h2>
                          <span className="badge badge-ghost badge-sm gap-1">
                            <FaUserPlus className="w-3 h-3" />
                            Wants to connect
                          </span>
                        </div>
                      </div>

                      {/* Meta Info */}
                      {(age || gender) && (
                        <div className="mt-2 flex items-center justify-center gap-3 text-sm text-base-content/50 sm:justify-start">
                          <span className="flex items-center gap-1.5">
                            <FaUser className="w-3.5 h-3.5" />
                            {age && `${age} yrs`}
                          </span>
                          {age && gender && (
                            <span className="w-1 h-1 rounded-full bg-base-content/30" />
                          )}
                          <span className="capitalize">{gender}</span>
                        </div>
                      )}

                      {/* About */}
                      {About && (
                        <p className="mt-3 text-sm leading-relaxed text-base-content/60 line-clamp-2">
                          {About}
                        </p>
                      )}

                      {/* Skills */}
                      {skills?.length > 0 && (
                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-base-content/40 sm:justify-start">
                            <FaBriefcase className="w-3 h-3" />
                            Skills
                          </div>
                          <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
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
                    </div>

                    {/* Actions */}
                    <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:min-w-[140px] mt-2 sm:mt-0">

                      <button
                        className="btn btn-success btn-sm w-full gap-2 shadow-success/20 hover:shadow-lg hover:shadow-success/30 transition-all"
                        disabled={isLoading}
                        onClick={() => RequestDecision("accepted", req._id)}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <FaCheck className="w-3.5 h-3.5" />
                        )}
                        Accept
                      </button>

                      <button
                        className="btn btn-ghost btn-sm w-full gap-2 text-error hover:bg-error/10 hover:border-error/20 transition-all"
                        disabled={isLoading}
                        onClick={() => RequestDecision("rejected", req._id)}
                      >
                        {isLoading ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <FaTimes className="w-3.5 h-3.5" />
                        )}
                        Decline
                      </button>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Requests;