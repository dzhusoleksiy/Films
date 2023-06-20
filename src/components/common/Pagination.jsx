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
    <div className="page-div">
      <>
        <button
          className="page-button bg-raisinBlack"
          onClick={() => handlePageChange(1)}
          disabled={currentPage == 1}
        >
          &#171;
        </button>
        <button
          className="page-button bg-raisinBlack mr-auto"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage == 1}
        >
          &#8249;
        </button>
      </>
      {paginationRange.map((page) => (
        <button
          key={page}
          className={`page-button ${
            page === currentPage ? "bg-jonquil" : "bg-raisinBlack "
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <>
        <button
          className="page-button bg-raisinBlack ml-auto"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage == 500}
        >
          &#8250;
        </button>
        <button
          className="page-button bg-raisinBlack"
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
