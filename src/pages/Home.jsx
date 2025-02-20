import React from "react";

const Home = ({ cryptoData, isLoading }) => {
  if (isLoading) {
    return <p>Loading data, please wait...</p>;
  }

  if (!cryptoData || cryptoData.length === 0) {
    return <div className="text-center mt-8">No cryptocurrency data available.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cryptocurrency Market</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-200 w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-4 py-2 text-left">Image</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Symbol</th>
              <th className="border border-gray-200 px-4 py-2 text-left">24h Volume (USD)</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Price (USD)</th>
              <th className="border border-gray-200 px-4 py-2 text-left">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto) => {
              const { id, name, symbol, image, total_volume, current_price, last_updated } = crypto;

              return (
                <div>
                  <p>
                    {JSON.stringify(cryptoData)}
                  </p>
                  <tr key={id} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-200 px-4 py-2">
                    <img src={image} alt={name} className="w-10 h-10 object-contain" />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{name}</td>
                  <td className="border border-gray-200 px-4 py-2 uppercase">{symbol}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    ${total_volume.toLocaleString()}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    ${current_price.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{new Date(last_updated).toLocaleString()}</td>
                </tr>

                </div>
                
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
