import { useState } from "react";
import { useStockContext } from "../store/stockContext";
import { Autocomplete, Box, Button, TextField } from "@mui/material";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const SearchBar = ({ data }) => {
  const [stock, setStock] = useState("");
  const { getSymbol,selectStock } = useStockContext();

  const handleChange = (event, newValue) => {
    setStock(newValue);
    console.log(stock, newValue);
    selectStock(getSymbol(newValue));
  };
  return (
    <>
      <Autocomplete
        onChange={handleChange}
        disablePortal
        clearIcon={null}
        id="combo-box-demo"
        options={data}
        sx={{
          width: "30%",
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

    </>
  );
};

export default SearchBar;
