import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ coinPerPage, totalCoins, paginate, currentPage }) => {
  const pageCount = Math.ceil(totalCoins / coinPerPage);

  const handlePageClick = ({ selected }) => {
    console.log("Selected Page:", selected + 1); // Debugging
    paginate(selected + 1); // Call paginate with the correct page number
  };

  return (
    <div className="flex justify-center mt-6">
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
  );
};

export default Pagination;