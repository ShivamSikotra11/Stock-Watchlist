import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserProvider from "./store/userContext.jsx";
import StockProvider from "./store/stockContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <UserProvider>
    <StockProvider>
      <App />
    </StockProvider>
    </UserProvider>
      
    
  // </React.StrictMode>,
)
