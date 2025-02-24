import SearchCoin from "../pages/SearchCoin";
import Home from "../pages/Home";
import MarketTrends from "../pages/MarketTrends";
import Losers from "../pages/Losers";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        console.log("Fetching data from API..."); // Debug
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        );
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        console.log(data);
        setCryptoData(data);

        // Extract top gainers and losers
        const topGainers = data
          .filter((crypto) => crypto.price_change_percentage_24h !== null)
          .sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          )
          .slice(0, 15);

        const topLosers = data
          .filter((crypto) => crypto.price_change_percentage_24h !== null)
          .sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          )
          .slice(0, 15);

        setGainers(topGainers);
        setLosers(topLosers);
      } catch (error) {
        console.error("Failed to fetch cryptocurrency data:", error);
      }
    };

    fetchCryptoData();
  }, []);

  return (
    <div>
      <div>
        <SearchCoin />
        <Home cryptoData={cryptoData} gainers={gainers} losers={losers} />
        <MarketTrends />
        <Losers />
      </div>
    </div>
  );
};

export default HomePage;
