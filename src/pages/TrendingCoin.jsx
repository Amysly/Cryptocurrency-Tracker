import React,{useContext} from "react";
import { CryptoContext } from "../Components/CryptoContext";

const TrendingCoin = () => {
const {trendingCoins, isLoadingTrending}= useContext(CryptoContext)
  if (isLoadingTrending) 
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  
  if (!trendingCoins || trendingCoins.length === 0) {
    return <p>Data is not available</p>;
  }

  return (
    <div className="overflow-x-auto mt-10 sm:mt-3 lg:mt-11">
      <h2 className="text-center mb-4 mt-10 text-sm sm:text-base lg:text-2xl font-bold">Trending Coins</h2>
      <table className="min-w-full border-gray-300">
        <thead className="text-sm sm:text-base lg:text-lg">
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 border">image</th>
            <th className="py-2 px-4 border">Name</th>
          </tr>
        </thead>
        <tbody>
          {trendingCoins.map((coin) => (
            <tr key={coin.item.id} className="border-b text-center hover:bg-gray-100">
              <td className="py-2 px-4 border">
                <img src={coin.item.small} alt={coin.item.name} className="w-6 h-6 mx-auto" />
              </td>
              <td className="py-2 px-4 border font-bold text-black text-sm sm:text-base lg:text-lg">{coin.item.name} {coin.item.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendingCoin;
