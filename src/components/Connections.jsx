import axios from "axios";
import React from "react";
import { APP_BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((state) => state.connection);
  const user = useSelector((state) => state.user);
  const fetchConnections = async () => {
    // Implement API call to fetch connections here
    try {
      const res = await axios.get(APP_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      console.log(res.data.data);
    } catch (error) {
      console.error("Failed to fetch connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return <div className="text-center mt-10">No connections found.</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-center">
        {user.firstname}'s Connections
      </h2>
      {connections.map((connection) => {
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
        return (
          <div key={_id}>
            <ul className="list bg-base-100 rounded-box shadow-md">
              <li className="list-row">
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
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
