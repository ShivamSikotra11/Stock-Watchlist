import React from "react";

const ProfileCircle = ({ value = "NN" }) => {
  return (
    <div className="profile-circle h-[2.8rem] w-[2.8rem] bg-white rounded-full flex items-center justify-center font-inter text-primary cursor-default">
      {" "}
      {value}{" "}
    </div>
  );
};

export default ProfileCircle;
