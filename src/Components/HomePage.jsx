import { useEffect, useState } from "react";
import SearchCoin from '../pages/SearchCoin'
import Home from '../pages/Home'
import MarketTrends from '../pages/MarketTrends'
import Losers from '../pages/Losers'

const HomePage = ({cryptoData, gainers,losers, isLoading}) => {
    console.log("🔥 HomePage Updated:", { cryptoData, gainers, losers, isLoading });


 return (
  <div>
  {JSON.stringify(cryptoData)}
    <h1>Debug: HomePage is rendering</h1>
    {isLoading ? (
      <p>Loading data, please wait...</p>
    ) : (
      <div>
        <p>Data Loaded Successfully!</p>
        <SearchCoin/>
        <Home cryptoData={cryptoData} isLoading={isLoading} />
        <MarketTrends gainers={gainers} isLoading={isLoading} />
        <Losers losers={losers} isLoading={isLoading} />
      </div>
    )}
  </div>
);

}

export default HomePage
