import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllBookComments, resetComments } from '../features/comments/commentsSlice';
import Loader from '../components/Loader';

function PageComponentOld() {
  const { comments, paginationComments, isErrorComments, isLoadingComments, messageComments } =
    useSelector((state) => state.comment);
  const [currentPage, setCurrentPage] = useState(1);
  const { documentsCount, page, pageSize, totalPages } = paginationComments;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePageClick = (e) => {
    setCurrentPage(parseInt(e.target.firstChild.textContent));
  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const commentPromise = dispatch(
      getAllBookComments({ bookId: '63051c57a4578439050380fb', currentPage })
    );
    return () => {
      dispatch(resetComments);
      commentPromise.abort();
    };
  }, [dispatch, currentPage]);

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

  if (isErrorComments) {
    toast.error(messageComments);
    return (
      <div>
        <ToastContainer />
        <h2>An error occurred loading comments</h2>
      </div>
    );
  }
  if (isLoadingComments) {
    return <Loader />;
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
      <div className="comments">
        {comments.map((comment) => (
          <div key={comment._id} className="comment">
            {comment.commentBody}
          </div>
        ))}
      </div>
    </>
  );
}

export default PageComponentOld;
