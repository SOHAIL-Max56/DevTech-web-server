import React from "react";
import { APP_BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { removeRequest } from "../utils/requestSlice";
// This component will display incoming connection 
// requests and allow the user to accept or reject them
const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);
  const user = useSelector((state) => state.user);

  const RequestDecision = async (status, _id) => {
    try {
      // Implement API call to accept/reject request here
      const res = await axios.post(
        APP_BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error("Failed to make decision on request:", error);
    }
  };

  const fetchRequests = async () => {
    // Implement API call to fetch requests here
    try {
      const res = await axios.get(APP_BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) return;
  if (request.length === 0) {
    return <div className="text-center mt-10">No Requests found.</div>;
  }
  return (
    <div>
      <h2 className="text-xl font-semibold text-center my-5">
        {user.firstname}'s Requests
      </h2>
      {request.map((req) => {
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
        return (
          <div key={_id}>
            <ul className="list hover:bg-base-300 justify-between rounded-lg shadow-md">
              <li className="list-row ">
                <div>
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={
                      photoUrl?.trim() ||
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    }
                    alt={`${firstname} ${lastname}`}
                    onError={(e) => {
                      e.target.src =
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
                    }}
                  />
                </div>
                <div>
                  <div>
                    {firstname} {lastname}
                  </div>
                  {age && gender && <p>{age + ", " + gender}</p>}
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {About && <span>{About}</span>}
                    {About && skills?.length > 0 && (
                      <span>
                        {" "}
                        <br></br>{" "}
                      </span>
                    )}
                    {skills?.length > 0 && (
                      <span>Skills: {skills.join(", ")}</span>
                    )}
                  </div>
                </div>
                <div className="">
                  <div
                    className="badge badge-primary mx-2 hover:bg-green-500 cursor-pointer"
                    onClick={() => RequestDecision("accepted", req._id)}
                  >
                    Accept
                  </div>
                  <div
                    className="badge badge-secondary mx-2 hover:bg-red-500 cursor-pointer"
                    onClick={() => RequestDecision("rejected", req._id)}
                  >
                    Reject
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
