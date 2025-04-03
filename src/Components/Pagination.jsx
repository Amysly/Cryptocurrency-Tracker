import React,{useContext} from "react";
import ReactPaginate from "react-paginate";
import { CryptoContext } from "./CryptoContext";

const Pagination = () => {
  const { coinPerPage, totalCoins, paginate, currentPage} = useContext(CryptoContext)
  const pageCount = Math.ceil(totalCoins / coinPerPage);

  const handlePageClick = ({ selected }) => {
    console.log("Selected Page:", selected + 1); // Debugging
    paginate(selected + 1); // Call paginate with the correct page number
  };

  return (
    <>
    <div className="flex justify-center mt-6 lg:mb-6">
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={window.innerWidth < 640 ? 2 : 3}
        onPageChange={handlePageClick}
        containerClassName="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        pageClassName="border px-4 py-2 text-sm sm:text-base rounded-md cursor-pointer transition-all hover:bg-gray-300"
        activeClassName="bg-green-400 text-white font-bold"
        previousClassName="border px-3 sm:px-4 py-2 rounded-md cursor-pointer transition-all hover:bg-gray-300"
        nextClassName="border px-3 sm:px-4 py-2 rounded-md cursor-pointer transition-all hover:bg-gray-300"
        breakClassName="text-gray-600 px-2"
        forcePage={currentPage - 1} // Sync with state
      />
    </div>

    <div className="grid lg:grid-cols-2 lg:mt-5 gap-6 p-9">
      <div className="p-5">
        <h1 className="font-bold text-center lg:text-3xl sm:text-2xl mb-3 whitespace-nowrap">What We Offer</h1>
        <p className="mt-3 mb-3 lg:text-xl"><span className="font-bold">Real-Time Market Data</span> : Stay updated with live prices, trends, and market insights.</p>
        <p className="mt-3 mb-3 lg:text-xl"><span className="font-bold">Comprehensive Coin Analysis</span>: Get in-depth details on Bitcoin, Ethereum, and other altcoins.</p>
        <p className="mt-3 mb-3 lg:text-xl"><span className="font-bold">Secure & Reliable Information</span>: Trustworthy guides and insights for both beginners and experienced traders.</p>
        <p className="mt-3 mb-3 lg:text-xl"><span className="font-bold">Latest Crypto News</span>: Stay ahead with the most recent developments in the blockchain and cryptocurrency world.</p>
      </div>
      <div>
        <img src='/images/btc.jpg' alt='btcimage' className="lg:w-9/12"></img>
      </div>
      </div>
    </>
  );
};

export default Pagination;