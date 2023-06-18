import React from "react";

const Pagination = ({ currentPage, totalPageCount, onPageChange }) => {
  const calculatePaginationRange = () => {
    const pages = [];
    const totalPagesToShow = 5;

    const startPage = Math.max(currentPage - Math.floor(totalPagesToShow / 2), 1);
    const endPage = Math.min(startPage + totalPagesToShow - 1, totalPageCount);

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
      {currentPage > 1 && (
        <>
          <button
            className="px-3 py-2 mx-1 rounded-md bg-gray-200"
            onClick={() => handlePageChange(1)}
          >
            &#171;
          </button>
          <button
            className="px-3 py-2 mx-1 rounded-md bg-gray-200"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &#8249;
          </button>
        </>
      )}
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
      {currentPage < totalPageCount && (
        <>
          <button
            className="px-3 py-2 mx-1 rounded-md bg-gray-200"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &#8250;
          </button>
          <button
            className="px-3 py-2 mx-1 rounded-md bg-gray-200"
            onClick={() => handlePageChange(totalPageCount)}
          >
            &#187;
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
