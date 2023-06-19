import React from "react";

const Pagination = ({ currentPage, totalPageCount, onPageChange }) => {
  const calculatePaginationRange = () => {
    const pages = [];
    const totalPagesToShow = 5;

    let startPage = currentPage - Math.floor(totalPagesToShow / 2);
    let endPage = startPage + totalPagesToShow - 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = totalPagesToShow;
    }

    if (endPage > totalPageCount) {
      endPage = totalPageCount;
      startPage = endPage - totalPagesToShow + 1;
      if (startPage < 1) {
        startPage = 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const paginationRange = calculatePaginationRange();

  return (
    <div className="flex justify-center mt-4">
      <>
        <button
          className="px-3 py-2 mx-1 rounded-md bg-gray-200"
          onClick={() => handlePageChange(1)}
          disabled={currentPage == 1}
        >
          &#171;
        </button>
        <button
          className="px-3 py-2 mr-7 mx-1 rounded-md bg-gray-200"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage == 1}
        >
          &#8249;
        </button>
      </>
      {paginationRange.map((page) => (
        <button
          key={page}
          className={`px-3 py-2 mx-1 rounded-md ${
            page === currentPage ? "bg-gray-300" : "bg-gray-200"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <>
        <button
          className="px-3 py-2 mx-1 ml-7 rounded-md bg-gray-200"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage == 500}
        >
          &#8250;
        </button>
        <button
          className="px-3 py-2 mx-1 rounded-md bg-gray-200"
          onClick={() => handlePageChange(totalPageCount)}
          disabled={currentPage == 500}
        >
          &#187;
        </button>
      </>
    </div>
  );
};

export default Pagination;
