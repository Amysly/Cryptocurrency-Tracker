import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./Components/HomePage";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import MarketTrends from "./pages/MarketTrends";
import Losers from "./pages/Losers";
import CoinDetail from "./pages/CoinDetail";
import TrendingCoin from "./pages/TrendingCoin";
import NotFound from "./pages/NotFound";

function App() {
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

  const [news, setNews] = useState([]);
    const [isLoadingNews, setIsLoadingNews] = useState(true);
  
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
  

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    
    // Pagination logic
    const indexOfLastCryptoData = currentPage * coinPerPage;
    const indexOfFirstCryptoData = indexOfLastCryptoData - coinPerPage;
    const currentCryptoPage = cryptoData.slice(indexOfFirstCryptoData, indexOfLastCryptoData);
    
    console.log("Current Crypto Page Data:", currentCryptoPage); // Debugging
  
  console.log("Current Crypto Page Data:", currentCryptoPage); // Debugging


  if (isLoadingData || isLoadingTrending) 
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route 
          index 
          element={<HomePage 
            currentCryptoPage={currentCryptoPage} 
            gainers={gainers} 
            losers={losers} 
            trendingCoins={trendingCoins} 
            isLoadingData={isLoadingData} 
            isLoadingTrending={isLoadingTrending} 
            paginate={setCurrentPage} 
            totalCoins={cryptoData.length}
            coinPerPage={coinPerPage}
            currentPage={currentPage}
          />} 
        />
        <Route path="losers" element={<Losers losers={losers} isLoadingData={isLoadingData} />} />
        <Route path="market-trends" element={<MarketTrends gainers={gainers} isLoadingData={isLoadingData} />} />
        <Route path="cryptocurrencies" element={<Home />} />
        <Route path="trendingcoins" element={<TrendingCoin trendingCoins={trendingCoins} isLoadingTrending={isLoadingTrending} />} />
        <Route path="coinInfo/:coinId" element={<CoinDetail news={news} isLoadingNews={isLoadingNews}/>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
