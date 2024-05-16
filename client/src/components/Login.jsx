import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useRef } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../store/userContext";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const redirect = useNavigate();

  const {handleLoginSubmit} = useUserContext();  

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: usernameRef.current.value,
      password: passwordRef.current.value,
      name: "",
    };
    handleLoginSubmit(redirect, userData);
  };
  return (
    <div className=" bg-[#d2bdc6] w-full h-[100vh] flex justify-center items-center">
      <Box className="w-[50%] h-[30rem] border border-[#1c1d21] rounded-[0.6rem]  bg-white flex ">
        <Box className="flex justify-center items-center w-[70%] ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <TextField
              required
              inputRef={usernameRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <PersonIcon
                      style={{ color: "#8e5772", fontSize: "2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              label="Username"
              variant="standard"
              color="secondary"
              sx={{
                "& .MuiInput-root": {
                  color: "#404144",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                },

                // Label
                "& .MuiInputLabel-standard": {
                  color: "#8e5772",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  "&.Mui-focused": {
                    color: "#8e5772",
                  },
                },
              }}
            />
            <TextField
            required
              inputRef={passwordRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <LockIcon
                      style={{ color: "#8e5772", fontSize: "2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              label="Password"
              type="password"
              variant="standard"
              color="secondary"
              sx={{
                "& .MuiInput-root": {
                  color: "#404144",
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  fontSize: "1.5rem",
                },

                // Label
                "& .MuiInputLabel-standard": {
                  color: "#8e5772",
                  fontWeight: "400",
                  fontSize: "1.5rem",
                  "&.Mui-focused": {
                    color: "#8e5772",
                  },
                },
              }}
            />
            <Box className='text-end' >
            Don't have an account? &nbsp;
              <NavLink to="/register" className="font-medium" >Register</NavLink>
            </Box>
            <Box className="flex justify-center mt-4">
            <Button
                variant="contained"
                type='submit'
                style={{
                  color: "#404144",
                  fontSize: "1.5rem",
                  fontFamily: "Playfair Display",
                  backgroundColor: "#d2bdc6",
                  textTransform: "capitalize", // Capitalize the text
                  paddingLeft: "2rem", // Add padding to the left
                  paddingRight: "2rem", // Add padding to the right
                  borderRadius:"0.9rem",
                }}
                className="px-4"
              >
                Login
              </Button>

            </Box>
          </form>
        </Box>
        <Box className="flex justify-center rounded-tr-[0.4rem] rounded-br-[0.4rem]  bg-[#8e5772] text-white items-center w-[31%] ">
          <h1 className="text-5xl font-bold f-pt">Login</h1>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
