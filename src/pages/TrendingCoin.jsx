import React from "react";

const TrendingCoin = ({ trendingCoins, isLoadingTrending }) => {
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
    <div className="overflow-x-auto mt-12">
      <h2 className="text-center mb-4 mt-5 text-lg font-bold">Trending Coins</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
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
              <td className="py-2 px-4 border font-bold text-black text-xl sm:text-xs">{coin.item.name} {coin.item.symbol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrendingCoin;
