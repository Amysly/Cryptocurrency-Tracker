import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement, CategoryScale, 
  LinearScale, PointElement, 
  Title, Tooltip, Legend
);

const MarketChart = () => {
  const { coinId } = useParams();
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketChart = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
        );

        if (!res.ok) throw new Error("Failed to fetch market chart data");

        const data = await res.json();
        console.log("Fetched Market Chart Data:", data);

        // Format data for Chart.js
        const formattedData = {
          labels: data.prices.map(([timestamp]) => new Date(timestamp).toLocaleDateString()),
          datasets: [
            {
              label: `${coinId.toUpperCase()} Price (USD)`,
              data: data.prices.map(([, price]) => price),
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
          ],
        };

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching market chart data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketChart();
  }, [coinId]);

  return (
    <div className="p-4">
      <h2 className="text-sm sm:text-base lg:text-xl text-black font-bold text-center mb-2">
        {coinId} Price Chart (Last 7 Days)
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : chartData ? (
        <div className="w-full max-w-[100%] h-[300px] sm:h-[400px] lg:h-[500px] mx-auto">
          <Line 
            data={chartData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false 
            }} 
          />
        </div>
      ) : (
        <p className="text-red-500">Failed to load chart data.</p>
      )}
    </div>
  );
};

export default MarketChart;
