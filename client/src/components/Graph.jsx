import { useEffect } from "react";
import { useStockContext } from "../store/stockContext";
import { useUserContext } from "../store/userContext";
import CandleChart from "./CandleChart";
import CircularProgress from '@mui/material/CircularProgress';

const Graph = () => {
  const { loggedIn } = useUserContext();
  const { curStock,getStockPrices,curStockFetching } = useStockContext();
  useEffect(()=>{
    if(curStock != "") getStockPrices(curStock);
  } ,[curStock]);
  return (
    <>
      {loggedIn ? (
        <div className="w-[70%] flex justify-center items-center border rounded-sm border-[#8e5772] ">
          {curStockFetching ? <CircularProgress sx={{color:'#8e5772'}} />:<CandleChart />} 
        </div>
      ) : (
        <div className="w-[100%] flex justify-center items-center border rounded-sm border-[#8e5772] ">
          {curStockFetching ? <CircularProgress sx={{color:'#8e5772'}} />:<CandleChart />} 
          {/* <CandleChart /> */}
        </div>
      )}
    </>
  );
};

export default Graph;
