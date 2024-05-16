import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import ibmData from "../ibmJSON.json";
import { useStockContext } from "../store/stockContext";

const CandleChart = () => {
  const { getStockPrices,curStockPrices,curStock } = useStockContext();
  function convertData(inputData) {
    const outputData = [];
  
    for (const date in inputData) {
      if (inputData) {
        const { "1. open": open, "2. high": high, "3. low": low, "4. close": close } = inputData[date];
        
        const newData = {
          time: date,
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close)
        };
  
        outputData.push(newData);
      }
    }
  
    return outputData;
  }
  
  const data =  curStockPrices["Time Series (Daily)"];
  // console.log(data);

  const chartContainerRef = useRef();
  useEffect(() => {
     
    const ip = convertData(data).reverse();
    // console.log(ip);

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
        // background:{type:ColorType.Solid, color:'#253248'}, ,
        // textColor: 'rgba(255, 255, 255, 0.9)',
      },
      width: chartContainerRef.current.clientWidth,
      height: 520,
    });

    const newSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    newSeries.setData(ip);

    return () => {
      chart.remove();
    };
  }, [curStockPrices]);
  return <div className="w-[98%]" ref={chartContainerRef}></div>;
};

export default CandleChart;
