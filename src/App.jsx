import { useEffect, useState } from "react";
import{
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
    Route,
} from "react-router-dom";
import HomePage from "./Components/HomePage";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import MarketTrends from "./pages/MarketTrends";
import Losers from "./pages/Losers";
import CoinDetail from "./pages/CoinDetail";
import NotFound from "./pages/NotFound";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [isLoading, setIsLoading] = useState(true)



  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        console.log("Fetching data from API..."); // Debug
        const res = await fetch("http://localhost:5000/api/cryptocurrency");
        if (!res.ok) throw new Error("Network response was not ok");

        const data = await res.json();
        console.log(data)
        setCryptoData(data);

        // Extract top gainers and losers
        const topGainers = data
          .filter((crypto) => crypto.price_change_percentage_24h !== null)
          .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
          .slice(0, 15);

        const topLosers = data
          .filter((crypto) => crypto.price_change_percentage_24h !== null)
          .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
          .slice(0, 15);

        setGainers(topGainers);
        setLosers(topLosers);
      } catch (error) {
        console.error("Failed to fetch cryptocurrency data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCryptoData();
  }, []);


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout/>}>
         <Route
        index
        element={
          <HomePage
            cryptoData={cryptoData}
            losers={losers}
            gainers={gainers}
          />

        }
      />
       <Route
        path="losers" 
       element={<Losers losers={losers} isLoading={isLoading} />} />
      <Route 
        path="market-trends" 
        element={<MarketTrends gainers={gainers} isLoading={isLoading} />}/>
      <Route 
        path="cryptocurrencies" 
        element={<Home cryptoData={cryptoData} isLoading={isLoading} />} />
       <Route
        path="coin/:id"
        element={<CoinDetail/>}
        />
        <Route
        path="*"
        element={<NotFound/>}
        />
      </Route>
    )
  )

  return <RouterProvider router={router} />;
}

export default App;
