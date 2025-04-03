import React from 'react';
import { Link } from "react-router-dom";

const Losers = ({ losers, isLoadingData }) => {
  if (isLoadingData) 
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  

  if (!losers || losers.length === 0) {
    return <p>No data available to display.</p>;
  }

  return (
 <div className="w-full mt-14">
   <h1 className=" lg:text-2xl font-bold mb-4 text-center mt-5 md:hidden">Top Losers</h1>
      {/* Card Layout for Small Screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {losers.map((crypto) => (
          <div key={crypto.id} className="border p-4 rounded-lg shadow-md bg-white">
            <div className="flex items-center space-x-4">
              <img src={crypto.image} alt={crypto.name} className="w-10 h-10 object-contain" />
              <div>
                <h2 className="font-bold lg:text-lg">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
                <p className="text-black font-bold">${crypto.current_price.toFixed(2)}</p>
              </div>
            </div>
            <div className="mt-2 text-sm">
            <p>
            <span className="text-black font-bold">24h Change: </span>
            <span className={`font-bold ${crypto.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
              {crypto.price_change_percentage_24h > 0 ? "▲" : "▼"}
              {Math.abs(crypto.price_change_percentage_24h.toFixed(2))}%
            </span>
          </p>
             <p className="font-bold text-black">Volume (24h): ${crypto.total_volume.toLocaleString()}</p>
             
            </div>
            <Link to={`/coinInfo/${crypto.id}`} className="block mt-3 text-green-400">
              View Details
            </Link>
          </div>
        ))}
      </div>

  {/* Table Layout for Medium Screens and Larger */}
    <div className='mt-20 mb-10'>
      <h1 className="text-2xl font-bold mb-4 text-center mt-5 hidden md:block">Top Losers</h1>
      <div className=" hidden md:block overflow-x-auto">
        <table className="min-w-max w-full border-collapse border border-gray-200 text-xs sm:text-sm md:text-base">
          <thead className="text-black font-serif">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-200 px-4 py-2 text-left">24h%</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Volume(24h)</th>
            </tr>
          </thead>
          <tbody className='text-black'>
            {losers.map((crypto) => (
              <tr key={crypto.id} className="hover:bg-gray-300">
                <td className="border border-gray-200 px-4 py-2">
                  <img src={crypto.image} alt={crypto.name} className="w-10 h-10 object-contain" />
                </td>
                <td className="border border-gray-200 px-4 py-2 font-bold">
                <Link to={`/coinInfo/${crypto.id}`}>
                    {crypto.name} {crypto.symbol.toUpperCase()}
                  </Link>
                </td>
                <td className="border border-gray-200 px-4 py-2 font-bold">
                  ${crypto.current_price.toFixed(2)}
                </td>
                <td
                  className={`border border-gray-200 px-4 py-2 flex items-center space-x-1 font-bold ${
                    crypto.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span className="text-xs">{crypto.price_change_percentage_24h > 0 ? "▲" : "▼"}</span>
                  <span>{Math.abs(crypto.price_change_percentage_24h.toFixed(2))}%</span>
              </td>
                <td className="border border-gray-200 px-4 py-2 font-bold">
                  ${crypto.total_volume.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Losers;