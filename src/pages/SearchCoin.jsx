import { useState, useEffect } from "react";

function SearchCoin() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
        );
        const data = await response.json();
        console.log(data)
        setCoins(data);
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  useEffect(() => {
    if (search) {
      const results = coins.filter((coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCoins(results);
    } else {
      setFilteredCoins([]);
    }
  }, [search, coins]);

  return (
    <div className="flex flex-col items-center mt-10 mb-5">
      <input
        type="text"
        placeholder="Search for a coin..."
        className="border-2 border-gray-700 lg:w-full max-w-md p-2 
      bg-white  text-black font-serif
      placeholder-gray-500 dark:placeholder-gray-400 
      rounded-md placeholder:text-lg placeholder:font-serif"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCoins.length > 0 && (
        <ul className="mt-4">
          {filteredCoins.map((coin) => (
            <li key={coin.id} className="p-2 border-b">
              <div className="flex space-x-2">
                <div>
                <img src={coin.image} alt="" className="w-10 h-10 object-contain" /> 
                </div>
                <div><p className="font-serif mt-2 lg:text-lg">{coin.name} ({coin.symbol.toUpperCase()})</p></div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchCoin;
