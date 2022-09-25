import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSpecificBook, reset } from '../features/books/bookSlice';
import { getAllBookComments, resetComments } from '../features/comments/commentsSlice';
import Loader from '../components/Loader';
import PageComponent from '../components/PageComponent';
import Bookplaceholder from './Bookplaceholder.png';

function BookPage() {
  const { books, isError, isLoading } = useSelector((state) => state.book);
  const { comments, paginationComments, isErrorComments, isLoadingComments } = useSelector(
    (state) => state.comment
  );
  const { bookId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
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
    if (isError) {
      //example: book with such id not found
      navigate('/not-found');
    }
    const bookPromise = dispatch(getSpecificBook(bookId));
    const commentPromise = dispatch(
      getAllBookComments({ bookId: '63051c57a4578439050380fb', currentPage }) //need to replace the hard coded bookId
    );

    return () => {
      dispatch(resetComments());
      dispatch(reset());
      bookPromise.abort();
      commentPromise.abort();
    };
  }, [bookId, dispatch, navigate, isError, currentPage]);

  if (isLoading || isLoadingComments) {
    return <Loader />;
  }
  return (
    <>
      <div className="posts">
        {books.map((book) => (
          <section key={`${book._id}`} className="book">
            <img src={Bookplaceholder} alt={'bookPlaceholder'} />
            <div className="bookInfoSection">
              <h2 className="bookTitle"> {book.title} </h2>
              <p className="bookTitle"> {book.author} </p>
            </div>
          </section>
        ))}
        {isErrorComments ? (
          <p>Error while loading comments.</p>
        ) : (
          <div className="comments">
            {comments.map((comment) => (
              <div key={comment._id} className="comment">
                {comment.commentBody}
              </div>
            ))}
          </div>
        )}
      </div>
      <PageComponent
        paginationObject={paginationComments}
        currentPage={currentPage}
        handlePageClick={handlePageClick}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
}

export default BookPage;
