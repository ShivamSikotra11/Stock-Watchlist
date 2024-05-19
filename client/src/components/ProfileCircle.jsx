import { Tooltip, Typography } from "@mui/material";
import React from "react";
import { useUserContext } from "../store/userContext";

const ProfileCircle = ({ value = "NN" }) => {
  const userData = JSON.parse(localStorage.getItem("userData"));

  return (
    <Tooltip
      title={
        <Typography style={{ whiteSpace: "pre-line", textAlign: "center" }}>
          {`${userData.name}\n${userData.email}`}
        </Typography>
      }
    >
      <div className="profile-circle h-[2.8rem] w-[2.8rem] bg-white rounded-full flex items-center justify-center font-inter text-primary cursor-default max-[410px]:hidden ">
        {" "}
        {value}{" "}
      </div>
    </Tooltip>
  );
};

export default ProfileCircle;
