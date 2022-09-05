import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegArrowAltCircleLeft, FaRegCircle, FaEllipsisH } from 'react-icons/fa';

function Pagination({ currentPage, totalPages }) {
  return (
    <div className="btn-outer-block">
      <div className="btn-block ">
        {currentPage > 1 && (
          <Link to={`/books/?page=${currentPage - 1}`}>
            <button className="btn">Previous</button>{' '}
          </Link>
        )}
        {
          <Link to={`/books/?page=${1}`}>
            <button className="btn">1</button>
          </Link>
        }
        {(currentPage < 3 || currentPage >= totalPages - 2) && (
          <Link to={`/books/?page=${2}`}>
            <button className="btn">2</button>
          </Link>
        )}
        {(currentPage < 3 || currentPage >= totalPages - 2) && (
          <Link to={`/books/?page=${3}`}>
            <button className="btn">3</button>
          </Link>
        )}
        {currentPage >= 4 && (
          <button className="btn-ellipsis" disabled>
            <FaEllipsisH />
          </button>
        )}

        {currentPage >= 3 && currentPage <= totalPages - 2 && (
          <Link to={`/books/?page=${currentPage - 1}`}>
            <button className="btn">{currentPage - 1}</button>
          </Link>
        )}
        {currentPage >= 3 && currentPage <= totalPages - 3 && (
          <Link to={`/books/?page=${currentPage}`}>
            <button className="btn">{currentPage}</button>
          </Link>
        )}
        {currentPage >= 3 && currentPage <= totalPages - 3 && (
          <Link to={`/books/?page=${currentPage + 1}`}>
            <button className="btn">{currentPage + 1}</button>
          </Link>
        )}
        {currentPage < totalPages - 2 && (
          <button className="btn-ellipsis" disabled>
            <FaEllipsisH />
          </button>
        )}

        {currentPage >= totalPages - 2 && (
          <Link to={`/books/?page=${totalPages - 2}`}>
            <button className="btn">{totalPages - 2}</button>
          </Link>
        )}
        {currentPage >= totalPages - 2 && (
          <Link to={`/books/?page=${totalPages - 1}`}>
            <button className="btn">{totalPages - 1}</button>
          </Link>
        )}
        {
          <Link to={`/books/?page=${totalPages}`}>
            <button className="btn">{totalPages}</button>{' '}
          </Link>
        }
        {currentPage < totalPages && (
          <Link to={`/books/?page=${currentPage + 1}`}>
            <button className="btn">Next </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Pagination;
