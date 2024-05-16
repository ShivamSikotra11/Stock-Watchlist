import Header from "./components/Header"
import { BrowserRouter as Router,Route,Routes, useLocation } from "react-router-dom"
import Home from "./components/Home.jsx"
import Login from "./components/Login.jsx"
import Register from "./components/Register.jsx"
import { useUserContext } from "./store/userContext.jsx"
import { useEffect, useState } from "react"
import { useStockContext } from "./store/stockContext.jsx"
import CircularProgress from '@mui/material/CircularProgress';

const AppWithHeader = () => {
  const location = useLocation();
  const { getLogin, loggedIn,curUser } = useUserContext();
  const { updateStock } = useStockContext();
  const [loading, setLoading] = useState(true);

  const AbortedRoutesHeader = ["/login", "/register"];
  const shouldDisplayHeader = !AbortedRoutesHeader.includes(location.pathname);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
       
      
      Promise.all([getLogin(userData), updateStock(userData)])
        .then(() => setLoading(false))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
 
    } 
    else {
      setLoading(false);
    }

  }, []);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      updateStock(userData);
    } 
  }, [loggedIn]);

  if (loading) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center ">
          
          <CircularProgress sx={{color:'#8e5772'}} />
        
      </div>
    );
  }

  return (
    <>
      {shouldDisplayHeader && <Header />}
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/login" element={<Login/>} />
        <Route  path="/register" element={<Register/>} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWithHeader />
    </Router>
  );
};

export default App