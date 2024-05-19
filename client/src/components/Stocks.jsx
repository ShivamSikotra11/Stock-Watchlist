import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import stocksJSON from "../stockNames.json";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useStockContext } from "../store/stockContext";
import Tooltip from "@mui/material/Tooltip";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";

const Stocks = () => {
  // const data = ["IBM", "IBM", "IBM", "IBM", "IBM", "IBM"];

  const [vis, setVis] = useState(false);
  const [stock, setStock] = useState("");
  const [delOpen, setDelOpen] = useState(false);

  const {
    userStocks,
    AddStock,
    DeleteStock,
    getSymbol,
    allStockData,
    selectStock,
    curStock,
    selectStockLoading,
  } = useStockContext();

  const handleChange = (event, newValue) => {
    setStock(newValue);
  };
  const handleAdd = () => {
    AddStock({ name: stock, symbol: getSymbol(stock) });
    setVis(!vis);
    setStock("");
    setDelOpen([true,"Stock Added Successfully"]);
    // console.log(stock);
  };

  return (
    <div className="w-[28%] max-[910px]:w-[60%] max-[630px]:w-[80%] max-[400px]:w-[90%]     p-2 border border-black bg-[#f4e2eb] rounded-xl f-pop ">
      <Snackbar
        open={delOpen[0]}
        onClose={() => setDelOpen([false,""])}
        TransitionComponent={Slide} // Use Slide component here
        message={delOpen[1]}
        key={Slide.name}
        autoHideDuration={1200}
      />

      <Box className="flex justify-between items-center p-4 ">
        <Box className="text-[1.5rem] max-[342px]:text-[1.3rem] text-[#5c384a] font-semibold   ">
          WatchList
        </Box>

        <Button
          variant="contained"
          type="submit"
          style={{
            color: "#fff",
            fontSize: "1.2rem",
            fontFamily: "Playfair Display",
            backgroundColor: "#8e5772",
            textTransform: "capitalize",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            borderRadius: "0.5rem",
            letterSpacing: "0.2rem",
          }}
          className="px-4 "
          onClick={() => setVis(!vis)}
        >
          Add
        </Button>
      </Box>

      {vis && (
        <Box className="p-2 flex justify-between items-center">
          <Autocomplete
            clearIcon={null}
            onChange={handleChange}
            disablePortal
            id="combo-box-demo"
            options={allStockData}
            sx={{
              width: "87%",
              "& .MuiOutlinedInput-root": {
                // Customize the input color
                "& fieldset": {
                  borderColor: "#8e5772", // Change the border color
                },
                "&:hover fieldset": {
                  borderColor: "#8e5772", // Change the hover border color
                },
                "&.Mui-focused fieldset": {
                  // Customize the focus border color
                  borderColor: "#8e5772",
                },
              },
              "& .MuiInputLabel-root": {
                // Customize the label color
                color: "#8e5772",
                fontWeight: "500",
                fontSize: "1.3rem",
                "&.Mui-focused": {
                  // Customize the focus label color
                  color: "#8e5772",
                },
              },
            }}
            renderInput={(params) => <TextField {...params} label="Stocks" />}
          />
          {stock === "" ? (
            <Tooltip title="Please select the stock to add.">
              <AddCircleRoundedIcon
                style={{
                  fontSize: "3rem",
                  color: "gray",
                  cursor: "not-allowed",
                }}
              />
            </Tooltip>
          ) : (
            <AddCircleRoundedIcon
              className="cursor-pointer"
              onClick={handleAdd}
              style={{
                fontSize: "3rem",
                color: "#8e5772",
                cursor: "pointer",
              }}
            />
          )}
        </Box>
      )}

      <Box
        className={`p-2 min-h-[20rem] max-h-[28rem] max-[910px]:max-h-[20rem] overflow-y-scroll custom-scrollbar ${
          userStocks.length === 0 || selectStockLoading
            ? "flex justify-center items-center"
            : ""
        }`}
      >
        {selectStockLoading ? (
          <CircularProgress sx={{ color: "#8e5772" }} />
        ) : (
          <>
            {userStocks.length === 0 ? (
              <Box className="text-3xl text-center whitespace-nowrap text-gray-500">
                No stocks in Watchlist
              </Box>
            ) : (
              userStocks.map((item, index) => (
                <Box
                  className={`border-2 flex justify-between items-center rounded-md text-2xl f-pt py-1 pl-4 my-2 cursor-pointer ${
                    item.symbol === curStock
                      ? "bg-primary text-white border-[#000]"
                      : "bg-[#f2f2f2] border-primary"
                  }`}
                  key={index}
                  onClick={() => selectStock(item.symbol)}
                >
                  {item.name}
                  <Tooltip title="Delete">
                    {item.symbol === curStock ? (
                      <DeleteOutlineIcon
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          DeleteStock(item.symbol);
                          setDelOpen([true,"Stock Deleted Successfully"]);
                        }}
                        style={{ fontSize: "2rem", color: "#fff" }}
                      />
                    ) : (
                      <DeleteOutlineIcon
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          DeleteStock(item.symbol);
                          setDelOpen([true,"Stock Deleted Successfully"]);
                        }}
                        style={{ fontSize: "2rem", color: "#8e5772" }}
                      />
                    )}
                  </Tooltip>
                </Box>
              ))
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default Stocks;
