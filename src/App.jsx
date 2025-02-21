import {
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
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="losers" element={<Losers />} />
        <Route path="market-trends" element={<MarketTrends />} />
        <Route path="cryptocurrencies" element={<Home />} />
        <Route path="coin/:id" element={<CoinDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

