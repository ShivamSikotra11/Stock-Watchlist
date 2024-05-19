import { Box, Stack, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../store/userContext";
import ProfileCircle from "./ProfileCircle";

const Header = () => {
  const { loggedIn, getLogOut, getNameAcronym, curUser } = useUserContext();
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <Box
      sx={{
        // border: "1px solid black",
        // borderRadius: "5px",
        // padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      className="f-pop px-12 py-[10px] max-[435px]:px-4 text-white bg-[#8e5772]"
    >
      {/* text-[#8e5772] */}
      <Box className="  font-medium text-[2.3rem] max-[600px]:text-[1.9rem]  max-[520px]:text-[1.5rem] max-[435px]:text-[1.3rem] ">
        Stock Monitoring
      </Box>
      <Stack
        direction="row"
        className="text-[1.6rem] max-[435px]:text-[1.2rem]"
        spacing={4}
      >
        <NavLink to="/" className="max-[600px]:hidden">
          Home
        </NavLink>
        {/* <NavLink to="/about">About</NavLink> */}
        {/* <NavLink to='/contact'>Contact</NavLink> */}
        {loggedIn ? (
          <Box className="cursor-pointer" onClick={getLogOut}>
            Logout
          </Box>
        ) : (
          <Tooltip>
            <NavLink to="/login">Login</NavLink>
          </Tooltip>
        )}

        {userData && userData.hasOwnProperty("name") ? (
          <ProfileCircle value={getNameAcronym(userData.name)} />
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default Header;
