
import SearchCoin from '../pages/SearchCoin'
import Home from '../pages/Home'
import MarketTrends from '../pages/MarketTrends'
import Losers from '../pages/Losers'

const HomePage = ({cryptoData, gainers,losers, isLoading}) => {
    console.log("🔥 HomePage Updated:", { cryptoData, gainers, losers, isLoading });


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
