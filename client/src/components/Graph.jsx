import { useEffect } from "react";
import { useStockContext } from "../store/stockContext";
import { useUserContext } from "../store/userContext";
import CandleChart from "./CandleChart";
import CircularProgress from "@mui/material/CircularProgress";


const Graph = () => {
  const { loggedIn } = useUserContext();
  const { curStock, getStockPrices, curStockFetching, userStocks } =
    useStockContext();
  const dynamicWidth = loggedIn ? "w-[70%] " : "w-[100%]";
  const dynamicWidthAdjust = loggedIn ? "max-[910px]:w-[90%]" : "";
  const dynamicHeight = "";
  useEffect(() => {
    if (curStock != "") getStockPrices(curStock);
  }, [curStock]);

  var msg = `${
    userStocks.length === 0 && loggedIn ? "Add" : "Select"
  } a stock to view the graph`;
  return (
    <>
      {loggedIn ? (
        <div
          className={`  h-[37rem] w-[70%] max-[910px]:w-full    flex justify-center items-center border rounded-sm border-[#8e5772] `}
        >
          {curStock !== "" ? (
            curStockFetching ? (
              <CircularProgress sx={{ color: "#8e5772" }} />
            ) : (
              <CandleChart />
            )
          ) : (
            <h1 className="text-4xl max-[550px]:text-3xl text-center text-[#8e5772]">
              {msg}{" "}
            </h1>
          )}
        </div>
      ) : (
        <div
          className={`  h-[37rem] w-[100%]  flex justify-center items-center border rounded-sm border-[#8e5772] `}
        >
          {curStock !== "" ? (
            curStockFetching ? (
              <CircularProgress sx={{ color: "#8e5772" }} />
            ) : (
              <CandleChart />
            )
          ) : (
            <h1 className="text-4xl max-[550px]:text-3xl text-center text-[#8e5772]">
              {msg}{" "}
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default Graph;
