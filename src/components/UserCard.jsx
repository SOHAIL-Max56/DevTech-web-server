import React from "react";

const UserCard = ({ user }) => {
  const { firstname, lastname, age, gender, About, skills, photourl } = user;
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
          <button className="btn btn-primary">ignored</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
