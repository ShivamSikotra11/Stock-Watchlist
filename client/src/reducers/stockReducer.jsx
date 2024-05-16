const stockReducer = (state, action) => {
  switch (action.type) {
    case "ADD_STOCK":
      return {
        ...state,
        userStocks: [...state.userStocks,action.payload]
      };
    case "SET_CURRENT_STOCK":
      return {
        ...state,
        curStock:  action.payload
      };
    case "SET_CURRENT_STOCK_PRICES":
      return {
        ...state,
        curStockPrices: action.payload
      };
    case "ADD_ALL_STOCKS":
      return {
        ...state,
        userStocks: action.payload,
      };
    case "REMOVE_STOCK":
      // console.log(action.payload);
      return {
        ...state,
        userStocks: state.userStocks.filter(stock => stock.symbol !== action.payload)
      };
    case "ALTER_CURR_STOCK_FETCHING":
      return {
        ...state,
        curStockFetching:!state.curStockFetching,
      }
    default:
      return state;
  }
};

export default stockReducer;
