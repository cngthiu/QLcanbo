// components/Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center gap-1 mt-4 mr-1">
      <button
        className="px-3 py-1 border rounded-l bg-white text-blue-600 hover:bg-gray-100"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Quay lại
      </button>

      <span className="px-4 py-1 bg-blue-600 text-white font-medium border-t border-b">
        {currentPage}
      </span>

      <button
        className="px-3 py-1 border rounded-r bg-white text-blue-600 hover:bg-gray-100"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Tiếp tục
      </button>
    </div>
  );
};

export default Pagination;
