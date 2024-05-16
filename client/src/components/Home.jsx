import { Box, Stack } from "@mui/material";
import Stocks from "./Stocks";
import Graph from "./Graph";
import SearchBar from "./SearchBar";
import { useUserContext } from "../store/userContext";
import { useEffect } from "react";
import { useStockContext } from "../store/stockContext";

const Home = () => {
  const { loggedIn } = useUserContext();
  const { allStockData } = useStockContext();
  useEffect(() => {
    //
  }, [loggedIn]);
  return (
    <>
      {loggedIn ? (
        <Box className="flex justify-between px-[2rem] py-[3rem]">
          <Stocks />
          <Graph />
        </Box>
      ) : (
        <div className='px-[2rem] py-[1rem] ' >
          <SearchBar data={allStockData} />
          <Box className="col justify-between px-[1.5rem] pt-[1rem]">
            <Graph />
          </Box>
        </div>
      )}
    </>
  );
};

export default Home;
