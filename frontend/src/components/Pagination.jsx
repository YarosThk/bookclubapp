import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegArrowAltCircleLeft, FaRegCircle, FaEllipsisH } from 'react-icons/fa';

function Pagination({ currentPage, totalPages }) {
  return (
    <div>
      {currentPage > 1 && <Link to={`/books/?page=${currentPage - 1}`}> Previous </Link>}
      {<Link to={`/books/?page=${1}`}> 1 </Link>}
      {(currentPage < 3 || currentPage >= totalPages - 2) && (
        <Link to={`/books/?page=${2}`}> 2 </Link>
      )}
      {(currentPage < 3 || currentPage >= totalPages - 2) && (
        <Link to={`/books/?page=${3}`}> 3 </Link>
      )}
      {currentPage >= 4 && <FaEllipsisH />}

      {currentPage >= 3 && currentPage <= totalPages - 2 && (
        <Link to={`/books/?page=${currentPage - 1}`}> {currentPage - 1} </Link>
      )}
      {currentPage >= 3 && currentPage <= totalPages - 3 && (
        <Link to={`/books/?page=${currentPage}`}> {currentPage} </Link>
      )}
      {currentPage >= 3 && currentPage <= totalPages - 3 && (
        <Link to={`/books/?page=${currentPage + 1}`}> {currentPage + 1} </Link>
      )}
      {currentPage < totalPages - 2 && <FaEllipsisH />}

      {currentPage >= totalPages - 2 && (
        <Link to={`/books/?page=${totalPages - 2}`}> {totalPages - 2} </Link>
      )}
      {currentPage >= totalPages - 2 && (
        <Link to={`/books/?page=${totalPages - 1}`}> {totalPages - 1} </Link>
      )}
      {<Link to={`/books/?page=${totalPages}`}> {totalPages} </Link>}
      {currentPage < totalPages && <Link to={`/books/?page=${currentPage + 1}`}> Next </Link>}
    </div>
  );
}

export default Pagination;
