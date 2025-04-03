import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import HomePage from "./Components/HomePage";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import MarketTrends from "./pages/MarketTrends";
import Losers from "./pages/Losers";
import CoinDetail from "./pages/CoinDetail";
import TrendingCoin from "./pages/TrendingCoin";
import NotFound from "./pages/NotFound";
import { CryptoContext } from "./Components/CryptoContext";

function App() {
  const {
    gainers,
    losers,
    trendingCoins,
    isLoadingData,
    isLoadingTrending,
    error,
    news,
    isLoadingNews,
    currentCryptoPage,
    coinPerPage,
    totalCoins,
    paginate,
    currentPage,
    cryptoData
  } = useContext (CryptoContext);
  console.log("✅ cryptoData in App:", cryptoData);

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
          element={
            <HomePage
            currentCryptoPage={currentCryptoPage} 
            gainers={gainers} 
            losers={losers} 
            trendingCoins={trendingCoins} 
            isLoadingData={isLoadingData} 
            isLoadingTrending={isLoadingTrending} 
            paginate={paginate} 
            totalCoins={cryptoData.length}
            coinPerPage={coinPerPage}
            currentPage={currentPage}

/>


          }
        />
        <Route path="losers" element={<Losers losers={losers} isLoadingData={isLoadingData} />} />
        <Route path="market-trends" element={<MarketTrends gainers={gainers} isLoadingData={isLoadingData} />} />
        <Route path="cryptocurrencies" element={<Home />} />
        <Route path="trendingcoins" element={<TrendingCoin trendingCoins={trendingCoins} isLoadingTrending={isLoadingTrending} />} />
        <Route path="coinInfo/:coinId" element={<CoinDetail news={news} isLoadingNews={isLoadingNews} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
