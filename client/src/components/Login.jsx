import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useRef } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../store/userContext";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const redirect = useNavigate();

  const {
    handleLoginSubmit,
    isCredentialsFetching,
    isCredentialError,
    AlterCredentialError,
  } = useUserContext();

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
      <Snackbar
        open={isCredentialError[0]} // Access the first element of the array
        onClose={() => AlterCredentialError(false, "")}
        TransitionComponent={Slide}
        message={isCredentialError[1]}
        key={Slide.name}
        autoHideDuration={2000}
      />

      <Box className="w-[50%] max-[1050px]:w-[70%] max-[730px]:w-[90%]  border border-[#1c1d21] rounded-[0.6rem]  bg-white flex max-[583px]:flex-col-reverse  max-[583px]:items-center ">
        <Box className="flex justify-center items-center w-[70%] py-[6rem] max-[583px]:py-[2rem]">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                    <LockIcon style={{ color: "#8e5772", fontSize: "2rem" }} />
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
            <Box className="text-end">
              Don't have an account? &nbsp;
              <NavLink to="/register" className="font-medium">
                Register
              </NavLink>
            </Box>
            <Box className="flex justify-center mt-4">
              <Button
                variant="contained"
                type="submit"
                disabled={isCredentialsFetching}
                style={{
                  color: "#404144",
                  fontSize: "1.5rem",
                  fontFamily: "Playfair Display",
                  backgroundColor: "#d2bdc6",
                  textTransform: "capitalize", // Capitalize the text
                  paddingLeft: "2rem", // Add padding to the left
                  paddingRight: "2rem", // Add padding to the right
                  borderRadius: "0.9rem",
                }}
                className="px-4"
              >
                {!isCredentialsFetching ? (
                  "Login"
                ) : (
                  <CircularProgress sx={{ color: "#8e5772" }} />
                )}
              </Button>
            </Box>
          </form>
        </Box>

        <Box className="flex justify-center rounded-tr-[0.4rem] rounded-br-[0.4rem] max-[583px]:rounded-tl-[0.4rem] max-[583px]:rounded-br-none  bg-[#8e5772] text-white items-center w-[31%] max-[583px]:w-full">
          <h1 className="text-5xl font-bold f-pt max-[583px]:py-[1.5rem] max-[536px]:text-4xl max-[536px]:py-[1rem]">
            Login
          </h1>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
