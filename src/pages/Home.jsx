import PropTypes from "prop-types";
const Home = ({ cryptoData, gainers }) => {
  if (!cryptoData || cryptoData.length === 0) {
    return (
      <div className="text-center mt-8">No cryptocurrency data available.</div>
    );
  }

  return (
    <div>
      {cryptoData.map((crypto) => (
        <div key={crypto.id}>
          {crypto.name} ({crypto.symbol}) - ${crypto.current_price}
        </div>
      ))}

      <h2 className="text-2xl font-semibold mt-8">Top Gainers</h2>
      <div>
        {gainers.map((gainer) => (
          <div key={gainer.id}>
            {gainer.name} ({gainer.symbol}) - ${gainer.current_price}
          </div>
        ))}
      </div>
    </div>
  );
};

Home.propTypes = {
  cryptoData: PropTypes.array.isRequired,
  gainers: PropTypes.array.isRequired,
  losers: PropTypes.array.isRequired,
};

export default Home;
