import React, { useContext } from "react";
import Home from "../pages/Home";
import Pagination from "./Pagination";
import HeroSection from "./HeroSection";
import SearchCoin from "../pages/SearchCoin";
import { CryptoContext } from "../Components/CryptoContext";

const HomePage = () => {
  const { 
    currentCryptoPage,
    trendingCoins, 
    isLoadingData, 
    isLoadingNews,
    isLoadingTrending, 
    coinPerPage, 
    totalCoins,
    paginate,
    currentPage,
    losers,
    gainers,
    news 
  } = useContext(CryptoContext); 

  console.log("🔹 currentCryptoPage:", currentCryptoPage);
  console.log("🔹 Current Page:", currentPage);
  console.log("🔹 Coins per Page:", coinPerPage);
  console.log("🔹 Total Coins:", totalCoins);


  return (
    <div>
      <HeroSection 
        trendingCoins={trendingCoins} 
        isLoadingTrending={isLoadingTrending} 
        losers={losers} 
        isLoadingData={isLoadingData} 
        gainers={gainers} 
        news={news} 
        isLoadingNews={isLoadingNews} 
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
