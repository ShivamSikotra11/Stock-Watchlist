import React, { createContext, useContext, useReducer } from 'react';
import axios from 'axios'; 
import reducer from "../reducers/stockReducer";
import { useUserContext } from './userContext';
import stocksJSON from "../stockNames.json";
import ibmData from "../ibmJSON.json";
const initialItems = {
  userStocks: [],
  curStock: "IBM",
  curStockPrices:ibmData,
  curStockFetching:false,
  allStockData:[],
};

const StockContext = createContext();

const stockProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialItems);
  const { url, curUser } = useUserContext();
 

  const data = stocksJSON
    .map((item) => item.name+`(${item.symbol})`)
    .slice(0, 100)
    .filter((e) => e != null);
  state.allStockData = data.filter((item) => !state.userStocks.some((stock) => stock.symbol === getSymbol(item)));

  const selectStock = (symbol) => {
    dispatch({type:"SET_CURRENT_STOCK",payload:symbol})
  }

  const getStockPrices = async () => {
    try {
     
      dispatch({type:"ALTER_CURR_STOCK_FETCHING"}) 
      const apiUrl=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${state.curStock}&outputsize=full&apikey=OKUH5F946GIMJ7PX`
      // const apiUrl=`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${state.curStock}&interval=5min&apikey=OKUH5F946GIMJ7PX`
      const response = await axios.get(apiUrl);
      const data = response.data;
    
      dispatch({type:"SET_CURRENT_STOCK_PRICES",payload:data}) 
      dispatch({type:"ALTER_CURR_STOCK_FETCHING"}) 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


  function getSymbol(s) {
    const pattern = /\((.*?)\)/;
    const match = s.match(pattern);
    return match ? match[1] : null;
  }

  const updateStock = async (userData) => {
    try {
      const res = await axios.post(`${url}get_stocks/`,{email:userData.email});
      // console.log(res.data);
      dispatch({type:"ADD_ALL_STOCKS",payload: res.data });
    }
    catch (e) {
      console.log(e);
    }
  }

  const AddStock = async (stock) => {
    try {
      const res = await axios.post(`${url}add_stock/`,{...stock,email:curUser.email});
      dispatch({type:"ADD_STOCK",payload: stock });
    }
    catch (e) {
      console.log(e);
    }
  };
  
  const DeleteStock = async (symbol) => {
    try { 
      const res = await axios.post(`${url}delete_stock/`, {symbol,email:curUser.email});
      dispatch({type:"REMOVE_STOCK",payload: symbol});
    }
    catch (e) {
      console.log(e);
    }
  };


  return (
    <StockContext.Provider value={{...state,getSymbol,AddStock,DeleteStock,updateStock,selectStock,getStockPrices }}>
      {children}
    </StockContext.Provider>
  );
}
const useStockContext = () => {
  return useContext(StockContext);
}
export { useStockContext };
export default stockProvider;