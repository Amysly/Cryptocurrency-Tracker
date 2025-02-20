import { useState, useEffect } from "react";

function SearchCoin() {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
            "http://localhost:5000/api/cryptocurrency",
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
    <div className="p-4">
      <input
        type="text"
        placeholder="Search for a coin..."
        className="border p-2 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredCoins.length > 0 && (
        <ul className="mt-4">
          {filteredCoins.map((coin) => (
            <li key={coin.id} className="p-2 border-b">
              <div>
              <img src={coin.image} alt="" className="w-10 h-10 object-contain" /> 
              {coin.name} ({coin.symbol})
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchCoin;
