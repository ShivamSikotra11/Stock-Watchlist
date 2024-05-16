import { Box, Button, InputAdornment, TextField } from "@mui/material";
import React, { useRef } from "react";
import EmailIcon from '@mui/icons-material/Email';
import AbcIcon from '@mui/icons-material/Abc';
import LockIcon from "@mui/icons-material/Lock";
import { NavLink,useNavigate } from "react-router-dom";
import { useUserContext } from "../store/userContext";


const Register = () => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { getRegister } = useUserContext();
  const redirect = useNavigate();
 
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const userData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    // console.log(userData);
    getRegister(redirect,userData);
  }

  return (
    <div className=" bg-[#d2bdc6] w-full h-[100vh] flex justify-center items-center">
      <Box className="w-[50%] h-[30rem] border border-[#1c1d21] rounded-[0.6rem]  bg-white flex ">

        {/* <Box className="flex justify-center border-r-2 border-[#1c1d21] items-center w-[30%] ">
          <h1 className="text-5xl font-bold f-pt">Register</h1>
        </Box> */}
        <Box className="flex justify-center rounded-tl-[0.4rem] rounded-bl-[0.4rem]  bg-[#8e5772] text-white items-center w-[31%] ">
          <h1 className="text-5xl font-bold f-pt">Register</h1>
        </Box>

        <Box className="flex justify-center items-center w-[70%] ">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit} >
            <TextField 
              required 
              inputRef={nameRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <AbcIcon
                      style={{ color: "#8e5772", fontSize: "2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              label="Name"
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
              inputRef={emailRef}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {" "}
                    <EmailIcon
                      style={{ color: "#8e5772", fontSize: "2rem" }}
                    />
                  </InputAdornment>
                ),
              }}
              label="EmailID"
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
            Already have an account? &nbsp;
              <NavLink to="/login" className="font-medium" >Login</NavLink>
            </Box>
            <Box className="flex justify-center mt-4">
              <Button
                variant="contained"
                type="submit"
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
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
