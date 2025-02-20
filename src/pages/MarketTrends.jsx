import React from "react";

const MarketTrends = ({ gainers, isLoading }) => {
  if (isLoading) {
    return <p>Loading data, please wait...</p>;
  }

  if (!gainers || gainers.length === 0) {
    return <p>No data available to display.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Top Gainers</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead className="bg-gray-50">
            <tr>
            <th className="border border-gray-200 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Symbol</th>
              <th className="border border-gray-200 px-4 py-2 text-left"> 24h Volume (USD)</th>
              <th className="border border-gray-200 px-4 py-2 text-left"> Price (USD)</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {gainers.map((crypto) => {
              const { id, image,name, symbol, price_change_percentage_24h,last_updated } = crypto;
              return (
                <tr key={id} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">
                    <img src={image} alt={name} className="w-10 h-10 object-contain" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{name}</td>
                  <td className="border border-gray-200 px-4 py-2">{symbol}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    ${price_change_percentage_24h.toLocaleString()}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    ${price_change_percentage_24h.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{last_updated}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MarketTrends;
