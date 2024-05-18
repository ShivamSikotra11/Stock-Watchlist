import { Box, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../store/userContext";
import ProfileCircle from "./ProfileCircle";

const Header = () => {
  const { loggedIn, getLogOut,getNameAcronym,curUser } = useUserContext();
  return (
    <Box
      sx={{
        // border: "1px solid black",
        // borderRadius: "5px",
        // padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "1.6rem",
      }}
      className="f-pop px-12 py-[10px] text-white bg-[#8e5772]"
    >
      {/* text-[#8e5772] */}
      <Box className="  font-medium text-[2.3rem] ">Stock Monitoring</Box>
      <Stack direction="row" spacing={4}>
        <NavLink to="/">Home</NavLink>
        {/* <NavLink to="/about">About</NavLink> */}
        {/* <NavLink to='/contact'>Contact</NavLink> */}
        {loggedIn ? (
          <Box className='cursor-pointer' onClick={getLogOut}>Logout</Box>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}

        {curUser && curUser.hasOwnProperty("name") ? (
          <ProfileCircle value={getNameAcronym(curUser.name)} />
        ) : (
          ""
        )}
      </Stack>
    </Box>
  );
};

export default Header;
