import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import stocksJSON from "../stockNames.json";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useStockContext } from "../store/stockContext";

const Stocks = () => {
  // const data = ["IBM", "IBM", "IBM", "IBM", "IBM", "IBM"];

  const [vis, setVis] = useState(false);
  const [stock, setStock] = useState("");

  const {
    userStocks,
    AddStock,
    DeleteStock,
    getSymbol,
    allStockData,
    selectStock,
    curStock,
  } = useStockContext();

  const handleChange = (event, newValue) => {
    setStock(newValue);
  };

  return (
    <div className="w-[28%] h-[35rem] p-2 border border-black bg-[#f4e2eb] rounded-xl f-pop">
      <Box className="flex justify-between items-center p-4">
        <Box className="text-[1.5rem] text-[#5c384a] font-semibold   ">
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
          <AddCircleRoundedIcon
            className="cursor-pointer"
            onClick={() => {
              AddStock({ name: stock, symbol: getSymbol(stock) });
              setVis(!vis);
            }}
            style={{ fontSize: "3rem", color: "#8e5772" }}
          />
        </Box>
      )}

      <Box className="p-2">
        {userStocks.map((item, index) => (
          <Box
            className={`border-2 flex justify-between items-center rounded-md text-2xl   f-pt py-1 pl-4 my-2 cursor-pointer 
            ${
              item.symbol === curStock
                ? "bg-primary text-white border-[#000]"
                : "bg-[#f2f2f2] border-primary"
            }`}
            key={index}
            onClick={() => selectStock(item.symbol)}
          >
            {item.name}
            {item.symbol === curStock ? (
              <DeleteOutlineIcon
                className="cursor-pointer"
                onClick={() => DeleteStock(item.symbol)}
                style={{ fontSize: "2rem", color: "#fff" }}
              />
            ) : (
              <DeleteOutlineIcon
                className="cursor-pointer"
                onClick={() => DeleteStock(item.symbol)}
                style={{ fontSize: "2rem", color: "#8e5772" }}
              />
            )}
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Stocks;
