import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET"],
    optionsSuccessStatus: 204, 
  })
);

// Cryptocurrency API endpoint
app.get("/api/cryptocurrency", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const apiData = await response.json();
    res.json(apiData); // CoinGecko returns an array directly
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    res.status(500).json({ error: "Error fetching cryptocurrency data" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});