import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useStockContext } from "../store/stockContext";

const CandleChart = () => {
  const { curStockPrices } = useStockContext();

  function convertData(inputData) {
    const outputData = [];
    for (const date in inputData) {
      if (inputData.hasOwnProperty(date)) {
        const { "1. open": open, "2. high": high, "3. low": low, "4. close": close } = inputData[date];
        const newData = {
          time: date,
          open: parseFloat(open),
          high: parseFloat(high),
          low: parseFloat(low),
          close: parseFloat(close),
        };
        outputData.push(newData);
      }
    }
    return outputData;
  }

  const data = curStockPrices["Time Series (Daily)"];
  const chartContainerRef = useRef();
  const chartRef = useRef();

  useEffect(() => {
    const ip = convertData(data).reverse();

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "white" },
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
    chartRef.current = chart;

    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [curStockPrices]);

  return <div className="w-full   " ref={chartContainerRef}></div>;
};

export default CandleChart;
