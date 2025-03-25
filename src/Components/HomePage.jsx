import React from "react";
import Home from "../pages/Home";
import Pagination from "./Pagination";
import HeroSection from "./HeroSection";
import SearchCoin from "../pages/SearchCoin";



const HomePage = ({ 
  currentCryptoPage,
  trendingCoins, 
  isLoadingData, 
  isLoadingTrending, 
  coinPerPage, 
  totalCoins,
  paginate,
  currentPage,
  losers,
  gainers,
  news,
  isLoadingNews
}) => {
  

  return (
    <div>
      <HeroSection 
        trendingCoins={trendingCoins} 
        isLoadingTrending={isLoadingTrending} 
        losers={losers} 
        isLoadingData={isLoadingData} 
        gainers={gainers} 
        news={news} isLoadingNews={isLoadingNews}
      />
      <SearchCoin />
      <Home cryptoData={currentCryptoPage} isLoadingData={isLoadingData} />
      <Pagination
      coinPerPage={coinPerPage}
      totalCoins={totalCoins}
      paginate={paginate}
      currentPage={currentPage}
/>

    </div>
  );
};

export default HomePage;
