import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoinConverter = () => {
  const { coinId } = useParams();
  const [fiat, setFiat] = useState("usd");
  const [amount, setAmount] = useState(1);
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConversion = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=${fiat}`
        );

        if (!res.ok) throw new Error("Failed to fetch conversion rate");

        const data = await res.json();
        console.log("Fetched Data:", data);

        const price = data[coinId][fiat];
        setConvertedPrice(amount * price);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        setConvertedPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchConversion();
  }, [coinId, fiat, amount]);

  return (
    <div className="mt-10">
      <h2 className="text-sm sm:text-base lg:text-lg ml-2 font-bold mb-4">{coinId.toUpperCase()} Converter</h2>

      <div className="border p-6 w-full max-w-3xl mx-auto rounded-lg shadow-md">
        {/* Input for Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full p-2 border rounded-md cursor-pointer"
            min="1"
          />
        </div>

        {/* Dropdown for Fiat Selection */}
        <div className="mb-4 text-sm sm:text-base lg:text-lg">
          <label className="block text-sm font-medium">Currency</label>
          <select
            value={fiat}
            onChange={(e) => setFiat(e.target.value)}
            className="w-full p-2 border rounded-md cursor-pointer"
          >
            <option value="usd">USD ($)</option>
            <option value="eur">EUR (€)</option>
            <option value="gbp">GBP (£)</option>
            <option value="ngn">NGN (₦)</option>
          </select>
        </div>

        {/* Conversion Display */}
        <div className="border p-4 rounded-md bg-gray-100 text-sm sm:text-base lg:text-lg">
          <div className="flex justify-between border-b pb-2">
            <p className="font-medium">{amount}</p>
            <p className="uppercase">{coinId}</p>
          </div>
          <div className="flex justify-between mt-2">
            <p className="font-medium">
              {loading ? "Loading..." : convertedPrice?.toFixed(4) ?? "N/A"}
            </p>
            <p className="uppercase">{fiat}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinConverter;
