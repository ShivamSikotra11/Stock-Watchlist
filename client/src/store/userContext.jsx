import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const initialItems = {
  loggedIn: false,
  curUser: {},
  toastActive: false,
  toastData: "",
  isCredentialsFetching:false,
  // url: "https://stock-watchlist-brown.vercel.app/",
  url: "http://localhost:8000/",
  isCredentialError:[false,""],
};

const UserContext = createContext();

const userProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialItems);
  // const redirect = useNavigate();
  

  const AlterCredentialError = (flag, message) => {
    dispatch({type:"ALTER_CREDENTIALS_ERROR",payload:{flag,message}})
  };
  const getRegister = async (redirect, userData) => {
    try {
      dispatch({ type: 'ALTER_CREDENTIALS_FETCHING' });
      await axios.post(`${state.url}register/`, userData);
      getLogin(userData, true);
      dispatch({ type: 'ALTER_CREDENTIALS_FETCHING' });
      redirect("/");
    } catch (error) {
      AlterCredentialError(true,error.response.data.message);
      dispatch({ type: 'ALTER_CREDENTIALS_FETCHING' });
      console.log(error);
    }
  };
 
  

  const handleLoginSubmit = async (redirect, userData) => {
 
    try {
      dispatch({ type: 'ALTER_CREDENTIALS_FETCHING' });
      const resp = await axios.post(`${state.url}login/`, userData);
      dispatch({ type: "SET_USER", payload: { name:resp.data,email:userData.email } });
      localStorage.setItem("userData", JSON.stringify({name:resp.data.name,email:userData.email}));
      dispatch({ type: 'ALTER_CREDENTIALS_FETCHING' });
      redirect("/");
    } catch (error) {
      AlterCredentialError(true,error.response.data.message);
      dispatch({ type: 'ALTER_CREDENTIALS_FETCHING' });
      // console.log(error.response.data.message); 
    }
  };
  const getLogin = (userData, flag = false) => {
    dispatch({ type: "SET_USER", payload: userData });
    if (flag) localStorage.setItem("userData", JSON.stringify(userData));
  };
  const getLogOut = () => {
    dispatch({ type: "UNSET_USER" });
    localStorage.removeItem("userData");
  };
  const getNameAcronym = (sentence) => {
    // Check if the sentence is a string
    if (typeof sentence !== "string") {
      return ""; // Return empty string if not a string
    }
  
    // Split the sentence into words
    const words = sentence.split(" ");
    
    // Get the first letter of each word and join them
    const acronym = words.map(word => word[0]).join("");
  
    return acronym.toUpperCase(); // Convert to uppercase and return
  };
  
  // function AlterLoginFetch() {
  //   dispatch({ type: 'ALTER_LOGIN_FETCHING' });
  // }
  return (
    <UserContext.Provider
      value={{ ...state, getRegister, handleLoginSubmit, getLogin, getLogOut,getNameAcronym,AlterCredentialError }}
    >
      {children}
    </UserContext.Provider>
  );
};
const useUserContext = () => {
  return useContext(UserContext);
};
export { useUserContext };
export default userProvider;
