import React, { createContext, useContext, useReducer } from "react";
import axios from "axios";
import reducer from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const initialItems = {
  loggedIn: false,
  curUser: {},
  toastActive: false,
  toastData: "",
  url: "http://localhost:8000/",
};

const UserContext = createContext();

const userProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialItems);
  // const redirect = useNavigate();
  

  
  const getRegister = async (redirect, userData) => {
    try {
      const resp = await axios.post(`${state.url}register/`, userData);
      // dispatch({type:'SET_TOAST',payload:{msg:'User Registered Successfully',type:'success'}});
      // console.log(resp);
      getLogin(userData, true);
      redirect("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginSubmit = async (redirect, userData) => {
    try {
      const resp = await axios.post(`${state.url}login/`, userData);
      dispatch({ type: "SET_USER", payload: resp.data });
      localStorage.setItem("userData", JSON.stringify({...userData,name:resp.data.name}));
      redirect("/");
    } catch (error) {
      console.log(error);
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
  function getNameAcronym(sentence="") {
    const words = sentence.split(" ");
    const newWord = words.reduce((acc, word) => acc + word.charAt(0), "");
    return newWord.substring(0, 2).toUpperCase();
  }
  return (
    <UserContext.Provider
      value={{ ...state, getRegister, handleLoginSubmit, getLogin, getLogOut,getNameAcronym }}
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
