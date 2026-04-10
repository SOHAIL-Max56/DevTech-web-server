import React from "react";
import { useState } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstname || "");
  const [LastName, setLastName] = useState(user.lastname || "");
  const [Age, setAge] = useState(user.age || "");
  const [Gender, setGender] = useState(user.gender || "");
  const [About, setAbout] = useState(user.About || "");
  const [skills, setSkills] = useState(user.skills?.join(", ")) || "";
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [errorMessage, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${APP_BASE_URL}/profile/update`,
        {
          firstname: firstName,
          lastname: LastName,
          age: Age,
          gender: Gender,
          About,
          skills: skills?.split(",").map((skill) => skill.trim()),
          photoUrl,
        },
        { withCredentials: true },
      );
      console.log(res.data);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center my-6 gap-10">
        <div className="flex justify-center mx-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend mx-27 ">Edit Profile</legend>

            <label className="label">First Name</label>
            <input
              type="text"
              className="input"
              //
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label">LastName</label>
            <input
              type="text"
              className="input"
              //
              value={LastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="label">Age</label>
            <input
              type="number"
              className="input"
              //
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label className="label">Gender</label>
            <select
              className="select w-full"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input"
              //   placeholder="Password"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <label className="label">Skills (comma separated)</label>
            <input
              type="text"
              className="input"
              //
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
            <fieldset className="fieldset">
              <legend className="fieldset-legend">About </legend>
              <textarea
                className="textarea h-24"
                placeholder="Bio"
                value={About}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
              <div className="label">Optional</div>
            </fieldset>

            <p className="text-red-500">{errorMessage}</p>
            <button className="btn btn-neutral mt-4" onClick={saveProfile}>
              Save Profile
            </button>
          </fieldset>
        </div>
        <UserCard
          user={{
            firstname: firstName,
            lastname: LastName,
            age: Age,
            gender: Gender,
            About,
            skills: skills?.split(",").map((skill) => skill.trim()),
            photoUrl: photoUrl,
          }}
          showActions={false}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
