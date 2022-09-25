import { useState } from 'react';
import { getAllBookComments, resetComments } from '../features/comments/commentsSlice';

function PageComponent({
  paginationObject,
  isLoading,
  currentPage,
  handlePageClick,
  previousPage,
  nextPage,
}) {
  const { documentsCount, page, pageSize, totalPages } = paginationObject;

  //Helper array to obtain button values
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  let muiddlePagination;

  if (totalPages < 5) {
    muiddlePagination = pages.map((page) => (
      <button key={page} id={page} onClick={handlePageClick} disabled={page === currentPage}>
        {page}
      </button>
    ));
  } else {
    if (currentPage >= 5) {
      if (totalPages - currentPage >= 5) {
        const pageSlice = pages.slice(currentPage - 1, currentPage + 5 - 1);
        muiddlePagination = (
          <>
            <button onClick={handlePageClick}>1</button>
            <button>...</button>
            {pageSlice.map((page) => (
              <button
                key={page}
                id={page}
                onClick={handlePageClick}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
            <button>...</button>
            <button onClick={handlePageClick} disabled={currentPage === totalPages}>
              {totalPages}
            </button>
          </>
        );
      } else {
        const pageSlice = pages.slice(totalPages - 5, totalPages); //Last five pages must be fixed
        muiddlePagination = (
          <>
            <button onClick={handlePageClick}>1</button>
            <button>...</button>
            {pageSlice.map((page) => (
              <button
                key={page}
                id={page}
                onClick={handlePageClick}
                disabled={page === currentPage}
              >
                {page}
              </button>
            ))}
          </>
        );
      }
    } else {
      const pageSlice = pages.slice(0, 5); //Need from 1 to 5 when current page is lower than 5
      muiddlePagination = (
        <>
          {pageSlice.map((page) => (
            <button key={page} id={page} onClick={handlePageClick} disabled={page === currentPage}>
              {page}
            </button>
          ))}
          <button>...</button>
          <button onClick={handlePageClick} disabled={totalPages === currentPage}>
            {totalPages}
          </button>
        </>
      );
    }
  }

  return (
    <>
      {totalPages > 1 && (
        <div className="pagination">
          <button className="paginationPrev" onClick={previousPage} disabled={currentPage === 1}>
            &#171;
          </button>
          {muiddlePagination}
          <button
            className="paginationNext"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            &#187;
          </button>
        </div>
      )}
    </>
  );
}

export default PageComponent;
