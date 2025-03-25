import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Home = ({ cryptoData }) => {
  if (!cryptoData || cryptoData.length === 0) {
    return <div className="text-center mt-8">No cryptocurrency data available.</div>;
  }

  return (
    <div className="w-full">
      {/* Card Layout for Small Screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {cryptoData.map((crypto) => (
          <div key={crypto.id} className="border p-4 rounded-lg shadow-md bg-white">
            <div className="flex items-center space-x-4">
              <img src={crypto.image} alt={crypto.name} className="w-10 h-10 object-contain" />
              <div>
                <h2 className="font-bold text-lg">{crypto.name} ({crypto.symbol.toUpperCase()})</h2>
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
              <p className="font-bold text-black">Market Cap: ${crypto.market_cap.toLocaleString()}</p>
              <p className="font-bold text-black">Volume (24h): ${crypto.total_volume.toLocaleString()}</p>
              <p className="font-bold text-black">Supply: {crypto.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}</p>
            </div>
            <Link to={`/coinInfo/${crypto.id}`} className="block mt-3 text-green-400">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Table Layout for Medium Screens and Larger */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-max w-full border-collapse border border-gray-200 text-xs sm:text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr className="whitespace-nowrap">
              <th className="border border-gray-200 px-3 sm:px-4 py-2 text-left">Image</th>
              <th className="border border-gray-200 px-3 sm:px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-3 sm:px-4 py-2 text-left">Price</th>
              <th className="border border-gray-200 px-3 sm:px-4 py-2 text-left">24h%</th>
              <th className="border border-gray-200 px-3 sm:px-4 py-2 text-left">Market Cap</th>
              <th className="border border-gray-200 px-3 sm:px-4 py-2 text-left">Volume (24h)</th>
              <th className="border border-gray-200 px-3 sm:px-4 py-2 text-left">Circulating Supply</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto) => (
              <tr key={crypto.id} className="hover:bg-gray-200">
                <td className="border border-gray-200 px-3 sm:px-4 py-2">
                  <img src={crypto.image} alt={crypto.name} className="w-8 sm:w-10 h-8 sm:h-10 object-contain" />
                </td>
                <td className="border border-gray-200 px-3 sm:px-4 py-2 font-semibold">
                  <Link to={`/coinInfo/${crypto.id}`}>
                    {crypto.name} ({crypto.symbol.toUpperCase()})
                  </Link>
                </td>
                <td className="border border-gray-200 px-3 sm:px-4 py-2 font-bold">
                  ${crypto.current_price.toFixed(2)}
                </td>
                <td
                  className={`border border-gray-200 px-3 sm:px-4 py-2 font-bold flex items-center space-x-1 ${
                    crypto.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span className="text-xs">{crypto.price_change_percentage_24h > 0 ? "▲" : "▼"}</span>
                  <span>{Math.abs(crypto.price_change_percentage_24h.toFixed(2))}%</span>
                </td>
                <td className="border border-gray-200 px-3 sm:px-4 py-2 font-bold">
                  ${crypto.market_cap.toLocaleString()}
                </td>
                <td className="border border-gray-200 px-3 sm:px-4 py-2 font-bold">
                  ${crypto.total_volume.toLocaleString()}
                </td>
                <td className="border border-gray-200 px-3 sm:px-4 py-2 font-bold">
                  {crypto.circulating_supply.toLocaleString()} {crypto.symbol.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Home.propTypes = {
  cryptoData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      current_price: PropTypes.number.isRequired,
      price_change_percentage_24h: PropTypes.number.isRequired,
      market_cap: PropTypes.number.isRequired,
      total_volume: PropTypes.number.isRequired,
      circulating_supply: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Home;
