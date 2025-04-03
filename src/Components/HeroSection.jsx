import React,{useContext} from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { CryptoContext } from "./CryptoContext";



const HeroSection = () => {
  const {trendingCoins, losers, gainers, isLoadingNews, news} = useContext (CryptoContext)
  console.log("News in Hero:", news);

  if (isLoadingNews) 
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  return (
    <>
    <div className="bg-center bg-no-repeat px-4 md:px-8 pt-8">
        <div className="mt-10 sm:mt-20 lg:mt-40 px-4">
          <h1 className="font-bold text-white text-center lg:text-4xl">Welcome to the Future of Finance - Your Ultimate Cryptocurrency Hub!</h1>
          <p className="text-white text-center lg:text-2xl">The future of finance is here, and it's decentralized. Don't get left behind — empower yourself with knowledge and make the most of this transformative era</p>
        </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 p-9 bg-gray-900">
    {/* Trending Coins */}
    <div className="bg-gray-200 w-full max-w-[18rem] h-auto p-4 rounded-lg cursor-pointer mx-auto lg:mb-5">
      <Link to="/trendingcoins">
        <h2 className="text-sm sm:text-base lg:text-lg text-gray-900 text-center font-bold">Trending Coins</h2>
      </Link>
      <ul>
        {trendingCoins.slice(0, 3).map((coin) => (
          <li key={coin.item.id} className="flex items-center justify-between border-b border-gray-300 py-2 text-sm sm:text-base lg:text-lg">
            <div className="flex items-center gap-2">
              <img src={coin.item.small} alt={coin.item.name} className="w-6 h-6" />
              <Link to={`/coinInfo/${coin.item.id}`}>
                <span className="text-gray-900 font-bold">{coin.item.name}</span>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>

    {/* Losers */}
    <div className="bg-gray-200 w-full max-w-[18rem] h-auto p-4 rounded-lg cursor-pointer mx-auto lg:mb-5">
      <Link to="/losers">
        <h2 className="text-sm sm:text-base lg:text-lg text-gray-900 text-center font-bold">Losers</h2>
      </Link>
      <ul>
        {losers.slice(0, 3).map((crypto) => (
          <li key={crypto.id} className="flex items-center justify-between border-b border-gray-300 py-2 text-sm sm:text-base lg:text-lg">
            <div className="flex items-center gap-2">
              <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
              <Link to={`/coinInfo/${crypto.id}`}>
                <span className="text-gray-900 font-bold">{crypto.name}</span>
              </Link>
            </div>
            <span className="text-red-500 flex items-center space-x-1 font-bold">
              <span className="text-xs leading-none">▼</span>
              <span>{Math.abs(crypto.price_change_percentage_24h.toFixed(2))}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>

    {/* Gainers */}
    <div className="bg-gray-200 w-full max-w-[18rem] h-auto p-4 rounded-lg cursor-pointer mx-auto lg:mb-5">
      <Link to="/market-trends">
        <h2 className="text-sm sm:text-base lg:text-lg text-gray-900 text-center font-bold">Gainers</h2>
      </Link>
      <ul>
        {gainers.slice(0, 3).map((crypto) => (
          <li key={crypto.id} className="flex items-center justify-between border-b border-gray-300 py-2 text-sm sm:text-base lg:text-lg">
            <div className="flex items-center gap-2">
              <img src={crypto.image} alt={crypto.name} className="w-6 h-6" />
              <Link to={`/coinInfo/${crypto.id}`}>
                <span className="text-gray-900 font-bold">{crypto.name}</span>
              </Link>
            </div>
            <span className="text-green-500 flex items-center space-x-1 font-bold">
              <span className="text-xs leading-none">▲</span>
              <span>{Math.abs(crypto.price_change_percentage_24h.toFixed(2))}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>

{/* Cryptocurrency News */}
<div className="bg-gray-200 w-full max-w-[18rem] h-auto p-4 rounded-lg mx-auto mb-5">
  <h2 className="text-sm sm:text-base lg:text-lg text-gray-900 text-center mb-2 font-bold">
    Cryptocurrency News
  </h2>
  
  {news && news.length > 0 ? (
  <ul>
    {news.slice(0, 1).map((article, index) => (
      <li key={index}>
        <div className="flex space-x-4">
          {article.image_url && (
            <img
              src={article.image_url}
              alt="News"
              className="rounded-lg w-20 h-20 object-cover"
            />
          )}
          <a
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-900 font-serif mt-2 text-sm sm:text-base lg:text-lg"
          >
            {article.title.slice(0,50)}...
          </a>
        </div>
        <p className="text-gray-900 text-sm font-bold">
          {article.pubDate ? new Date(article.pubDate).toLocaleDateString() : "Unknown Date"}
        </p>
      </li>
    ))}
  </ul>
) : (
  <p className="text-gray-500 text-center">No news available</p>
)}

</div>
  </div>
  </>
  );
  
};

HeroSection.propTypes = {
  news: PropTypes.array.isRequired, 
};

export default HeroSection;
