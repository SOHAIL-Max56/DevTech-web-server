import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { APP_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { 
  FaUser, 
  FaSave, 
  FaCamera, 
  FaBirthdayCake, 
  FaVenusMars, 
  FaTools, 
  FaInfoCircle,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";
import { MdEmail, MdPerson } from "react-icons/md";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstname || "");
  const [LastName, setLastName] = useState(user.lastname || "");
  const [Age, setAge] = useState(user.age || "");
  const [Gender, setGender] = useState(user.gender || "");
  const [About, setAbout] = useState(user.About || "");
  const [skills, setSkills] = useState(user.skills?.join(", ") || "");
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
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200/50 to-base-300/30 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <FaUser className="w-6 h-6" />
            </div>
            Edit Profile
          </h1>
          <p className="text-base-content/50 mt-2">Update your information and see changes in real-time</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          
          {/* Form Section */}
          <div className="w-full lg:w-[480px]">
            <div className="card bg-base-100 shadow-lg border border-base-200/50">
              <div className="card-body p-6">
                
                {/* Profile Photo Preview */}
                <div className="flex flex-col items-center mb-6">
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring-4 ring-primary/20 ring-offset-4 ring-offset-base-100">
                      <img
                        src={photoUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt="Profile"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-base-content/50 mt-3 flex items-center gap-1.5">
                    <FaCamera className="w-3.5 h-3.5" />
                    Update photo URL below
                  </p>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  
                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                          <MdPerson className="w-4 h-4 text-primary/70" />
                          First Name
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered focus:input-primary transition-colors"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                          <MdPerson className="w-4 h-4 text-primary/70" />
                          Last Name
                        </span>
                      </label>
                      <input
                        type="text"
                        className="input input-bordered focus:input-primary transition-colors"
                        placeholder="Doe"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Age & Gender Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                          <FaBirthdayCake className="w-4 h-4 text-primary/70" />
                          Age
                        </span>
                      </label>
                      <input
                        type="number"
                        className="input input-bordered focus:input-primary transition-colors"
                        placeholder="25"
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium flex items-center gap-2">
                          <FaVenusMars className="w-4 h-4 text-primary/70" />
                          Gender
                        </span>
                      </label>
                      <select
                        className="select select-bordered focus:select-primary transition-colors w-full"
                        value={Gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo URL */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaCamera className="w-4 h-4 text-primary/70" />
                        Photo URL
                      </span>
                    </label>
                    <input
                      type="url"
                      className="input input-bordered focus:input-primary transition-colors"
                      placeholder="https://example.com/photo.jpg"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                  </div>

                  {/* Skills */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaTools className="w-4 h-4 text-primary/70" />
                        Skills
                      </span>
                      <span className="label-text-alt text-base-content/40">Comma separated</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered focus:input-primary transition-colors"
                      placeholder="React, Node.js, MongoDB..."
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                    />
                    {skills && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {skills.split(",").filter(s => s.trim()).map((skill, i) => (
                          <span key={i} className="badge badge-primary badge-sm">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* About */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <FaInfoCircle className="w-4 h-4 text-primary/70" />
                        About
                      </span>
                      <span className="label-text-alt text-base-content/40">Optional</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered focus:textarea-primary transition-colors h-28 resize-none"
                      placeholder="Tell us about yourself..."
                      value={About}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                    <label className="label">
                      <span className="label-text-alt text-base-content/40">
                        {About.length}/250 characters
                      </span>
                    </label>
                  </div>

                  {/* Error Message */}
                  {errorMessage && (
                    <div className="alert alert-error alert-sm">
                      <FaExclamationTriangle className="w-4 h-4" />
                      <span className="text-sm">{errorMessage}</span>
                    </div>
                  )}

                  {/* Save Button */}
                  <button 
                    className="btn btn-primary w-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all"
                    onClick={saveProfile}
                  >
                    <FaSave className="w-4 h-4" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="w-full lg:w-auto lg:sticky lg:top-8">
            <div className="card bg-base-100 shadow-lg border border-base-200/50">
              <div className="card-body p-4">
                <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-4 text-center">
                  Live Preview
                </h3>
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
            </div>
          </div>

        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success shadow-lg gap-2">
            <FaCheckCircle className="w-5 h-5" />
            <span className="font-medium">Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;