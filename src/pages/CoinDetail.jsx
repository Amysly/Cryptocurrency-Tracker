import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarketChart from './MarketChart';
import CryptoNews from './CryptoNews';

const CoinDetail = ({ news, isLoadingNews }) => {
  const { coinId } = useParams();
  const [coinInfo, setCoinInfo] = useState(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}`
        );
        if (!res.ok) throw new Error('Failed to fetch coin info');
        const data = await res.json();
        console.log('Fetched data:', data);
        setCoinInfo(data);
      } catch (error) {
        console.error('Failed to fetch coin info data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoinDetail();
  }, [coinId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!coinInfo) {
    return <p className="text-red-500 text-center">Coin not found.</p>;
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-14">
      {/* Coin Info Section */}
      <div className="border p-4">
        <div className="flex space-x-2 items-center">
          <img
            src={coinInfo.image.large}
            alt={coinInfo.name}
            className="w-7 h-7"
          />
          <h1 className="text-xl font-bold text-black">{coinInfo.name}</h1>
        </div>

        <div className="flex space-x-2 mt-3 mb-4 ml-4">
          <p className="text-black font-bold text-3xl">
            ${coinInfo.market_data.current_price.usd}
          </p>
          <p
            className={`font-bold text-3xl ${
              coinInfo.market_data.price_change_percentage_24h > 0
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            <span className="text-xs">
              {coinInfo.market_data.price_change_percentage_24h > 0 ? '▲' : '▼'}
            </span>
            <span>
              {Math.abs(coinInfo.market_data.price_change_percentage_24h.toFixed(2))}%
            </span>
          </p>
        </div>

        <div className="flex space-x-2 mb-3 text-black font-bold">
          <div className="border border-gray-900 p-2 rounded-md">
            <h2 className="text-nowrap">Current Price</h2>
            <p className="text-center">
              ${coinInfo.market_data.current_price.usd}
            </p>
          </div>
          <div className="border border-gray-900 p-2 rounded-md">
            <h2 className="text-nowrap">24h Change</h2>
            <p className="text-center">
              {Math.abs(coinInfo.market_data.price_change_percentage_24h.toFixed(2))}%
            </p>
          </div>
        </div>

        <div className="border border-gray-900 p-3 rounded-md text-center text-black">
          <h2 className="font-bold">Market Cap</h2>
          <p className="font-bold truncate">
            ${coinInfo.market_data.market_cap.usd.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Market Chart Section */}
      <div className="lg:col-span-3 border p-4">
        <MarketChart coinId={coinId} />
        <h3 className="text-lg font-bold text-black font-serif text-center mt-3">
          About {coinInfo.name}
        </h3>
        <p
          dangerouslySetInnerHTML={{
            __html: coinInfo.description?.en || 'No description available.',
          }}
          className="mt-3 text-black font-serif"
        ></p>
      </div>

      {/* Crypto News Section */}
      <div className="border p-4">
        {!news || news.length === 0 ? (
          <p className="text-gray-500 text-center">No news available</p>
        ) : (
          <CryptoNews news={news} isLoadingNews={isLoadingNews} />
        )}
      </div>
    </div>
  );
};

export default CoinDetail;