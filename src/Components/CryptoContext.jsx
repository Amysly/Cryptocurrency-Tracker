import React, { createContext, useState, useEffect } from "react";

export const CryptoContext = createContext();

const CryptoContextProvider = (props) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isLoadingTrending, setIsLoadingTrending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const coinPerPage = 15;
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const [marketRes, trendingRes] = await Promise.all([
          fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"),
          fetch("https://api.coingecko.com/api/v3/search/trending"),
        ]);

        if (!marketRes.ok || !trendingRes.ok) {
          throw new Error("Network response was not ok");
        }

        const marketData = await marketRes.json();
        const trendingData = await trendingRes.json();

        setCryptoData(marketData);

        const validMarketData = marketData.filter(
          (crypto) => crypto.price_change_percentage_24h !== null
        );

        setGainers(
          [...validMarketData]
            .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
            .slice(0, 15)
        );

        setLosers(
          [...validMarketData]
            .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
            .slice(0, 15)
        );

        setTrendingCoins(trendingData.coins || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoadingData(false);
        setIsLoadingTrending(false);
      }
    };

    fetchCryptoData();
  }, []);

  // Fetch News Data
  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [newsError, setNewsError] = useState(null);

  useEffect(() => {
    const fetchCryptoNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
        const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=cryptocurrency&language=en`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        console.log("Fetched news:", data.results);
        setNews(data.results || []);
      } catch (error) {
        setNewsError(error.message);
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchCryptoNews();
  }, []);

  // Pagination Logic
  const paginate = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };
  
  const indexOfLastCryptoData = currentPage * coinPerPage;
  const indexOfFirstCryptoData = indexOfLastCryptoData - coinPerPage;
  const currentCryptoPage = cryptoData.slice(indexOfFirstCryptoData, indexOfLastCryptoData);

  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        trendingCoins,
        gainers,
        losers,
        news,
        isLoadingData,
        isLoadingTrending,
        isLoadingNews,
        error,
        newsError,
        currentCryptoPage,
        currentPage,
        coinPerPage,
        paginate,
        totalCoins: cryptoData.length, 
      }}
    >
      {props.children}
    </CryptoContext.Provider>
  );
};

export default CryptoContextProvider;
